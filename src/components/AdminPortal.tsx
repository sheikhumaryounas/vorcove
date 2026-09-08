import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  RefreshCw,
  Database,
  Activity,
  Users,
  DollarSign,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Search,
  ArrowUpRight,
  Send,
  Terminal,
  Server
} from 'lucide-react';
import {
  isUserAuthenticated,
  getStoredAdminUser,
  loginAdmin,
  clearAuthSession,
  fetchAdminStats,
  fetchAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
  fetchAdminRoiAudits,
  fetchAdminAssistantSessions,
  fetchDemoTelemetry,
  checkApiHealth
} from '../services/api';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'roi' | 'assistant' | 'demos' | 'api-test'>('overview');

  // Login form state
  const [email, setEmail] = useState<string>('admin@vorcove.com');
  const [password, setPassword] = useState<string>('vorcove2026');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<string>('all');
  const [inquirySearch, setInquirySearch] = useState<string>('');
  const [roiAudits, setRoiAudits] = useState<any[]>([]);
  const [assistantSessions, setAssistantSessions] = useState<any[]>([]);
  const [demoLogs, setDemoLogs] = useState<any[]>([]);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [inquiryNote, setInquiryNote] = useState<string>('');

  // API Tester state
  const [apiEndpoint, setApiEndpoint] = useState<string>('/health');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST'>('GET');
  const [apiRequestBody, setApiRequestBody] = useState<string>('{\n  "ticketId": "test-1",\n  "subject": "Urgent container delay",\n  "body": "Shipment #48921 delayed in Rotterdam"\n}');
  const [apiResponseResult, setApiResponseResult] = useState<any>(null);
  const [apiTestLoading, setApiTestLoading] = useState<boolean>(false);

  useEffect(() => {
    const auth = isUserAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      setCurrentUser(getStoredAdminUser());
      loadDashboardData();
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await loginAdmin(email, password);
      if (res.success && res.data) {
        setIsAuthenticated(true);
        setCurrentUser(res.data.user);
        loadDashboardData();
      } else {
        setLoginError(res.error || 'Invalid admin credentials');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, inqRes, roiRes, assistRes, demoRes, healthRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminInquiries(inquiryFilter === 'all' ? undefined : inquiryFilter, inquirySearch || undefined),
        fetchAdminRoiAudits(),
        fetchAdminAssistantSessions(),
        fetchDemoTelemetry(),
        checkApiHealth()
      ]);

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data.stats);
        setSystemInfo(statsRes.data.system);
      }
      if (inqRes.success && inqRes.data) {
        setInquiries(inqRes.data);
      }
      if (roiRes.success && roiRes.data) {
        setRoiAudits(roiRes.data);
      }
      if (assistRes.success && assistRes.data) {
        setAssistantSessions(assistRes.data);
      }
      if (demoRes.success && demoRes.data) {
        setDemoLogs(demoRes.data);
      }
      if (healthRes.success && healthRes.data) {
        setHealthStatus(healthRes.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateInquiryStatus(id, { status: newStatus });
    if (res.success) {
      setInquiries(prev => prev.map(item => ((item._id === id || item.id === id) ? { ...item, status: newStatus } : item)));
      if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.id === id)) {
        setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleSaveNotes = async (id: string) => {
    const res = await updateInquiryStatus(id, { internalNotes: inquiryNote });
    if (res.success) {
      setInquiries(prev => prev.map(item => ((item._id === id || item.id === id) ? { ...item, internalNotes: inquiryNote } : item)));
      if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.id === id)) {
        setSelectedInquiry((prev: any) => ({ ...prev, internalNotes: inquiryNote }));
      }
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const res = await deleteInquiry(id);
      if (res.success) {
        setInquiries(prev => prev.filter(item => item._id !== id && item.id !== id));
        if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.id === id)) {
          setSelectedInquiry(null);
        }
      }
    }
  };

  const runApiTest = async () => {
    setApiTestLoading(true);
    setApiResponseResult(null);
    try {
      const token = localStorage.getItem('vorcove_admin_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const options: RequestInit = {
        method: apiMethod,
        headers
      };

      if (apiMethod === 'POST' && apiRequestBody) {
        try {
          options.body = JSON.stringify(JSON.parse(apiRequestBody));
        } catch {
          options.body = apiRequestBody;
        }
      }

      const start = Date.now();
      const res = await fetch(`/api${apiEndpoint}`, options);
      const json = await res.json().catch(() => ({ statusText: res.statusText }));
      const duration = Date.now() - start;

      setApiResponseResult({
        status: res.status,
        statusText: res.statusText,
        durationMs: duration,
        data: json
      });
    } catch (err: any) {
      setApiResponseResult({
        status: 'Error',
        error: err.message
      });
    } finally {
      setApiTestLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 12, 16, 0.82)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          height: '88vh',
          background: '#0D0F12',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#E6E8EC',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '16px 24px',
            background: '#13161C',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF5722 0%, #D84315 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '18px'
              }}
            >
              V
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', color: '#FFF' }}>
                  VORCOVE STUDIO PORTAL
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 87, 34, 0.15)',
                    color: '#FF7043',
                    border: '1px solid rgba(255, 87, 34, 0.3)'
                  }}
                >
                  MERN Backend Live
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#8E95A5' }}>
                Executive Intelligence, Inquiries & Algorithmic Telemetry
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* DB Status Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '20px',
                background: systemInfo?.dbStatus?.isConnected ? 'rgba(46, 125, 50, 0.15)' : 'rgba(230, 81, 0, 0.15)',
                border: systemInfo?.dbStatus?.isConnected ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 152, 0, 0.3)',
                fontSize: '12px',
                color: systemInfo?.dbStatus?.isConnected ? '#81C784' : '#FFB74D'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: systemInfo?.dbStatus?.isConnected ? '#4CAF50' : '#FF9800'
                }}
              />
              <span>
                {systemInfo?.dbStatus?.isConnected ? 'MongoDB Connected' : 'MERN In-Memory Fallback'}
              </span>
            </div>

            {isAuthenticated && (
              <button
                onClick={loadDashboardData}
                disabled={isLoading}
                style={{
                  padding: '7px 14px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#D1D5DB',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                <span>Sync</span>
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                style={{
                  padding: '7px 14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#F87171',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Login View */
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                background: '#13161C',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '36px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 87, 34, 0.15)',
                    border: '1px solid rgba(255, 87, 34, 0.3)',
                    color: '#FF7043',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Lock size={22} />
                </div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#FFF' }}>
                  Studio Admin Authentication
                </h3>
                <p style={{ margin: '8px 0 0', fontSize: '13.5px', color: '#9CA3AF' }}>
                  Access inquiries, ROI submissions, and live system telemetry.
                </p>
              </div>

              {loginError && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#F87171',
                    fontSize: '13px',
                    marginBottom: '20px'
                  }}
                >
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginBottom: '6px' }}>
                    ADMIN EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#0D0F12',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#FFF',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginBottom: '6px' }}>
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#0D0F12',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#FFF',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#FFF',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 87, 34, 0.4)'
                  }}
                >
                  {isLoggingIn ? 'Authenticating...' : 'Sign In to Studio Portal'}
                </button>

                <div
                  style={{
                    marginTop: '20px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '12px',
                    color: '#9CA3AF',
                    lineHeight: 1.5
                  }}
                >
                  <span style={{ color: '#E6E8EC', fontWeight: 600 }}>Default Dev Credentials:</span>
                  <br />
                  Email: <code style={{ color: '#FF8A65' }}>admin@vorcove.com</code>
                  <br />
                  Password: <code style={{ color: '#FF8A65' }}>vorcove2026</code>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
            <div
              style={{
                width: '230px',
                background: '#11141A',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '18px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'overview' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'overview' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Activity size={16} />
                <span>Overview & Health</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'inquiries' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'inquiries' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={16} />
                  <span>Leads & Inquiries</span>
                </div>
                {inquiries.length > 0 && (
                  <span
                    style={{
                      fontSize: '11px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      color: '#FFF'
                    }}
                  >
                    {inquiries.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('roi')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'roi' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'roi' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <DollarSign size={16} />
                <span>ROI Scope Audits</span>
              </button>

              <button
                onClick={() => setActiveTab('assistant')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'assistant' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'assistant' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Bot size={16} />
                <span>AI Assistant Logs</span>
              </button>

              <button
                onClick={() => setActiveTab('demos')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'demos' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'demos' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Zap size={16} />
                <span>Demo Telemetry</span>
              </button>

              <button
                onClick={() => setActiveTab('api-test')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeTab === 'api-test' ? 'rgba(255, 87, 34, 0.15)' : 'transparent',
                  color: activeTab === 'api-test' ? '#FF7043' : '#9CA3AF',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <Terminal size={16} />
                <span>Live API Playground</span>
              </button>

              {/* Bottom user badge */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>
                  Signed in as
                </div>
                <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, marginTop: '2px' }}>
                  {currentUser?.name || 'Administrator'}
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '1px' }}>
                  {currentUser?.email}
                </div>
              </div>
            </div>

            {/* Main Tab Content Area */}
            <div
              style={{
                flex: 1,
                padding: '28px 32px',
                overflowY: 'auto',
                background: '#0D0F12'
              }}
            >
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <div style={{ marginBottom: '28px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                      Executive Studio Overview
                    </h2>
                    <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#9CA3AF' }}>
                      High-conviction metrics across inbound project inquiries, ROI scope calculations, and autonomous algorithms.
                    </p>
                  </div>

                  {/* Top Stats Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '18px',
                      marginBottom: '32px'
                    }}
                  >
                    <div
                      style={{
                        background: '#13161C',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '13px' }}>
                        <span>Total Inquiries</span>
                        <Users size={18} color="#FF7043" />
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFF', marginTop: '10px' }}>
                        {stats?.totalInquiries || inquiries.length}
                      </div>
                      <div style={{ fontSize: '12px', color: '#81C784', marginTop: '6px' }}>
                        {stats?.newInquiries || inquiries.filter(i => i.status === 'new').length} new unreviewed
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#13161C',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '13px' }}>
                        <span>ROI Audits Saved</span>
                        <DollarSign size={18} color="#4CAF50" />
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFF', marginTop: '10px' }}>
                        {stats?.totalAudits || roiAudits.length}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
                        ${Math.round((stats?.totalEstimatedSavings || 336211) / 1000)}k projected savings
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#13161C',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '13px' }}>
                        <span>AI Assistant Sessions</span>
                        <Bot size={18} color="#42A5F5" />
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFF', marginTop: '10px' }}>
                        {stats?.totalChatSessions || assistantSessions.length}
                      </div>
                      <div style={{ fontSize: '12px', color: '#81C784', marginTop: '6px' }}>
                        {stats?.capturedChatLeads || assistantSessions.filter(s => s.status === 'lead_captured').length} leads captured
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#13161C',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '13px' }}>
                        <span>Live Demo Executions</span>
                        <Zap size={18} color="#FFB74D" />
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#FFF', marginTop: '10px' }}>
                        {stats?.totalDemoRuns || demoLogs.length}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
                        Copilot, Pricing & Churn
                      </div>
                    </div>
                  </div>

                  {/* Architecture & Server Health Card */}
                  <div
                    style={{
                      background: '#13161C',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      padding: '24px',
                      marginBottom: '28px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                      <Server size={20} color="#FF7043" />
                      <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#FFF' }}>
                        Backend Engine & MongoDB Topology
                      </h3>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        fontSize: '13.5px'
                      }}
                    >
                      <div style={{ padding: '14px', background: '#0D0F12', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ color: '#6B7280', fontSize: '11.5px', textTransform: 'uppercase' }}>Database Status</div>
                        <div style={{ color: systemInfo?.dbStatus?.isConnected ? '#81C784' : '#FFB74D', fontWeight: 600, marginTop: '4px' }}>
                          {systemInfo?.dbStatus?.isConnected ? '● MongoDB Online' : '● In-Memory Resilient Store'}
                        </div>
                      </div>

                      <div style={{ padding: '14px', background: '#0D0F12', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ color: '#6B7280', fontSize: '11.5px', textTransform: 'uppercase' }}>Server Port</div>
                        <div style={{ color: '#FFF', fontWeight: 600, marginTop: '4px' }}>
                          Port 5000 (Vite Proxied)
                        </div>
                      </div>

                      <div style={{ padding: '14px', background: '#0D0F12', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ color: '#6B7280', fontSize: '11.5px', textTransform: 'uppercase' }}>Server Uptime</div>
                        <div style={{ color: '#FFF', fontWeight: 600, marginTop: '4px' }}>
                          {systemInfo?.uptimeSeconds || healthStatus?.uptimeSeconds || 0}s
                        </div>
                      </div>

                      <div style={{ padding: '14px', background: '#0D0F12', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ color: '#6B7280', fontSize: '11.5px', textTransform: 'uppercase' }}>Memory Footprint</div>
                        <div style={{ color: '#FFF', fontWeight: 600, marginTop: '4px' }}>
                          {systemInfo?.memoryUsageMB || 42} MB Heap
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                        Inbound Consultation Inquiries
                      </h2>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                        Manage project briefs, scope requests, and lead statuses.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select
                        value={inquiryFilter}
                        onChange={(e) => {
                          setInquiryFilter(e.target.value);
                          fetchAdminInquiries(e.target.value === 'all' ? undefined : e.target.value).then(res => {
                            if (res.success && res.data) setInquiries(res.data);
                          });
                        }}
                        style={{
                          background: '#13161C',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FFF',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="reviewing">In Review</option>
                        <option value="scheduled">Call Scheduled</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: selectedInquiry ? '1fr 380px' : '1fr', gap: '20px' }}>
                    {/* Inquiries Table */}
                    <div
                      style={{
                        background: '#13161C',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                      }}
                    >
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                        <thead>
                          <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#9CA3AF' }}>
                            <th style={{ padding: '12px 18px', fontWeight: 600 }}>Client / Company</th>
                            <th style={{ padding: '12px 18px', fontWeight: 600 }}>Services & Budget</th>
                            <th style={{ padding: '12px 18px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px 18px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '12px 18px', fontWeight: 600, textAlign: 'right' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.length === 0 ? (
                            <tr>
                              <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                                No inquiries found.
                              </td>
                            </tr>
                          ) : (
                            inquiries.map((inq: any) => {
                              const inqId = inq._id || inq.id;
                              const isSelected = selectedInquiry && (selectedInquiry._id === inqId || selectedInquiry.id === inqId);
                              return (
                                <tr
                                  key={inqId}
                                  onClick={() => {
                                    setSelectedInquiry(inq);
                                    setInquiryNote(inq.internalNotes || '');
                                  }}
                                  style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                    cursor: 'pointer',
                                    background: isSelected ? 'rgba(255, 87, 34, 0.08)' : 'transparent'
                                  }}
                                >
                                  <td style={{ padding: '14px 18px' }}>
                                    <div style={{ fontWeight: 600, color: '#FFF' }}>{inq.name}</div>
                                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{inq.email}</div>
                                    {inq.company && <div style={{ fontSize: '11px', color: '#FF7043' }}>{inq.company}</div>}
                                  </td>
                                  <td style={{ padding: '14px 18px' }}>
                                    <div style={{ fontSize: '12.5px', color: '#E6E8EC' }}>
                                      {inq.selectedServices?.slice(0, 2).join(', ') || 'Custom Solution'}
                                    </div>
                                    <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{inq.selectedBudget}</div>
                                  </td>
                                  <td style={{ padding: '14px 18px' }}>
                                    <span
                                      style={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        padding: '3px 8px',
                                        borderRadius: '6px',
                                        background:
                                          inq.status === 'new'
                                            ? 'rgba(255, 87, 34, 0.15)'
                                            : inq.status === 'converted'
                                            ? 'rgba(76, 175, 80, 0.15)'
                                            : inq.status === 'scheduled'
                                            ? 'rgba(33, 150, 243, 0.15)'
                                            : 'rgba(255, 255, 255, 0.08)',
                                        color:
                                          inq.status === 'new'
                                            ? '#FF7043'
                                            : inq.status === 'converted'
                                            ? '#81C784'
                                            : inq.status === 'scheduled'
                                            ? '#64B5F6'
                                            : '#9CA3AF'
                                      }}
                                    >
                                      {inq.status}
                                    </span>
                                  </td>
                                  <td style={{ padding: '14px 18px', fontSize: '12px', color: '#6B7280' }}>
                                    {new Date(inq.createdAt).toLocaleDateString()}
                                  </td>
                                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteInquiry(inqId);
                                      }}
                                      style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#EF4444',
                                        cursor: 'pointer',
                                        padding: '4px'
                                      }}
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Inquiry Detail Sidebar */}
                    {selectedInquiry && (
                      <div
                        style={{
                          background: '#13161C',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <h3 style={{ margin: 0, fontSize: '16px', color: '#FFF' }}>Inquiry Details</h3>
                          <button
                            onClick={() => setSelectedInquiry(null)}
                            style={{ background: 'transparent', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Client</div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFF', marginTop: '2px' }}>
                            {selectedInquiry.name}
                          </div>
                          <div style={{ fontSize: '13px', color: '#FF7043' }}>{selectedInquiry.email}</div>
                          {selectedInquiry.company && (
                            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{selectedInquiry.company}</div>
                          )}
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Status</div>
                          <select
                            value={selectedInquiry.status}
                            onChange={(e) => handleStatusChange(selectedInquiry._id || selectedInquiry.id, e.target.value)}
                            style={{
                              width: '100%',
                              marginTop: '6px',
                              padding: '8px 10px',
                              background: '#0D0F12',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              color: '#FFF',
                              borderRadius: '8px',
                              fontSize: '13px'
                            }}
                          >
                            <option value="new">New</option>
                            <option value="reviewing">In Review</option>
                            <option value="scheduled">Call Scheduled</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Project Brief</div>
                          <div
                            style={{
                              marginTop: '6px',
                              padding: '12px',
                              background: '#0D0F12',
                              borderRadius: '8px',
                              fontSize: '13px',
                              color: '#D1D5DB',
                              lineHeight: 1.5,
                              maxHeight: '160px',
                              overflowY: 'auto'
                            }}
                          >
                            {selectedInquiry.brief}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Internal Partner Notes</div>
                          <textarea
                            value={inquiryNote}
                            onChange={(e) => setInquiryNote(e.target.value)}
                            placeholder="Add notes on scoping call or technical assessment..."
                            rows={3}
                            style={{
                              width: '100%',
                              marginTop: '6px',
                              padding: '10px',
                              background: '#0D0F12',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              color: '#FFF',
                              borderRadius: '8px',
                              fontSize: '12.5px',
                              outline: 'none',
                              resize: 'none'
                            }}
                          />
                          <button
                            onClick={() => handleSaveNotes(selectedInquiry._id || selectedInquiry.id)}
                            style={{
                              marginTop: '8px',
                              width: '100%',
                              padding: '8px',
                              background: 'rgba(255, 87, 34, 0.2)',
                              border: '1px solid rgba(255, 87, 34, 0.4)',
                              color: '#FF7043',
                              borderRadius: '6px',
                              fontSize: '12.5px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Save Internal Note
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: ROI AUDITS */}
              {activeTab === 'roi' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                      Persisted ROI & Scope Audits
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                      Calculations saved by enterprise clients exploring payback and EBITDA margin impact.
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#13161C',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}
                  >
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#9CA3AF' }}>
                          <th style={{ padding: '12px 18px' }}>Client / Contact</th>
                          <th style={{ padding: '12px 18px' }}>Project Type</th>
                          <th style={{ padding: '12px 18px' }}>Team & Waste Rate</th>
                          <th style={{ padding: '12px 18px' }}>Est. Annual Savings</th>
                          <th style={{ padding: '12px 18px' }}>Payback Period</th>
                          <th style={{ padding: '12px 18px' }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roiAudits.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                              No ROI audits submitted yet.
                            </td>
                          </tr>
                        ) : (
                          roiAudits.map((audit: any) => (
                            <tr key={audit._id || audit.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                              <td style={{ padding: '14px 18px' }}>
                                <div style={{ fontWeight: 600, color: '#FFF' }}>{audit.clientName || 'Anonymous Visitor'}</div>
                                <div style={{ fontSize: '12px', color: '#FF7043' }}>{audit.clientEmail || 'No email provided'}</div>
                                {audit.clientCompany && <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{audit.clientCompany}</div>}
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    color: '#E6E8EC'
                                  }}
                                >
                                  {audit.projectType}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <div style={{ color: '#FFF' }}>{audit.teamSize} people @ ${audit.hourlyRate}/hr</div>
                                <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{audit.hoursWastedPerWeek} hrs/week wasted</div>
                              </td>
                              <td style={{ padding: '14px 18px', fontWeight: 700, color: '#81C784' }}>
                                ${Number(audit.estimatedAnnualSavings).toLocaleString()}
                              </td>
                              <td style={{ padding: '14px 18px', fontWeight: 600, color: '#FFB74D' }}>
                                {audit.paybackMonths} Months
                              </td>
                              <td style={{ padding: '14px 18px', color: '#6B7280', fontSize: '12px' }}>
                                {new Date(audit.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: ASSISTANT LOGS */}
              {activeTab === 'assistant' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                      Studio Assistant Interactions
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                      Live chat sessions, menu queries, and captured consultation leads.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                    {assistantSessions.length === 0 ? (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280', gridColumn: '1 / -1' }}>
                        No assistant conversations recorded yet.
                      </div>
                    ) : (
                      assistantSessions.map((session: any) => (
                        <div
                          key={session.sessionId || session._id}
                          style={{
                            background: '#13161C',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '18px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>
                              Session: {session.sessionId?.substring(0, 14)}...
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                background: session.status === 'lead_captured' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                                color: session.status === 'lead_captured' ? '#81C784' : '#9CA3AF'
                              }}
                            >
                              {session.status}
                            </span>
                          </div>

                          {session.capturedLead?.email && (
                            <div
                              style={{
                                padding: '10px',
                                background: 'rgba(76, 175, 80, 0.1)',
                                border: '1px solid rgba(76, 175, 80, 0.25)',
                                borderRadius: '8px',
                                marginBottom: '12px'
                              }}
                            >
                              <div style={{ fontSize: '11px', color: '#81C784', fontWeight: 600 }}>CAPTURED LEAD</div>
                              <div style={{ fontSize: '13px', color: '#FFF', fontWeight: 600 }}>{session.capturedLead.email}</div>
                              {session.capturedLead.name && (
                                <div style={{ fontSize: '12px', color: '#D1D5DB' }}>{session.capturedLead.name}</div>
                              )}
                            </div>
                          )}

                          <div style={{ fontSize: '12.5px', color: '#9CA3AF', marginBottom: '10px' }}>
                            Messages: {session.messages?.length || 0} exchanged
                          </div>

                          <div
                            style={{
                              background: '#0D0F12',
                              padding: '10px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              maxHeight: '120px',
                              overflowY: 'auto'
                            }}
                          >
                            {session.messages?.slice(-2).map((m: any, idx: number) => (
                              <div key={idx} style={{ marginBottom: '6px' }}>
                                <span style={{ color: m.sender === 'user' ? '#FF7043' : '#64B5F6', fontWeight: 600 }}>
                                  {m.sender}:{' '}
                                </span>
                                <span style={{ color: '#D1D5DB' }}>{m.text?.substring(0, 80)}...</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: DEMO TELEMETRY */}
              {activeTab === 'demos' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                      Algorithmic Demo Telemetry
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                      Live backend execution logs from Copilot ticket resolver, dynamic pricing engine, and churn risk scoring.
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#13161C',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}
                  >
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#9CA3AF' }}>
                          <th style={{ padding: '12px 18px' }}>Demo Module</th>
                          <th style={{ padding: '12px 18px' }}>Execution Latency</th>
                          <th style={{ padding: '12px 18px' }}>Summary Output</th>
                          <th style={{ padding: '12px 18px' }}>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoLogs.length === 0 ? (
                          <tr>
                            <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                              No demo executions recorded yet. Run a live demo from the homepage!
                            </td>
                          </tr>
                        ) : (
                          demoLogs.map((log: any, idx: number) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                              <td style={{ padding: '14px 18px' }}>
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    background: 'rgba(255, 87, 34, 0.15)',
                                    color: '#FF7043'
                                  }}
                                >
                                  {log.demoType}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px', color: '#81C784', fontWeight: 600 }}>
                                ⚡ {log.latencyMs || 12}ms
                              </td>
                              <td style={{ padding: '14px 18px', color: '#D1D5DB' }}>
                                {log.demoType === 'copilot'
                                  ? `${log.results?.category || 'Triage'} (${log.results?.priority || 'P1'})`
                                  : log.demoType === 'pricing'
                                  ? `Margin lift: +${log.results?.elasticityScore || 7.4}% (+$${Math.round((log.results?.annualProfitLift || 0)/1000)}k/yr)`
                                  : `Risk: ${log.results?.riskLevel || 'Analyzed'} (Score: ${log.results?.riskScore || 85})`}
                              </td>
                              <td style={{ padding: '14px 18px', color: '#6B7280', fontSize: '12px' }}>
                                {new Date(log.createdAt).toLocaleTimeString()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: API TESTER PLAYGROUND */}
              {activeTab === 'api-test' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#FFF' }}>
                      Live MERN REST API Playground
                    </h2>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                      Directly execute and verify any backend endpoint against the Express server and MongoDB store.
                    </p>
                  </div>

                  <div
                    style={{
                      background: '#13161C',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <select
                        value={apiMethod}
                        onChange={(e) => setApiMethod(e.target.value as any)}
                        style={{
                          background: '#0D0F12',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FF7043',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                      </select>

                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#0D0F12', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px', padding: '0 12px' }}>
                        <span style={{ color: '#6B7280', fontSize: '14px', marginRight: '4px' }}>/api</span>
                        <input
                          type="text"
                          value={apiEndpoint}
                          onChange={(e) => setApiEndpoint(e.target.value)}
                          placeholder="/health or /contact or /demos/copilot/run"
                          style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: '#FFF',
                            fontSize: '14px',
                            outline: 'none',
                            padding: '10px 0'
                          }}
                        />
                      </div>

                      <button
                        onClick={runApiTest}
                        disabled={apiTestLoading}
                        style={{
                          padding: '10px 20px',
                          background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#FFF',
                          fontWeight: 600,
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Send size={15} />
                        <span>{apiTestLoading ? 'Sending...' : 'Execute'}</span>
                      </button>
                    </div>

                    {/* Presets buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      <button
                        onClick={() => { setApiMethod('GET'); setApiEndpoint('/health'); }}
                        style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#D1D5DB', fontSize: '12px', cursor: 'pointer' }}
                      >
                        GET /health
                      </button>
                      <button
                        onClick={() => { setApiMethod('GET'); setApiEndpoint('/case-studies'); }}
                        style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#D1D5DB', fontSize: '12px', cursor: 'pointer' }}
                      >
                        GET /case-studies
                      </button>
                      <button
                        onClick={() => { setApiMethod('GET'); setApiEndpoint('/admin/stats'); }}
                        style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#D1D5DB', fontSize: '12px', cursor: 'pointer' }}
                      >
                        GET /admin/stats
                      </button>
                      <button
                        onClick={() => {
                          setApiMethod('POST');
                          setApiEndpoint('/demos/copilot/run');
                          setApiRequestBody('{\n  "ticketId": "test-1",\n  "subject": "Urgent container delay",\n  "body": "Rotterdam customs delay #48921"\n}');
                        }}
                        style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#D1D5DB', fontSize: '12px', cursor: 'pointer' }}
                      >
                        POST /demos/copilot/run
                      </button>
                    </div>

                    {apiMethod === 'POST' && (
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#9CA3AF', marginBottom: '6px', fontWeight: 600 }}>
                          REQUEST JSON BODY
                        </label>
                        <textarea
                          value={apiRequestBody}
                          onChange={(e) => setApiRequestBody(e.target.value)}
                          rows={5}
                          style={{
                            width: '100%',
                            background: '#0D0F12',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '8px',
                            color: '#4ADE80',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '13px',
                            padding: '12px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    )}

                    {/* Response Output */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <label style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>
                          SERVER RESPONSE
                        </label>
                        {apiResponseResult && (
                          <span style={{ fontSize: '12px', color: '#81C784' }}>
                            Status: {apiResponseResult.status} ({apiResponseResult.durationMs}ms)
                          </span>
                        )}
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          padding: '16px',
                          background: '#08090C',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '10px',
                          color: '#E0E7FF',
                          fontFamily: 'Consolas, monospace',
                          fontSize: '12.5px',
                          maxHeight: '280px',
                          overflowY: 'auto',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {apiResponseResult ? JSON.stringify(apiResponseResult.data, null, 2) : '// Click "Execute" or select a preset above to inspect live backend response'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
