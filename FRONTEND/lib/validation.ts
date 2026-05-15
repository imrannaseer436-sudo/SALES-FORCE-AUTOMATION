import { z } from 'zod';

// User roles enum
export const userRoleSchema = z.enum(['company_admin', 'sm', 'rsm', 'distributor', 'agent', 'salesman']);

const employeeBaseSchema = z.object({
  // User fields
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
  role: userRoleSchema,
  is_active: z.boolean().default(true),

  // Employee fields
  code: z.string().min(1, 'Employee code is required').max(20, 'Code must be less than 20 characters'),
  joining_date: z.string().min(1, 'Joining date is required'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(255, 'Address must be less than 255 characters'),
  city: z.string().min(2, 'City must be at least 2 characters').max(100, 'City must be less than 100 characters'),
  district: z.string().min(2, 'District must be at least 2 characters').max(100, 'District must be less than 100 characters'),
  state: z.string().min(2, 'State must be at least 2 characters').max(100, 'State must be less than 100 characters'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode (6 digits)'),
  aadhar_no: z.string().regex(/^[0-9]{12}$/, 'Aadhar number must be 12 digits').optional().or(z.literal('')),
  img_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  uan: z.string().min(1, 'UAN is required').max(50, 'UAN must be less than 50 characters'),
  esi_no: z.string().min(1, 'ESI number is required').max(50, 'ESI number must be less than 50 characters'),
  pf_no: z.string().min(1, 'PF number is required').max(50, 'PF number must be less than 50 characters'),
  wages: z.number().min(0, 'Wages must be positive').max(1000000, 'Wages must be less than 10 lakhs'),
});

export const employeeCreateSchema = employeeBaseSchema.extend({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const employeeEditSchema = employeeBaseSchema.extend({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
});

export type EmployeeCreateFormData = z.input<typeof employeeCreateSchema>;
export type EmployeeEditFormData = z.input<typeof employeeEditSchema>;