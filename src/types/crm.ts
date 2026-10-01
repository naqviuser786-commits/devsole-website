export type UserRole = 'admin' | 'manager' | 'employee';
export type UserStatus = 'active' | 'suspended';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export type CustomerStatus = 'new' | 'contacted' | 'active' | 'inactive' | 'converted' | 'lost';

export interface Customer {
  id: string;
  custom_id: string;
  name: string;
  company_name?: string | null;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  customer_type: string;
  source: string;
  status: CustomerStatus;
  assigned_to?: string | null;
  assigned_profile?: UserProfile | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'negotiation'
  | 'converted'
  | 'lost';

export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Lead {
  id: string;
  custom_id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  source: string;
  service_interested: string;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to?: string | null;
  assigned_profile?: UserProfile | null;
  estimated_value: number;
  currency: string;
  notes?: string | null;
  next_followup?: string | null;
  last_contact?: string | null;
  converted_customer_id?: string | null;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus =
  | 'planning'
  | 'in_progress'
  | 'review'
  | 'on_hold'
  | 'completed'
  | 'cancelled';

export interface Project {
  id: string;
  custom_id: string;
  title: string;
  client_id?: string | null;
  client?: Customer | null;
  description?: string | null;
  service_type: string;
  project_manager_id?: string | null;
  manager_profile?: UserProfile | null;
  start_date: string;
  deadline?: string | null;
  budget: number;
  currency: string;
  status: ProjectStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CrmTask {
  id: string;
  task_name: string;
  description?: string | null;
  project_id?: string | null;
  project?: Project | null;
  assigned_to?: string | null;
  assigned_profile?: UserProfile | null;
  created_by?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  due_date?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type FollowupType = 'call' | 'whatsapp' | 'email' | 'meeting' | 'demo';
export type FollowupStatus = 'pending' | 'completed' | 'cancelled';

export interface Followup {
  id: string;
  title: string;
  customer_id?: string | null;
  lead_id?: string | null;
  customer?: Customer | null;
  lead?: Lead | null;
  followup_date: string;
  type: FollowupType;
  notes?: string | null;
  assigned_to?: string | null;
  assigned_profile?: UserProfile | null;
  status: FollowupStatus;
  created_at: string;
  updated_at: string;
}

export interface CrmActivity {
  id: string;
  entity_type: string;
  entity_id?: string | null;
  action: string;
  details?: Record<string, unknown> | null;
  performed_by?: string | null;
  performer?: UserProfile | null;
  created_at: string;
}

export interface CrmNote {
  id: string;
  entity_type: string;
  entity_id: string;
  content: string;
  created_by: string;
  author?: UserProfile | null;
  created_at: string;
}