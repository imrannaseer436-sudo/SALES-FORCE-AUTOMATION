// User roles
export type UserRole = 'company_admin' | 'sm' | 'rsm' | 'distributor' | 'agent' | 'salesman';

export interface User {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: bigint;
  employee_user_id: bigint;
  user_id: bigint;
  code: string;
  joining_date: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  aadhar_no: string;
  img_url?: string;
  uan: string;
  esi_no: string;
  pf_no: string;
  wages: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // User object populated from join
  user?: User;
}

export interface Contact {
  id: bigint;
  contact_user_id: bigint;
  user_id: bigint;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  phone_1: string;
  phone_2?: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
  gst: string;
  category: string; // 'agent' | 'distributor' | 'retailer'
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // User object populated from join
  user?: User;
}

export interface RSMEmployee {
  id: bigint;
  rsm_user_id: bigint;
  employee_user_id: bigint;
  user_id: bigint;
  created_at: string;
  updated_at: string;
}
