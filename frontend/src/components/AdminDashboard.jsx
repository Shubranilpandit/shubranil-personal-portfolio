import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, Plus, Trash2, Edit3, Mail, RefreshCw, X, LogOut, Check, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/soundService';

export default function AdminDashboard({ isOpen, onClose, onDataUpdated }) {
  const [token, setToken] = useState(localStorage.getItem('tron_token') || '');
  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, skills, messages, profile

  // Login form states
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@Tron2026');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin data states
  const [stats, setStats] = useState(null);
  const [projectsList, setProjectsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [profileData, setProfileData] = useState({});

  // New Project Form Modal state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    category: 'Full-Stack',
    description: '',
    problem_solved: '',
    key_contribution: '',
    status: 'Completed',
    repo_url: '',
    demo_url: '',
    technologies: 'Python, Flask, PostgreSQL',
    featured: true,
  });

  // New Skill Form state
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Programming',
    proficiency_level: 'Working Knowledge',
  });

  const loadAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [overviewData, projs, skls, msgs, prof] = await Promise.all([
        api.getOverview(),
        api.getProjects(),
        api.getSkills(),
        api.getContacts(),
        api.getProfile(),
      ]);

      setStats(overviewData.counts);
      setProjectsList(projs.data || []);
      setSkillsList(skls.all_skills || []);
      setMessagesList(msgs.data || []);
      setProfileData(prof.data || {});
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) {
      loadAdminData();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    sound.playClick();
    setLoading(true);
    setLoginError('');

    try {
      const res = await api.login(username, password);
      localStorage.setItem('tron_token', res.token);
      setToken(res.token);
      sound.playSuccess();
    } catch (err) {
      setLoginError(err.message || 'Access Denied: Invalid Authentication Protocol');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sound.playClick();
    localStorage.removeItem('tron_token');
    setToken('');
    setStats(null);
  };

  // Add Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      const payload = {
        ...newProject,
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      await api.createProject(payload);
      setShowAddProject(false);
      sound.playSuccess();
      loadAdminData();
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project node?")) return;
    sound.playClick();
    try {
      await api.deleteProject(id);
      loadAdminData();
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      alert(err.message);
    }
  };

  // Add Skill
  const handleCreateSkill = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      await api.createSkill(newSkill);
      setShowAddSkill(false);
      setNewSkill({ name: '', category: 'Programming', proficiency_level: 'Working Knowledge' });
      sound.playSuccess();
      loadAdminData();
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Delete this skill from matrix?")) return;
    sound.playClick();
    try {
      await api.deleteSkill(id);
      loadAdminData();
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      alert(err.message);
    }
  };

  // Update Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    sound.playClick();
    try {
      await api.updateProfile(profileData);
      sound.playSuccess();
      alert("Profile Identity Core successfully updated in database.");
      if (onDataUpdated) onDataUpdated();
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle Message Read
  const handleToggleMessage = async (id, currentStatus) => {
    sound.playClick();
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      await api.updateContactStatus(id, newStatus);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Delete this transmission log?")) return;
    sound.playClick();
    try {
      await api.deleteContact(id);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl bg-tron-panel border border-tron-cyan/70 rounded clip-chamfer p-5 sm:p-8 relative shadow-cyan-glow-lg max-h-[92vh] flex flex-col">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-tron-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-tron-amber" />
            <h3 className="font-display font-bold text-lg text-white">
              ADMIN CONTROL ROOM // GRID MANAGEMENT
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded text-xs font-mono text-slate-400 hover:text-tron-red flex items-center gap-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In: Show Secure Login Form */}
        {!token ? (
          <div className="max-w-md mx-auto w-full py-8 space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-tron-amber/10 border border-tron-amber flex items-center justify-center mx-auto mb-3 shadow-amber-glow">
                <Lock className="w-6 h-6 text-tron-amber" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                SECURITY AUTHENTICATION REQUIRED
              </h4>
              <p className="font-mono text-xs text-slate-400">
                Enter administrator credentials to access the portfolio database CRUD control room.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded bg-rose-950/60 border border-tron-red text-rose-300 font-mono text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">USERNAME</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white focus:border-tron-cyan focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">PASSKEY / PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white focus:border-tron-cyan focus:outline-none"
                  required
                />
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-[11px] text-slate-400">
                Default Local Passkey: <span className="text-tron-cyan">Admin@Tron2026</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cyber-btn w-full py-2.5 text-center flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'AUTHENTICATING...' : 'ACCESS CONTROL ROOM'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Management Interface */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-tron-border pb-3 mb-4 font-mono text-xs">
              {['overview', 'projects', 'skills', 'messages', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab);
                  }}
                  className={`px-3 py-1.5 rounded transition-all uppercase ${
                    activeTab === tab
                      ? 'bg-tron-cyan text-black font-bold shadow-cyan-glow-sm'
                      : 'bg-tron-panel border border-tron-border text-slate-400 hover:text-tron-cyan'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={loadAdminData}
                disabled={loading}
                className="ml-auto px-2 py-1 rounded bg-tron-dark border border-tron-border text-slate-400 hover:text-tron-cyan flex items-center gap-1 text-[11px]"
                title="Refresh Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>SYNC</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6 overflow-y-auto pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-tron-dark border border-tron-border rounded">
                    <div className="text-xs font-mono text-slate-400">TOTAL PROJECTS</div>
                    <div className="text-2xl font-display font-bold text-tron-cyan mt-1">
                      {stats.projects}
                    </div>
                  </div>
                  <div className="p-4 bg-tron-dark border border-tron-border rounded">
                    <div className="text-xs font-mono text-slate-400">SKILLS CATALOGED</div>
                    <div className="text-2xl font-display font-bold text-blue-400 mt-1">
                      {stats.skills}
                    </div>
                  </div>
                  <div className="p-4 bg-tron-dark border border-tron-border rounded">
                    <div className="text-xs font-mono text-slate-400">TRANSMISSIONS</div>
                    <div className="text-2xl font-display font-bold text-tron-amber mt-1">
                      {stats.messages_total}
                    </div>
                  </div>
                  <div className="p-4 bg-tron-dark border border-tron-border rounded">
                    <div className="text-xs font-mono text-slate-400">UNREAD INBOX</div>
                    <div className="text-2xl font-display font-bold text-tron-green mt-1">
                      {stats.messages_unread}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-tron-dark/70 border border-tron-border rounded font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-tron-cyan font-bold">GRID MANAGEMENT QUICK ACTIONS:</div>
                  <p>• Switch to <strong>PROJECTS</strong> tab to add new machine learning or development projects without touching code.</p>
                  <p>• Switch to <strong>MESSAGES</strong> to inspect incoming contact form broadcasts and mark as read.</p>
                  <p>• Switch to <strong>PROFILE</strong> to update your bio, current focus, and live system status.</p>
                </div>
              </div>
            )}

            {/* Tab 2: Projects Management */}
            {activeTab === 'projects' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-slate-400">ACTIVE PROJECT NODES ({projectsList.length})</span>
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="cyber-btn text-xs py-1.5 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD PROJECT</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {projectsList.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-tron-dark border border-tron-border rounded flex items-center justify-between gap-4 font-mono text-xs"
                    >
                      <div className="truncate">
                        <div className="font-bold text-white text-sm truncate">{p.title}</div>
                        <div className="text-slate-400 text-[11px] truncate">{p.category} // {p.status}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 rounded text-slate-400 hover:text-tron-red hover:bg-slate-800"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Skills Management */}
            {activeTab === 'skills' && (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-slate-400">TOTAL MATRIX ASSETS ({skillsList.length})</span>
                  <button
                    onClick={() => setShowAddSkill(true)}
                    className="cyber-btn text-xs py-1.5 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD SKILL</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {skillsList.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 bg-tron-dark border border-tron-border rounded flex items-center justify-between font-mono text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="text-[10px] text-tron-cyan">{s.proficiency_level}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(s.id)}
                        className="p-1 text-slate-400 hover:text-tron-red"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Messages / Transmissions */}
            {activeTab === 'messages' && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messagesList.length === 0 ? (
                  <div className="text-center py-10 text-xs font-mono text-slate-500">
                    NO TRANSMISSIONS RECORDED IN GRID LOGS
                  </div>
                ) : (
                  messagesList.map((m) => (
                    <div
                      key={m.id}
                      className={`p-4 rounded border font-mono text-xs space-y-2 ${
                        m.status === 'unread'
                          ? 'bg-tron-panel border-tron-cyan/60'
                          : 'bg-tron-dark border-tron-border opacity-70'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-white">{m.name} ({m.email})</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleMessage(m.id, m.status)}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] hover:text-tron-cyan"
                          >
                            MARK {m.status === 'unread' ? 'READ' : 'UNREAD'}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-slate-500 hover:text-tron-red"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-tron-cyan font-semibold">{m.subject}</div>
                      <p className="text-slate-300 font-sans text-xs leading-relaxed">{m.message}</p>
                      <div className="text-[10px] text-slate-500">
                        Transmitted: {m.created_at} // IP: {m.sender_ip}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 5: Profile Editor */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="flex-1 overflow-y-auto space-y-4 pr-1 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">FULL IDENTITY NAME</label>
                  <input
                    type="text"
                    value={profileData.full_name || ''}
                    onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                    className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">TITLE & DEGREE SPECIFICATION</label>
                  <input
                    type="text"
                    value={profileData.title || ''}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">SYSTEM STATUS BADGE</label>
                  <input
                    type="text"
                    value={profileData.status || ''}
                    onChange={(e) => setProfileData({ ...profileData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">PROFESSIONAL BIO</label>
                  <textarea
                    rows="4"
                    value={profileData.bio || ''}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <button type="submit" className="cyber-btn py-2">
                  SAVE PROFILE UPDATES
                </button>
              </form>
            )}
          </div>
        )}

        {/* Modal: Add Project */}
        {showAddProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-tron-panel border border-tron-cyan p-6 rounded clip-chamfer relative">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-bold text-white text-base">ADD NEW PROJECT NODE</h4>
                <button onClick={() => setShowAddProject(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreateProject} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">TITLE</label>
                  <input
                    type="text"
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">CATEGORY</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  >
                    <option value="AI / ML">AI / ML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Embedded / IoT">Embedded / IoT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">DESCRIPTION</label>
                  <textarea
                    rows="2"
                    required
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">TECHNOLOGIES (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">GITHUB REPO URL</label>
                  <input
                    type="url"
                    value={newProject.repo_url}
                    onChange={(e) => setNewProject({ ...newProject, repo_url: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddProject(false)} className="px-3 py-1.5 text-slate-400">
                    CANCEL
                  </button>
                  <button type="submit" className="cyber-btn py-1 px-4 text-xs">
                    SAVE TO CORE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Skill */}
        {showAddSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-tron-panel border border-tron-cyan p-6 rounded clip-chamfer relative">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-display font-bold text-white text-base">ADD SKILL TO MATRIX</h4>
                <button onClick={() => setShowAddSkill(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreateSkill} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">SKILL NAME</label>
                  <input
                    type="text"
                    required
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">CATEGORY</label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Data Science / ML">Data Science / ML</option>
                    <option value="Backend">Backend</option>
                    <option value="Databases">Databases</option>
                    <option value="Tools">Tools</option>
                    <option value="Big Data">Big Data</option>
                    <option value="AI / GenAI">AI / GenAI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">PROFICIENCY LEVEL</label>
                  <select
                    value={newSkill.proficiency_level}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiency_level: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-tron-dark border border-tron-border rounded text-white"
                  >
                    <option value="Project Experience">Project Experience</option>
                    <option value="Working Knowledge">Working Knowledge</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddSkill(false)} className="px-3 py-1.5 text-slate-400">
                    CANCEL
                  </button>
                  <button type="submit" className="cyber-btn py-1 px-4 text-xs">
                    ADD TO MATRIX
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
