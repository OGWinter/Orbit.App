import React, { useState } from 'react';
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
    <div className="dashboard-shell" style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '260px', background: '#fff', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
        <div className="sidebar-brand" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px' }}>
            <span className="brand-mark" style={{ color: 'var(--violet)' }}>◈</span>
            <span>orbit</span>
            <span className="admin-badge">MISSION CONTROL</span>
          </div>
        </div>

        <nav className="sidebar-nav" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'waitlist', label: `📋 Waitlist (${waitlist.length})` },
            { id: 'inquiries', label: `📬 Team Inquiries (${inquiries.length})` },
            { id: 'database', label: '🗄️ Database Preview' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ padding: '16px', borderTop: '1px solid var(--line)' }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onBackToWebsite}
            style={{ width: '100%', fontSize: '12px' }}
          >
            ← Back to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {/* Top Bar */}
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', margin: 0 }}>
              {activeTab === 'overview'
                ? 'Mission Control Overview'
                : activeTab === 'waitlist'
                ? 'Early Access Waitlist'
                : activeTab === 'inquiries'
                ? 'Team Demo Inquiries'
                : 'Local Database Inspector'}
            </h1>
            <p className="page-subtitle" style={{ color: 'var(--muted)', fontSize: '13px', margin: '4px 0 0' }}>
              Phase 1 Interface Preview • Client-side data demonstrator
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleExportCsv}>
              📥 Export CSV
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={onBackToWebsite}>
              Exit to Homepage
            </button>
          </div>
        </div>

        {toastMessage && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
            {toastMessage}
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* Metrics Grid */}
            <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div className="metric-card">
                <span className="metric-label">TOTAL WAITLIST</span>
                <span className="metric-value">{stats.total_waitlist}</span>
                <span className="metric-trend highlight">Cohort #1 Applicants</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">PENDING APPROVAL</span>
                <span className="metric-value">{stats.pending_waitlist}</span>
                <span className="metric-trend">Awaiting review</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">APPROVED APPLICANTS</span>
                <span className="metric-value">{stats.approved_waitlist}</span>
                <span className="metric-trend highlight">Ready for cohort</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">TEAM INQUIRIES</span>
                <span className="metric-value">{stats.total_inquiries}</span>
                <span className="metric-trend">Enterprise requests</span>
              </div>
            </div>

            {/* Recent Applicants Card */}
            <div className="card" style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px' }}>Recent Waitlist Applicants</h3>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setActiveTab('waitlist')}>
                  View All ({waitlist.length}) →
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#fafbfc', borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>Queue #</th>
                      <th style={{ padding: '10px' }}>Applicant</th>
                      <th style={{ padding: '10px' }}>Role</th>
                      <th style={{ padding: '10px' }}>Status</th>
                      <th style={{ padding: '10px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.slice(0, 5).map((app) => (
                      <tr key={app.id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '12px 10px', fontWeight: 700 }}>#{app.queue_position}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong>{app.full_name || 'Anonymous'}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{app.email}</div>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span style={{ background: 'var(--lilac)', color: 'var(--violet)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                            {app.builder_role}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 700,
                              background: app.status === 'approved' ? '#dcfce7' : app.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                              color: app.status === 'approved' ? '#15803d' : app.status === 'rejected' ? '#b91c1c' : '#b45309',
                            }}
                          >
                            {app.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {app.status !== 'approved' && (
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => handleUpdateStatus(app.id, 'approved')}
                              >
                                Approve
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={() => handleUpdateStatus(app.id, 'rejected')}
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
          <div className="table-card" style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
            <div className="table-header" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Filter by name, email, or role..."
                  value={waitlistSearch}
                  onChange={(e) => setWaitlistSearch(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px', width: '280px' }}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '13px' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                Showing {filteredWaitlist.length} of {waitlist.length} applicants
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#fafbfc', borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px' }}>Pos</th>
                    <th style={{ padding: '12px 16px' }}>Applicant</th>
                    <th style={{ padding: '12px 16px' }}>Role</th>
                    <th style={{ padding: '12px 16px' }}>Company & Use Case</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWaitlist.map((w) => (
                    <tr key={w.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>#{w.queue_position}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <strong>{w.full_name || 'Anonymous'}</strong>
                        <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{w.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: 'var(--lilac)', color: 'var(--violet)', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                          {w.builder_role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                        <div>{w.company || '—'}</div>
                        <small style={{ color: 'var(--muted)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {w.use_case || '—'}
                        </small>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: w.status === 'approved' ? '#dcfce7' : w.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                            color: w.status === 'approved' ? '#15803d' : w.status === 'rejected' ? '#b91c1c' : '#b45309',
                          }}
                        >
                          {w.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleUpdateStatus(w.id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleUpdateStatus(w.id, 'rejected')}
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleDeleteWaitlist(w.id)}
                            style={{ color: '#ef4444' }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredWaitlist.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
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
          <div className="table-card" style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px' }}>
                Team & Enterprise Demo Requests ({inquiries.length})
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#fafbfc', borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px' }}>Contact</th>
                    <th style={{ padding: '12px 16px' }}>Company</th>
                    <th style={{ padding: '12px 16px' }}>Inquiry Type</th>
                    <th style={{ padding: '12px 16px' }}>Message</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <strong>{inq.name}</strong>
                        <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{inq.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>{inq.company || '—'}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                          {inq.inquiry_type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '320px', color: '#475569' }}>
                        {inq.message}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                          {inq.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
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
          <div className="card" style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid var(--line)' }}>
            <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: '16px' }}>
              Local SQLite Engine Architecture (orbit.db)
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '0 0 20px', lineHeight: 1.6 }}>
              Orbit stores local session states, applicant queues, and workspace tokens in a project-scoped SQLite database.
            </p>
            <div style={{ background: '#16171d', color: '#f8fafc', padding: '16px', borderRadius: '10px', font: '12px/1.6 monospace', overflowX: 'auto' }}>
              <pre style={{ margin: 0 }}>
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
