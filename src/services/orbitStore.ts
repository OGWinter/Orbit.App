/**
 * Orbit Client Storage Service (Phase 1 Preview)
 * 
 * Provides client-side preview persistence using localStorage.
 * Explicitly identified as local design preview data with zero server claims.
 */

import { WaitlistApplicant, TeamInquiry, NewsletterSubscriber, EmailLog, AdminStats } from '../types/orbit';

class OrbitStore {
  private waitlistKey = 'orbit_preview_waitlist';
  private inquiriesKey = 'orbit_preview_inquiries';
  private subscribersKey = 'orbit_preview_subscribers';
  private emailsKey = 'orbit_preview_emails';

  private fallbackWaitlist: WaitlistApplicant[] = [
    {
      id: 'wl_01',
      email: 'alex@frontier.io',
      full_name: 'Alex Rivera',
      builder_role: 'fullstack',
      company: 'Frontier Labs',
      use_case: 'Multi-agent full stack refactorings',
      status: 'approved',
      queue_position: 1,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'wl_02',
      email: 'priya@syntax.dev',
      full_name: 'Priya Sharma',
      builder_role: 'frontend',
      company: 'Syntax Design',
      use_case: 'Component library design tokens',
      status: 'pending',
      queue_position: 2,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'wl_03',
      email: 'marcus@systems.co',
      full_name: 'Marcus Vance',
      builder_role: 'backend',
      company: 'Vance Systems',
      use_case: 'Distributed rate-limiting and DB migrations',
      status: 'pending',
      queue_position: 3,
      created_at: new Date().toISOString(),
    },
  ];

  private fallbackInquiries: TeamInquiry[] = [
    {
      id: 'inq_01',
      name: 'Elena Rostova',
      email: 'elena@hyperion.com',
      company: 'Hyperion AI',
      inquiry_type: 'demo',
      message: 'Looking to deploy Orbit workspace across a team of 18 engineers.',
      status: 'new',
      created_at: new Date().toISOString(),
    },
  ];

  private fallbackSubscribers: NewsletterSubscriber[] = [
    {
      email: 'dev@orbit.app',
      source: 'landing_footer',
      subscribed_at: new Date().toISOString(),
    },
  ];

  private fallbackEmails: EmailLog[] = [
    {
      id: 'eml_01',
      recipient: 'alex@frontier.io',
      subject: 'Welcome to Orbit Cohort #1 (Design Preview)',
      type: 'waitlist_confirmation',
      status: 'simulated',
      timestamp: new Date().toISOString(),
    },
  ];

  constructor() {
    this.initStorage();
  }

