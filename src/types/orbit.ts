/**
 * Orbit V2 Core TypeScript Definitions
 */

export type BuilderRole = 'frontend' | 'backend' | 'fullstack' | 'teams';

export type WorkspaceTab = 'editor' | 'plan' | 'search' | 'settings';

export type AgentSimulationStage = 'idle' | 'planning' | 'building' | 'verifying' | 'completed';

export interface AgentStep {
  step_number: number;
  title: string;
  description: string;
  status: 'done' | 'active' | 'pending';
  time_label: string;
}

export interface FileDiffItem {
  name: string;
  path: string;
  lines: string;
}

export interface WaitlistApplicant {
  id: string;
  email: string;
  full_name?: string | null;
  builder_role: string;
  company?: string | null;
  use_case?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  queue_position: number;
  created_at: string;
}

export interface TeamInquiry {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  inquiry_type: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface NewsletterSubscriber {
  email: string;
  source: string;
  subscribed_at: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  status: 'delivered' | 'queued' | 'simulated';
  timestamp: string;
}

export interface AdminStats {
  total_users: number;
  total_waitlist: number;
  pending_waitlist: number;
  approved_waitlist: number;
  rejected_waitlist: number;
  total_inquiries: number;
  new_inquiries: number;
  total_subscribers: number;
  total_emails_sent: number;
  total_projects: number;
  total_agent_tasks: number;
}
