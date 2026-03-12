import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Users, BarChart2, Globe, LogOut,
  Trash2, Search, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertTriangle, RefreshCw,
  TrendingUp, ShieldCheck, Activity, Calendar,
  FileText, PlusCircle, Edit2, Star, X,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || '';

function adminHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('webenablix_admin_token')}`,
  };
}

// ── Stat Card ────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color = 'blue' }) => {
  const colors = {
    blue:   'bg-blue-50 text-blue-700 border-blue-100',
    green:  'bg-green-50 text-green-700 border-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    red:    'bg-red-50 text-red-700 border-red-100',
    gray:   'bg-gray-100 text-gray-700 border-gray-200',
  };
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 opacity-80" />
        <span className="text-sm font-medium opacity-80">{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {sub && <div className="text-xs mt-1 opacity-70">{sub}</div>}
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────
const PlanBadge = ({ plan }) => {
  const map = {
    free:         'bg-gray-100 text-gray-600',
    starter:      'bg-blue-100 text-blue-700',
    professional: 'bg-purple-100 text-purple-700',
    enterprise:   'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[plan] || map.free}`}>
      {plan || 'free'}
    </span>
  );
};

// ── Score Pill ───────────────────────────────────────────────
const ScorePill = ({ score }) => {
  if (score == null) return <span className="text-gray-400">—</span>;
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
  return <span className={`font-semibold ${color}`}>{score}</span>;
};

