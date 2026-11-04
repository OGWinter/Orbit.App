import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Mail,
  Database,
  ArrowLeft,
  Download,
  Trash2,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { orbitStore } from '../../services/orbitStore';

interface MissionControlViewProps {
  onBackToWebsite: () => void;
  initialTab?: string;
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  onBackToWebsite,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const waitlist = orbitStore.getWaitlist();
  const inquiries = orbitStore.getInquiries();
  const stats = orbitStore.getStats();

  const filteredWaitlist = waitlist.filter((w) => {
    const matchesSearch =
      w.email.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
      (w.full_name && w.full_name.toLowerCase().includes(waitlistSearch.toLowerCase())) ||
      w.builder_role.toLowerCase().includes(waitlistSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    orbitStore.updateWaitlistStatus(id, newStatus);
    showToast(`Updated applicant status to '${newStatus}' (Local storage updated)`);
  };

  const handleDeleteWaitlist = (id: string) => {
    orbitStore.deleteWaitlistEntry(id);
    showToast('Deleted applicant record from local preview');
  };

  const handleExportCsv = () => {
    const headers = 'ID,Email,Full Name,Role,Company,Status,Queue Position,Created At\n';
    const rows = waitlist
      .map(
        (w) =>
          `"${w.id}","${w.email}","${w.full_name || ''}","${w.builder_role}","${w.company || ''}","${w.status}",${w.queue_position},"${w.created_at}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orbit_waitlist_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported waitlist CSV from preview database');
  };

  return (
    <div className="dashboard-shell" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg, #F3F4EF)' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '260px', background: 'var(--surface, #FFFFFF)', borderRight: '1px solid var(--border, #E1E6E8)', display: 'flex', flexDirection: 'column' }}>
        <div className="sidebar-brand" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border, #E1E6E8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontWeight: 700, fontSize: '18px', color: 'var(--text, #172536)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand, #315CE8)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '3px', right: '3px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand-highlight, #D6ED83)' }} />
            </span>
            <span>orbit</span>
            <span className="admin-badge" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', padding: '3px 7px', borderRadius: '4px', background: 'var(--surface-soft-blue, #DFE6F2)', color: 'var(--brand, #315CE8)', border: '1px solid var(--border, #E1E6E8)' }}>MISSION CONTROL</span>
          </div>
        </div>

        <nav className="sidebar-nav" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
            { id: 'waitlist', label: `Waitlist (${waitlist.length})`, icon: <Users size={16} /> },
            { id: 'inquiries', label: `Team Inquiries (${inquiries.length})`, icon: <Mail size={16} /> },
            { id: 'database', label: 'Database Preview', icon: <Database size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--brand, #315CE8)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary, #647386)',
                fontWeight: activeTab === tab.id ? 600 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ padding: '16px', borderTop: '1px solid var(--border, #E1E6E8)' }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onBackToWebsite}
            style={{
              width: '100%',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: 'var(--text-secondary, #647386)',
              background: 'transparent',
              border: '1px solid var(--border, #E1E6E8)',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} /> Back to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {/* Top Bar */}
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '26px', margin: 0, color: 'var(--text, #172536)', fontWeight: 700 }}>
              {activeTab === 'overview'
                ? 'Mission Control Overview'
                : activeTab === 'waitlist'
                ? 'Early Access Waitlist'
                : activeTab === 'inquiries'
                ? 'Team Demo Inquiries'
                : 'Local Database Inspector'}
            </h1>
            <p className="page-subtitle" style={{ color: 'var(--text-secondary, #647386)', fontSize: '13px', margin: '4px 0 0' }}>
              Phase 1 Interface Preview • Client-side data demonstrator
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleExportCsv}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--surface, #FFFFFF)',
                border: '1px solid var(--border, #E1E6E8)',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text, #172536)',
                cursor: 'pointer',
              }}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onBackToWebsite}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--brand, #315CE8)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Exit to Homepage
            </button>
          </div>
        </div>

        {toastMessage && (
          <div style={{ background: 'var(--surface-soft-green, #DCEDE5)', border: '1px solid #bbf7d0', color: '#15803d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={15} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* Metrics Grid */}
            <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div className="metric-card" style={{ background: 'var(--surface, #FFFFFF)', border: '1px solid var(--border, #E1E6E8)', borderRadius: '12px', padding: '20px' }}>
                <span className="metric-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-secondary, #647386)', display: 'block', marginBottom: '8px' }}>TOTAL WAITLIST</span>
                <span className="metric-value" style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--text, #172536)', display: 'block', marginBottom: '4px' }}>{stats.total_waitlist}</span>
                <span className="metric-trend highlight" style={{ fontSize: '12px', color: 'var(--brand, #315CE8)', fontWeight: 600 }}>Cohort #1 Applicants</span>
              </div>
              <div className="metric-card" style={{ background: 'var(--surface, #FFFFFF)', border: '1px solid var(--border, #E1E6E8)', borderRadius: '12px', padding: '20px' }}>
                <span className="metric-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-secondary, #647386)', display: 'block', marginBottom: '8px' }}>PENDING APPROVAL</span>
                <span className="metric-value" style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--text, #172536)', display: 'block', marginBottom: '4px' }}>{stats.pending_waitlist}</span>
                <span className="metric-trend" style={{ fontSize: '12px', color: 'var(--text-secondary, #647386)' }}>Awaiting review</span>
              </div>
              <div className="metric-card" style={{ background: 'var(--surface, #FFFFFF)', border: '1px solid var(--border, #E1E6E8)', borderRadius: '12px', padding: '20px' }}>
                <span className="metric-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-secondary, #647386)', display: 'block', marginBottom: '8px' }}>APPROVED APPLICANTS</span>
                <span className="metric-value" style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--text, #172536)', display: 'block', marginBottom: '4px' }}>{stats.approved_waitlist}</span>
                <span className="metric-trend highlight" style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>Ready for cohort</span>
              </div>
              <div className="metric-card" style={{ background: 'var(--surface, #FFFFFF)', border: '1px solid var(--border, #E1E6E8)', borderRadius: '12px', padding: '20px' }}>
                <span className="metric-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-secondary, #647386)', display: 'block', marginBottom: '8px' }}>TEAM INQUIRIES</span>
                <span className="metric-value" style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--text, #172536)', display: 'block', marginBottom: '4px' }}>{stats.total_inquiries}</span>
                <span className="metric-trend" style={{ fontSize: '12px', color: 'var(--text-secondary, #647386)' }}>Enterprise requests</span>
              </div>
            </div>

            {/* Recent Applicants Card */}
            <div className="card" style={{ background: 'var(--surface, #FFFFFF)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border, #E1E6E8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '16px', color: 'var(--text, #172536)', fontWeight: 700 }}>Recent Waitlist Applicants</h3>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('waitlist')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--brand, #315CE8)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  View All ({waitlist.length}) →
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-soft-blue, #DFE6F2)', borderBottom: '1px solid var(--border, #E1E6E8)', textAlign: 'left' }}>
                      <th style={{ padding: '10px 12px', color: 'var(--text, #172536)', fontWeight: 600 }}>Queue #</th>
                      <th style={{ padding: '10px 12px', color: 'var(--text, #172536)', fontWeight: 600 }}>Applicant</th>
                      <th style={{ padding: '10px 12px', color: 'var(--text, #172536)', fontWeight: 600 }}>Role</th>
                      <th style={{ padding: '10px 12px', color: 'var(--text, #172536)', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '10px 12px', color: 'var(--text, #172536)', fontWeight: 600 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.slice(0, 5).map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid var(--border, #E1E6E8)' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text, #172536)' }}>#{app.queue_position}</td>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: 'var(--text, #172536)' }}>{app.full_name || 'Anonymous'}</strong>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary, #647386)' }}>{app.email}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: 'var(--surface-soft-blue, #DFE6F2)', color: 'var(--brand, #315CE8)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                            {app.builder_role}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 700,
                              background: app.status === 'approved' ? 'var(--surface-soft-green, #DCEDE5)' : app.status === 'rejected' ? '#fee2e2' : 'var(--surface-soft-warm, #F6E6D9)',
                              color: app.status === 'approved' ? '#15803d' : app.status === 'rejected' ? '#b91c1c' : '#9a3412',
                            }}
                          >
                            {app.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {app.status !== 'approved' && (
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => handleUpdateStatus(app.id, 'approved')}
                                style={{ background: '#ffffff', border: '1px solid var(--border, #E1E6E8)', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: '#15803d', fontWeight: 600 }}
                              >
                                Approve
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                style={{ background: '#ffffff', border: '1px solid var(--border, #E1E6E8)', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: '#b91c1c', fontWeight: 600 }}
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Waitlist Full Table */}
        {activeTab === 'waitlist' && (
          <div className="table-card" style={{ background: 'var(--surface, #FFFFFF)', borderRadius: '12px', border: '1px solid var(--border, #E1E6E8)', overflow: 'hidden' }}>
            <div className="table-header" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border, #E1E6E8)', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-secondary, #647386)' }} />
                  <input
                    type="text"
                    placeholder="Filter by name, email, or role..."
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    style={{ padding: '8px 12px 8px 30px', border: '1px solid var(--border, #E1E6E8)', borderRadius: '8px', fontSize: '13px', width: '280px', color: 'var(--text, #172536)' }}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  style={{ padding: '8px 12px', border: '1px solid var(--border, #E1E6E8)', borderRadius: '8px', fontSize: '13px', color: 'var(--text, #172536)', background: 'var(--surface, #FFFFFF)' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary, #647386)' }}>
                Showing {filteredWaitlist.length} of {waitlist.length} applicants
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-soft-blue, #DFE6F2)', borderBottom: '1px solid var(--border, #E1E6E8)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Pos</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Applicant</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Role</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Company & Use Case</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWaitlist.map((w) => (
                    <tr key={w.id} style={{ borderBottom: '1px solid var(--border, #E1E6E8)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text, #172536)' }}>#{w.queue_position}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ color: 'var(--text, #172536)' }}>{w.full_name || 'Anonymous'}</strong>
                        <div style={{ color: 'var(--text-secondary, #647386)', fontSize: '12px' }}>{w.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: 'var(--surface-soft-blue, #DFE6F2)', color: 'var(--brand, #315CE8)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                          {w.builder_role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                        <div style={{ color: 'var(--text, #172536)' }}>{w.company || '—'}</div>
                        <small style={{ color: 'var(--text-secondary, #647386)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {w.use_case || '—'}
                        </small>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: w.status === 'approved' ? 'var(--surface-soft-green, #DCEDE5)' : w.status === 'rejected' ? '#fee2e2' : 'var(--surface-soft-warm, #F6E6D9)',
                            color: w.status === 'approved' ? '#15803d' : w.status === 'rejected' ? '#b91c1c' : '#9a3412',
                          }}
                        >
                          {w.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleUpdateStatus(w.id, 'approved')}
                            style={{ background: '#ffffff', border: '1px solid var(--border, #E1E6E8)', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: '#15803d', fontWeight: 600 }}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleUpdateStatus(w.id, 'rejected')}
                            style={{ background: '#ffffff', border: '1px solid var(--border, #E1E6E8)', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: '#b91c1c', fontWeight: 600 }}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleDeleteWaitlist(w.id)}
                            style={{ background: '#ffffff', border: '1px solid var(--border, #E1E6E8)', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', color: '#ef4444' }}
                            title="Delete applicant"
                            aria-label="Delete applicant"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredWaitlist.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary, #647386)' }}>
                        No applicants matching the filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Team Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="table-card" style={{ background: 'var(--surface, #FFFFFF)', borderRadius: '12px', border: '1px solid var(--border, #E1E6E8)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border, #E1E6E8)' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '16px', color: 'var(--text, #172536)', fontWeight: 700 }}>
                Team & Enterprise Demo Requests ({inquiries.length})
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-soft-blue, #DFE6F2)', borderBottom: '1px solid var(--border, #E1E6E8)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Contact</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Company</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Inquiry Type</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Message</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text, #172536)', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} style={{ borderBottom: '1px solid var(--border, #E1E6E8)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ color: 'var(--text, #172536)' }}>{inq.name}</strong>
                        <div style={{ color: 'var(--text-secondary, #647386)', fontSize: '12px' }}>{inq.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text, #172536)' }}>{inq.company || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: 'var(--surface-soft-blue, #DFE6F2)', color: 'var(--brand, #315CE8)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                          {inq.inquiry_type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '320px', color: 'var(--text-secondary, #647386)' }}>
                        {inq.message}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: 'var(--surface-soft-green, #DCEDE5)', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                          {inq.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary, #647386)' }}>
                        No team inquiries submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Database Preview */}
        {activeTab === 'database' && (
          <div className="card" style={{ background: 'var(--surface, #FFFFFF)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border, #E1E6E8)' }}>
            <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)', fontSize: '16px', color: 'var(--text, #172536)', fontWeight: 700 }}>
              Local SQLite Engine Architecture (orbit.db)
            </h3>
            <p style={{ color: 'var(--text-secondary, #647386)', fontSize: '13px', margin: '0 0 20px', lineHeight: 1.6 }}>
              Orbit stores local session states, applicant queues, and workspace tokens in a project-scoped SQLite database.
            </p>
            <div style={{ background: 'var(--surface-dark, #172536)', color: '#f8fafc', padding: '18px 20px', borderRadius: '10px', font: '12px/1.6 monospace', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.08)' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace' }}>
                {`-- Orbit Local Schema Preview (orbit.db)
CREATE TABLE IF NOT EXISTS waitlist (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  builder_role TEXT NOT NULL,
  company TEXT,
  status TEXT DEFAULT 'pending',
  queue_position INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MissionControlView;
