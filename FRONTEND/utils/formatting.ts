// Utility functions for formatting and data manipulation

/**
 * Get initials from a name
 * @example getInitials("Rajesh Kumar") => "RK"
 */
export const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Format phone number
 * @example formatPhone("9876543210") => "+91-98765-43210"
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return 'N/A';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91-${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
  }
  return phone;
};

/**
 * Format currency in Indian Rupees
 * @example formatCurrency(50000) => "₹50,000"
 */
export const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format date to local format
 * @example formatDate("2023-01-15") => "15 Jan 2023"
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

/**
 * Format date to month-year
 * @example formatMonthYear("2023-01-15") => "Jan 2023"
 */
export const formatMonthYear = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return 'N/A';
  }
};

/**
 * Truncate text with ellipsis
 * @example truncateText("Hello World", 8) => "Hello..."
 */
export const truncateText = (text: string, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Validate GST number format (Indian GST)
 * @example isValidGST("27AABCT1234H1Z0") => true
 */
export const isValidGST = (gst: string): boolean => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-L]{1}$/;
  return gstRegex.test(gst);
};

/**
 * Validate Aadhar number format
 * @example isValidAadhar("1234-5678-9012") => true
 */
export const isValidAadhar = (aadhar: string): boolean => {
  const aadharRegex = /^\d{4}-\d{4}-\d{4}$/;
  return aadharRegex.test(aadhar);
};

/**
 * Validate Indian phone number
 * @example isValidPhone("9876543210") => true
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
};

/**
 * Get role display name with proper casing
 * @example getRoleDisplayName("salesman") => "Salesman"
 */
export const getRoleDisplayName = (role: string): string => {
  const roleMap: Record<string, string> = {
    company_admin: 'Company Admin',
    sm: 'Sales Manager',
    rsm: 'Regional Sales Manager',
    distributor: 'Distributor',
    agent: 'Agent',
    salesman: 'Salesman',
  };
  return roleMap[role] || role;
};

/**
 * Get category display name with proper casing
 */
export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    agent: 'Agent',
    distributor: 'Distributor',
    retailer: 'Retailer',
  };
  return categoryMap[category] || category;
};

/**
 * Calculate days since date
 * @example daysSince("2024-01-15") => 119
 */
export const daysSince = (dateString: string): number => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch {
    return 0;
  }
};

/**
 * Format relative time
 * @example getRelativeTime("2024-01-15") => "4 months ago"
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const days = daysSince(dateString);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } catch {
    return 'N/A';
  }
};
