/**
 * Resilient In-Memory Storage
 * Provides seamless fallback persistence when MongoDB server is offline or starting up.
 */

export interface InMemoryStore {
  inquiries: any[];
  roiAudits: any[];
  chatSessions: any[];
  demoLogs: any[];
  caseStudies: any[];
  testimonials: any[];
  subscribers: any[];
  adminUsers: any[];
}

export const memoryStore: InMemoryStore = {
  inquiries: [],
  roiAudits: [],
  chatSessions: [],
  demoLogs: [],
  caseStudies: [],
  testimonials: [],
  subscribers: [],
  adminUsers: []
};

let initialized = false;

export const initializeMemoryStore = (initialData?: Partial<InMemoryStore>) => {
  if (initialized) return;
  if (initialData) {
    if (initialData.caseStudies) memoryStore.caseStudies = [...initialData.caseStudies];
    if (initialData.testimonials) memoryStore.testimonials = [...initialData.testimonials];
    if (initialData.adminUsers) memoryStore.adminUsers = [...initialData.adminUsers];
    if (initialData.inquiries) memoryStore.inquiries = [...initialData.inquiries];
    if (initialData.roiAudits) memoryStore.roiAudits = [...initialData.roiAudits];
  }
  initialized = true;
};