  private initStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      if (!localStorage.getItem(this.waitlistKey)) {
        localStorage.setItem(this.waitlistKey, JSON.stringify(this.fallbackWaitlist));
      }
      if (!localStorage.getItem(this.inquiriesKey)) {
        localStorage.setItem(this.inquiriesKey, JSON.stringify(this.fallbackInquiries));
      }
      if (!localStorage.getItem(this.subscribersKey)) {
        localStorage.setItem(this.subscribersKey, JSON.stringify(this.fallbackSubscribers));
      }
      if (!localStorage.getItem(this.emailsKey)) {
        localStorage.setItem(this.emailsKey, JSON.stringify(this.fallbackEmails));
      }
    } catch {
      // Ignore storage errors in private browsing modes
    }
  }

  public validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test((email || '').trim());
  }

  public getWaitlist(): WaitlistApplicant[] {
    if (typeof window === 'undefined') return this.fallbackWaitlist;
    try {
      const data = localStorage.getItem(this.waitlistKey);
      return data ? JSON.parse(data) : this.fallbackWaitlist;
    } catch {
      return this.fallbackWaitlist;
    }
  }

  public joinWaitlist(params: {
    email: string;
    full_name?: string | null;
    builder_role: string;
    company?: string | null;
    use_case?: string | null;
  }): { applicant: WaitlistApplicant; queue_position: number } {
    const email = params.email.toLowerCase().trim();
    if (!this.validateEmail(email)) {
      throw new Error('Please enter a valid work email address (e.g. name@company.com).');
    }

    const current = this.getWaitlist();
    const existingIndex = current.findIndex((item) => item.email === email);

    if (existingIndex >= 0) {
      return {
        applicant: current[existingIndex],
        queue_position: current[existingIndex].queue_position,
      };
    }

    const nextPosition = current.length + 1;
    const newEntry: WaitlistApplicant = {
      id: `wl_${Date.now()}`,
      email,
      full_name: params.full_name || null,
      builder_role: params.builder_role || 'fullstack',
      company: params.company || null,
      use_case: params.use_case || null,
      status: 'pending',
      queue_position: nextPosition,
      created_at: new Date().toISOString(),
    };

    current.unshift(newEntry);
    try {
      localStorage.setItem(this.waitlistKey, JSON.stringify(current));
    } catch {
      // ignore
    }

    return { applicant: newEntry, queue_position: nextPosition };
  }

  public updateWaitlistStatus(id: string, status: 'pending' | 'approved' | 'rejected'): boolean {
    const current = this.getWaitlist();
    const target = current.find((item) => item.id === id);
    if (!target) return false;
    target.status = status;
    try {
      localStorage.setItem(this.waitlistKey, JSON.stringify(current));
    } catch {
      // ignore
    }
    return true;
  }

  public deleteWaitlistEntry(id: string): boolean {
    const current = this.getWaitlist().filter((item) => item.id !== id);
    try {
      localStorage.setItem(this.waitlistKey, JSON.stringify(current));
    } catch {
      // ignore
    }
    return true;
  }

  public getInquiries(): TeamInquiry[] {
    if (typeof window === 'undefined') return this.fallbackInquiries;
    try {
      const data = localStorage.getItem(this.inquiriesKey);
      return data ? JSON.parse(data) : this.fallbackInquiries;
    } catch {
      return this.fallbackInquiries;
    }
  }

  public submitInquiry(params: {
    name: string;
    email: string;
    company?: string | null;
    inquiry_type: string;
    message: string;
  }): TeamInquiry {
    const email = params.email.toLowerCase().trim();
    if (!this.validateEmail(email)) {
      throw new Error('Please enter a valid work email address.');
    }
    if (!params.name.trim()) throw new Error('Please enter your full name.');
    if (!params.message.trim()) throw new Error('Please enter your inquiry details.');

    const current = this.getInquiries();
    const newInquiry: TeamInquiry = {
      id: `inq_${Date.now()}`,
      name: params.name.trim(),
      email,
      company: params.company?.trim() || null,
      inquiry_type: params.inquiry_type || 'demo',
      message: params.message.trim(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    current.unshift(newInquiry);
    try {
      localStorage.setItem(this.inquiriesKey, JSON.stringify(current));
    } catch {
      // ignore
    }

    return newInquiry;
  }

  public subscribeNewsletter(email: string, source: string = 'landing_footer'): NewsletterSubscriber {
    const cleanEmail = email.toLowerCase().trim();
    if (!this.validateEmail(cleanEmail)) {
      throw new Error('Please enter a valid work email address (e.g. name@company.com).');
    }

    const current: NewsletterSubscriber[] = (() => {
      try {
        const data = localStorage.getItem(this.subscribersKey);
        return data ? JSON.parse(data) : this.fallbackSubscribers;
      } catch {
        return this.fallbackSubscribers;
      }
    })();

    const existing = current.find((s) => s.email === cleanEmail);
    if (existing) return existing;

    const newSub: NewsletterSubscriber = {
      email: cleanEmail,
      source,
      subscribed_at: new Date().toISOString(),
    };

    current.unshift(newSub);
    try {
      localStorage.setItem(this.subscribersKey, JSON.stringify(current));
    } catch {
      // ignore
    }

    return newSub;
  }

  public getStats(): AdminStats {
    const waitlist = this.getWaitlist();
    const inquiries = this.getInquiries();
    return {
      total_users: 1,
      total_waitlist: waitlist.length,
      pending_waitlist: waitlist.filter((w) => w.status === 'pending').length,
      approved_waitlist: waitlist.filter((w) => w.status === 'approved').length,
      rejected_waitlist: waitlist.filter((w) => w.status === 'rejected').length,
      total_inquiries: inquiries.length,
      new_inquiries: inquiries.filter((i) => i.status === 'new').length,
      total_subscribers: 2,
      total_emails_sent: 3,
      total_projects: 3,
      total_agent_tasks: 12,
    };
  }
}

export const orbitStore = new OrbitStore();