// ── Main AdminPage ───────────────────────────────────────────
const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Stats
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Users
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const [usersPages, setUsersPages] = useState(1);
  const [userSearch, setUserSearch] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);

  // Audits
  const [audits, setAudits] = useState([]);
  const [auditsTotal, setAuditsTotal] = useState(0);
  const [auditsPage, setAuditsPage] = useState(1);
  const [auditsPages, setAuditsPages] = useState(1);
  const [auditsLoading, setAuditsLoading] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  // Blogs
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogForm, setBlogForm] = useState(null); // null = closed, {} = new, {...blog} = editing
  const [blogDeleteConfirm, setBlogDeleteConfirm] = useState(null);
  const [blogSaving, setBlogSaving] = useState(false);

  const emptyBlogForm = () => ({
    title: '', excerpt: '', category: '', category_color: 'blue',
    read_time: '', date: '', author: '', author_role: '',
    image_url: '', content: '', is_featured: false,
  });

  // Guard — redirect if no admin token
  useEffect(() => {
    const token = localStorage.getItem('webenablix_admin_token');
    if (!token) navigate('/login');
  }, [navigate]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch overview stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`, { headers: adminHeaders() });
      if (res.status === 401 || res.status === 403) { handleLogout(); return; }
      const data = await res.json();
      setStats(data);
    } catch (err) {
      showToast('Failed to load stats', 'error');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async (page = 1, search = '') => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20, search });
      const res = await fetch(`${API_URL}/api/admin/users?${params}`, { headers: adminHeaders() });
      const data = await res.json();
      setUsers(data.users || []);
      setUsersTotal(data.total || 0);
      setUsersPages(data.pages || 1);
      setUsersPage(page);
    } catch (err) {
      showToast('Failed to load users', 'error');
    } finally {
      setUsersLoading(false);
    }
  }, []);

  // Fetch audits
  const fetchAudits = useCallback(async (page = 1) => {
    setAuditsLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      const res = await fetch(`${API_URL}/api/admin/audits?${params}`, { headers: adminHeaders() });
      const data = await res.json();
      setAudits(data.audits || []);
      setAuditsTotal(data.total || 0);
      setAuditsPages(data.pages || 1);
      setAuditsPage(page);
    } catch (err) {
      showToast('Failed to load audits', 'error');
    } finally {
      setAuditsLoading(false);
    }
  }, []);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setBlogsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs`, { headers: adminHeaders() });
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch {
      showToast('Failed to load blogs', 'error');
    } finally {
      setBlogsLoading(false);
    }
  }, []);

  const handleSaveBlog = async () => {
    if (!blogForm.title.trim()) { showToast('Title is required', 'error'); return; }
    setBlogSaving(true);
    try {
      const isEdit = !!blogForm.id;
      const url = isEdit ? `${API_URL}/api/admin/blogs/${blogForm.id}` : `${API_URL}/api/admin/blogs`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: adminHeaders(), body: JSON.stringify(blogForm) });
      if (!res.ok) { const d = await res.json(); showToast(d.detail || 'Save failed', 'error'); return; }
      showToast(isEdit ? 'Blog updated' : 'Blog created');
      setBlogForm(null);
      fetchBlogs();
    } catch {
      showToast('Save failed', 'error');
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/blogs/${id}`, { method: 'DELETE', headers: adminHeaders() });
      showToast('Blog deleted');
      fetchBlogs();
    } catch {
      showToast('Failed to delete blog', 'error');
    }
    setBlogDeleteConfirm(null);
  };

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => {
    if (activeTab === 'users') fetchUsers(1, '');
    if (activeTab === 'audits') fetchAudits(1);
    if (activeTab === 'blogs') fetchBlogs();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('webenablix_admin_token');
    navigate('/login');
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/users/${id}`, { method: 'DELETE', headers: adminHeaders() });
      showToast('User deleted');
      fetchUsers(usersPage, userSearch);
      fetchStats();
    } catch {
      showToast('Failed to delete user', 'error');
    }
    setDeleteConfirm(null);
  };

  // ── Sidebar nav items ──────────────────────────────────────
  const navItems = [
    { key: 'overview', icon: Activity,   label: 'Overview' },
    { key: 'users',    icon: Users,      label: 'Users' },
    { key: 'audits',   icon: BarChart2,  label: 'Audits' },
    { key: 'blogs',    icon: FileText,   label: 'Blogs' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.type === 'error' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Webenablix</div>
              <div className="text-xs text-gray-400">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold capitalize">{activeTab === 'overview' ? 'Dashboard Overview' : activeTab}</h1>
            <p className="text-xs text-gray-400">Welcome to the Webenablix Admin Panel</p>
          </div>
          <button onClick={fetchStats} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </header>

        <div className="p-8">
          {/* ── Overview Tab ── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {statsLoading ? (
                <div className="text-center py-16 text-gray-500">Loading stats...</div>
              ) : stats ? (
                <>
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Users}     label="Total Users"       value={stats.users.total_users}       sub={`+${stats.users.new_this_week} this week`}     color="blue" />
                    <StatCard icon={Globe}     label="Total Audits"      value={stats.audits.total_audits}     sub={`+${stats.audits.audits_this_week} this week`} color="green" />
                    <StatCard icon={TrendingUp} label="Avg Score"        value={`${stats.audits.avg_score}%`}  sub="across all scans"                              color="purple" />
                    <StatCard icon={AlertTriangle} label="Failed Scans"  value={stats.audits.failed_audits}    sub="scan errors"                                   color="red" />
                  </div>

                  {/* User breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                        <Users className="h-4 w-4" /> User Plans
                      </h2>
                      <div className="space-y-3">
                        {[
                          { label: 'Free',  val: stats.users.free_users,  color: 'bg-gray-600' },
                          { label: 'Paid',  val: stats.users.paid_users,  color: 'bg-blue-500' },
                        ].map(({ label, val, color }) => {
                          const pct = stats.users.total_users > 0 ? Math.round((val / stats.users.total_users) * 100) : 0;
                          return (
                            <div key={label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-400">{label} users</span>
                                <span className="text-gray-300 font-medium">{val} ({pct}%)</span>
                              </div>
                              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                      <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Daily Audits (14 days)
                      </h2>
                      {stats.daily_audits.length === 0 ? (
                        <p className="text-gray-500 text-sm">No audit data yet.</p>
                      ) : (
                        <div className="flex items-end gap-1 h-24">
                          {stats.daily_audits.map((d) => {
                            const max = Math.max(...stats.daily_audits.map((x) => x.count));
                            const pct = max > 0 ? (d.count / max) * 100 : 0;
                            return (
                              <div key={d.day} className="flex-1 flex flex-col items-center gap-1" title={`${d.day}: ${d.count} audits`}>
                                <div className="w-full bg-blue-500 rounded-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${Math.max(4, pct)}%` }} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('users')}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-blue-600 transition-colors text-left"
                    >
                      <div className="bg-blue-600/20 text-blue-400 rounded-lg p-3">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">Manage Users</div>
                        <div className="text-xs text-gray-400">{stats.users.total_users} registered users</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab('audits')}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-green-600 transition-colors text-left"
                    >
                      <div className="bg-green-600/20 text-green-400 rounded-lg p-3">
                        <BarChart2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">View All Audits</div>
                        <div className="text-xs text-gray-400">{stats.audits.total_audits} scans performed</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-gray-500">Could not load stats.</div>
              )}
            </div>
          )}

          {/* ── Users Tab ── */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name, email, company..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') fetchUsers(1, userSearch); }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => fetchUsers(1, userSearch)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Search
                </button>
                <span className="text-sm text-gray-400 ml-auto">{usersTotal} users</span>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {usersLoading ? (
                  <div className="text-center py-12 text-gray-500">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No users found.</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-800 text-left">
                      <tr className="text-xs text-gray-400">
                        <th className="px-5 py-3 font-medium">Name</th>
                        <th className="px-5 py-3 font-medium">Email</th>
                        <th className="px-5 py-3 font-medium">Company</th>
                        <th className="px-5 py-3 font-medium">Plan</th>
                        <th className="px-5 py-3 font-medium">Joined</th>
                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-5 py-3 font-medium text-gray-100">{u.name}</td>
                          <td className="px-5 py-3 text-gray-400">{u.email}</td>
                          <td className="px-5 py-3 text-gray-400">{u.company || '—'}</td>
                          <td className="px-5 py-3"><PlanBadge plan={u.plan} /></td>
                          <td className="px-5 py-3 text-gray-400">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button
                              onClick={() => setDeleteConfirm(u)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded hover:bg-red-900/30"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {usersPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => fetchUsers(usersPage - 1, userSearch)}
                    disabled={usersPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-sm text-gray-400">Page {usersPage} of {usersPages}</span>
                  <button
                    onClick={() => fetchUsers(usersPage + 1, userSearch)}
                    disabled={usersPage === usersPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Audits Tab ── */}
          {activeTab === 'audits' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{auditsTotal} total audits</span>
                <button onClick={() => fetchAudits(1)} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {auditsLoading ? (
                  <div className="text-center py-12 text-gray-500">Loading audits...</div>
                ) : audits.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No audits found.</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-800 text-left">
                      <tr className="text-xs text-gray-400">
                        <th className="px-5 py-3 font-medium">URL</th>
                        <th className="px-5 py-3 font-medium">User</th>
                        <th className="px-5 py-3 font-medium text-center">Score</th>
                        <th className="px-5 py-3 font-medium text-center">A11y</th>
                        <th className="px-5 py-3 font-medium text-center">SEO</th>
                        <th className="px-5 py-3 font-medium text-center">Issues</th>
                        <th className="px-5 py-3 font-medium text-center">Status</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {audits.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-5 py-3 max-w-[180px]">
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline truncate block"
                              title={a.url}
                            >
                              {a.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs">
                            {a.user_name ? (
                              <div>
                                <div className="text-gray-300 font-medium">{a.user_name}</div>
                                <div className="text-gray-500">{a.user_email}</div>
                              </div>
                            ) : (
                              <span className="text-gray-600">Guest</span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-center"><ScorePill score={a.overall_score} /></td>
                          <td className="px-5 py-3 text-center"><ScorePill score={a.accessibility_score} /></td>
                          <td className="px-5 py-3 text-center"><ScorePill score={a.seo_score} /></td>
                          <td className="px-5 py-3 text-center text-gray-400">{a.total_issues ?? '—'}</td>
                          <td className="px-5 py-3 text-center">
                            {a.scan_successful
                              ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                              : <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                            }
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                            {new Date(a.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {auditsPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => fetchAudits(auditsPage - 1)}
                    disabled={auditsPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-sm text-gray-400">Page {auditsPage} of {auditsPages}</span>
                  <button
                    onClick={() => fetchAudits(auditsPage + 1)}
                    disabled={auditsPage === auditsPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* ── Blogs Tab ── */}
          {activeTab === 'blogs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{blogs.length} blog post{blogs.length !== 1 ? 's' : ''}</span>
                <button
                  onClick={() => setBlogForm(emptyBlogForm())}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <PlusCircle className="h-4 w-4" /> New Blog Post
                </button>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {blogsLoading ? (
                  <div className="text-center py-12 text-gray-500">Loading blogs...</div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No blog posts yet. Create your first one!</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="border-b border-gray-800 text-left">
                      <tr className="text-xs text-gray-400">
                        <th className="px-5 py-3 font-medium">Title</th>
                        <th className="px-5 py-3 font-medium">Category</th>
                        <th className="px-5 py-3 font-medium">Author</th>
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium text-center">Featured</th>
                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {blogs.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="font-medium text-gray-100 max-w-[220px] truncate" title={b.title}>{b.title}</div>
                            {b.excerpt && <div className="text-xs text-gray-500 truncate max-w-[220px]">{b.excerpt}</div>}
                          </td>
                          <td className="px-5 py-3">
                            {b.category ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-900/50 text-blue-300">{b.category}</span>
                            ) : <span className="text-gray-600">—</span>}
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-gray-300">{b.author || '—'}</div>
                            {b.author_role && <div className="text-xs text-gray-500">{b.author_role}</div>}
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{b.date || new Date(b.created_at).toLocaleDateString()}</td>
                          <td className="px-5 py-3 text-center">
                            {b.is_featured
                              ? <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mx-auto" />
                              : <span className="text-gray-700">—</span>
                            }
                          </td>
                          <td className="px-5 py-3 text-right flex items-center justify-end gap-2">
                            <button
                              onClick={() => setBlogForm({ ...b })}
                              className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/30 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setBlogDeleteConfirm(b)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/30 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Blog Form Modal ── */}
      {blogForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="font-bold text-lg">{blogForm.id ? 'Edit Blog Post' : 'New Blog Post'}</h3>
              <button onClick={() => setBlogForm(null)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="Blog post title"
                />
              </div>
              {/* Excerpt */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Excerpt</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm(f => ({ ...f, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Short description shown on blog listing"
                />
              </div>
              {/* Row: Category + Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Accessibility"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Category Color</label>
                  <select
                    value={blogForm.category_color}
                    onChange={(e) => setBlogForm(f => ({ ...f, category_color: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                  >
                    {['blue','green','purple','orange','red','gray'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Row: Author + Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm(f => ({ ...f, author: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={blogForm.author_role}
                    onChange={(e) => setBlogForm(f => ({ ...f, author_role: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Accessibility Expert"
                  />
                </div>
              </div>
              {/* Row: Date + Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. March 12, 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.read_time}
                    onChange={(e) => setBlogForm(f => ({ ...f, read_time: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>
              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={blogForm.image_url}
                  onChange={(e) => setBlogForm(f => ({ ...f, image_url: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
              {/* Content */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Content</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm(f => ({ ...f, content: e.target.value }))}
                  rows={8}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-blue-500 resize-y font-mono"
                  placeholder="Full blog content (supports HTML or plain text)"
                />
              </div>
              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={blogForm.is_featured}
                  onChange={(e) => setBlogForm(f => ({ ...f, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-yellow-400"
                />
                <span className="text-sm text-gray-300 flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-400" /> Mark as featured post
                </span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button
                onClick={() => setBlogForm(null)}
                className="flex-1 py-2 rounded-lg border border-gray-700 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                disabled={blogSaving}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-60"
              >
                {blogSaving ? 'Saving...' : (blogForm.id ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Blog Delete Confirm ── */}
      {blogDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="font-bold text-lg mb-2">Delete Blog Post?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">"{blogDeleteConfirm.title}"</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBlogDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg border border-gray-700 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBlog(blogDeleteConfirm.id)}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="font-bold text-lg mb-2">Delete User?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{deleteConfirm.name}</span> ({deleteConfirm.email})? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg border border-gray-700 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirm.id)}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
