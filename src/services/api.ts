/**
 * Vorcove Frontend API Service
 * Connects React UI components to the Express & MongoDB backend.
 */

const API_BASE_URL = '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    pages: number;
  };
  sessionId?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Token management
const TOKEN_KEY = 'vorcove_admin_token';
const USER_KEY = 'vorcove_admin_user';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredAdminUser = (): AdminUser | null => {
  const u = localStorage.getItem(USER_KEY);
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
};

export const setAuthSession = (token: string, user: AdminUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isUserAuthenticated = (): boolean => {
  return Boolean(getAuthToken());
};

// Generic fetch wrapper with headers and error parsing
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error ${response.status}: ${response.statusText}`
      };
    }

    return data;
  } catch (error: any) {
    console.error(`[API Client Error] ${endpoint}:`, error);
    return {
      success: false,
      error: error.message || 'Network connection failed. Ensure backend server is running.'
    };
  }
}

// ==========================================
// 1. Health & Status
// ==========================================
export const checkApiHealth = async () => {
  return apiRequest<{
    status: string;
    database: {
      isConnected: boolean;
      storageMode: string;
      readyStateLabel: string;
    };
    uptimeSeconds: number;
  }>('/health');
};

// ==========================================
// 2. Contact Inquiries & Scoping Leads
// ==========================================
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  brief: string;
  selectedServices?: string[];
  selectedBudget?: string;
  selectedTimeline?: string;
}

export const submitContactInquiry = async (payload: ContactPayload) => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const fetchAdminInquiries = async (status?: string, search?: string) => {
  let query = '';
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  if (params.toString()) query = `?${params.toString()}`;

  return apiRequest<any[]>(`/contact${query}`);
};

export const updateInquiryStatus = async (
  id: string,
  updates: { status?: string; internalNotes?: string; priority?: string }
) => {
  return apiRequest(`/contact/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });
};

export const deleteInquiry = async (id: string) => {
  return apiRequest(`/contact/${id}`, {
    method: 'DELETE'
  });
};

// ==========================================
// 3. ROI & Scope Audits
// ==========================================
export interface RoiPayload {
  teamSize: number;
  projectType: 'ai-ops' | 'pricing' | 'product' | 'data';
  hourlyRate: number;
  hoursWastedPerWeek: number;
  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;
}

export const calculateRoiEstimate = async (payload: Partial<RoiPayload>) => {
  return apiRequest('/roi/calculate', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const saveRoiAudit = async (payload: RoiPayload) => {
  return apiRequest('/roi/save', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const fetchAdminRoiAudits = async () => {
  return apiRequest<any[]>('/roi');
};

// ==========================================
// 4. AI Studio Assistant
// ==========================================
export const sendAssistantMessage = async (
  message: string,
  sessionId?: string,
  topicId?: string,
  categoryId?: string
) => {
  return apiRequest('/assistant/chat', {
    method: 'POST',
    body: JSON.stringify({ message, sessionId, topicId, categoryId })
  });
};

export const captureAssistantLead = async (payload: {
  sessionId: string;
  name?: string;
  email: string;
  company?: string;
  interest?: string;
}) => {
  return apiRequest('/assistant/lead', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};

export const fetchAdminAssistantSessions = async () => {
  return apiRequest<any[]>('/assistant/conversations');
};

// ==========================================
// 5. Interactive Demos & Telemetry
// ==========================================
export const executeCopilotTriage = async (ticket: {
  ticketId?: string;
  subject: string;
  body: string;
}) => {
  return apiRequest('/demos/copilot/run', {
    method: 'POST',
    body: JSON.stringify(ticket)
  });
};

export const executePricingSimulation = async (params: {
  monthlyRevenue: number;
  baseMargin: number;
  elasticityScore: number;
}) => {
  return apiRequest('/demos/pricing/simulate', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

export const executeChurnAnalysis = async (params: {
  accountName: string;
  usageDropPercent: number;
  openTickets: number;
  contractValue: number;
}) => {
  return apiRequest('/demos/churn/analyze', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};

export const fetchDemoTelemetry = async () => {
  return apiRequest<any[]>('/demos/telemetry');
};

// ==========================================
// 6. Case Studies & Testimonials
// ==========================================
export const fetchCaseStudies = async (category?: string) => {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  return apiRequest<any[]>(`/case-studies${query}`);
};

export const fetchTestimonials = async () => {
  return apiRequest<any[]>('/testimonials');
};

// ==========================================
// 7. Admin Authentication & Analytics
// ==========================================
export const loginAdmin = async (email: string, password: string) => {
  const response = await apiRequest<{ token: string; user: AdminUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (response.success && response.data) {
    setAuthSession(response.data.token, response.data.user);
  }

  return response;
};

export const fetchAdminStats = async () => {
  return apiRequest<{
    stats: {
      totalInquiries: number;
      newInquiries: number;
      totalAudits: number;
      totalEstimatedSavings: number;
      totalChatSessions: number;
      capturedChatLeads: number;
      totalDemoRuns: number;
      caseStudiesCount: number;
    };
    system: {
      uptimeSeconds: number;
      nodeVersion: string;
      memoryUsageMB: number;
      platform: string;
      dbStatus: {
        isConnected: boolean;
        storageMode: string;
        readyStateLabel: string;
      };
    };
  }>('/admin/stats');
};
