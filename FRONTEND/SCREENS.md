# Screen Implementation Guide

This document describes the screens created based on your database schema for the ESSA SFA field force management application.

## Project Structure

```
FRONTEND/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Card.tsx           # Card, Badge, SectionHeader
│   │   ├── Avatar.tsx         # Avatar, StatusIndicator
│   │   └── index.ts           # Exports
│   └── modules/
│       ├── employees/         # Employee-specific components
│       │   ├── EmployeeCard.tsx
│       │   └── index.ts
│       └── contacts/          # Contact-specific components
│           ├── ContactCard.tsx
│           └── index.ts
├── lib/
│   ├── colors.ts              # Color palette for light/dark modes
│   └── spacing.ts             # Design tokens (spacing & radius)
├── types/
│   └── schema.ts              # TypeScript types for database entities
└── app/
    ├── index.tsx              # Home/Dashboard screen
    ├── _layout.tsx            # Root navigation layout
    ├── employees/
    │   ├── index.tsx          # Employees list with search/filter
    │   └── [id].tsx           # Employee detail screen
    ├── contacts/
    │   ├── index.tsx          # Contacts list with search/filter
    │   └── [id].tsx           # Contact detail screen
    └── network/
        └── index.tsx          # Organizational hierarchy visualization
```

## Screens Overview

### 1. **Home Screen** (`app/index.tsx`)
- Welcome greeting
- Module navigation cards (Employees, Contacts, Hierarchy)
- Each card has description and CTA button
- Premium, spacious design with module icons

### 2. **Employees Module** (`app/employees/`)

#### List Screen (`index.tsx`)
- Display all employees in card format
- **Search functionality**: Name or employee ID
- **Filter options**: By role (Salesman, RSM, SM)
- **EmployeeCard component** shows:
  - Circular avatar with initials
  - Employee name and code
  - Role badge with color coding
  - Location and joining date
  - Active/inactive status indicator

#### Detail Screen (`[id].tsx`)
- Hero section with large avatar and name
- **Employment Information**:
  - Employee code and joining date
  - Monthly wages and status
- **Address Section**: Full address with city, district, state, pincode
- **Government IDs**: Aadhar, UAN, ESI, PF numbers
- Clean scrollable layout with section headers

### 3. **Contacts Module** (`app/contacts/`)

#### List Screen (`index.tsx`)
- Display agents, distributors, and retailers
- **Search**: Name, GST number, phone numbers
- **Filter**: By category (Agent, Distributor, Retailer)
- **ContactCard component** shows:
  - Avatar with initials
  - Business name and category badge
  - City, district, and phone numbers
  - GST in monospace font in a subtle box
  - Active/inactive status

#### Detail Screen (`[id].tsx`)
- Hero section with avatar, name, and category
- **Contact Information**: Phone numbers and email
- **Tax Information**: GST number in highlighted box
- **Address**: Complete business address
- Status indicator
- Scrollable with organized sections

### 4. **Network/Hierarchy Screen** (`app/network/index.tsx`)
- Interactive organizational hierarchy visualization
- **Node structure**:
  - Company Admin (Red)
  - Sales Manager (Primary/Indigo)
  - Regional Sales Manager (Orange/Warning)
  - Salesman (Green/Success)
- **Features**:
  - Expandable/collapsible tree nodes
  - Colored left border indicating role type
  - Avatar with initials
  - Color legend showing role hierarchy
  - Responsive indentation

## Design System

### Colors (`lib/colors.ts`)
- **Light Mode**: Slate 50 background, White surface
- **Dark Mode**: Slate 950 background, Slate 900 surface
- **Primary**: Indigo 600
- **Status Colors**: Success (Emerald), Warning (Amber), Danger (Rose), Info (Sky)

### Spacing (`lib/spacing.ts`)
8-point spacing system:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

Border Radius:
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `full`: 9999px

### UI Components

#### Card
```tsx
<Card onPress={handlePress}>
  {/* Content */}
</Card>
```

#### Badge
```tsx
<Badge 
  label="Salesman" 
  variant="primary" | "success" | "warning" | "danger" | "info"
/>
```

#### Avatar
```tsx
<Avatar 
  initials="RK" 
  size="sm" | "md" | "lg"
  backgroundColor={color}
/>
```

#### StatusIndicator
```tsx
<StatusIndicator 
  status="active" | "inactive" | "away"
  size="sm" | "md"
/>
```

#### SectionHeader
```tsx
<SectionHeader 
  title="Section Title"
  subtitle="Optional subtitle"
  action={<Button />}
/>
```

## Database Schema Integration

### User Entity
Represents all user accounts with role-based access:
- Roles: `company_admin`, `sm`, `rsm`, `distributor`, `agent`, `salesman`
- Used in employee and contact screens

### Employee Entity
Sales representatives with employment details:
- Linked to `users` table via `employee_user_id`
- Stores employment info, government IDs, address, wages
- Status: active/inactive

### Contact Entity
Business profiles for agents, distributors, retailers:
- Linked to `users` table via `contact_user_id`
- Stores business details, GST, address, phone
- Category: agent, distributor, retailer

### RSMEmployee Entity
Relationship mapping between RSMs and their sales team:
- Used for hierarchy visualization
- Establishes reporting structure

## Type Definitions

All TypeScript types are in `types/schema.ts`:
- `User`, `Employee`, `Contact`, `RSMEmployee`
- `UserRole` type for role validation
- Properly aligned with database schema

## Mock Data

Each screen includes mock data for demonstration:
- Employees: 3 sample employees (Rajesh, Priya, Arjun)
- Contacts: 3 sample contacts (ABC Distribution, XYZ Retail, Metro Store)
- Hierarchy: Multi-level organizational structure

Replace with API calls to your backend.

## Navigation Flow

```
Home (index.tsx)
├── Employees (employees/index.tsx)
│   └── Employee Detail (employees/[id].tsx)
├── Contacts (contacts/index.tsx)
│   └── Contact Detail (contacts/[id].tsx)
└── Hierarchy (network/index.tsx)
```

## Styling Approach

- Uses React Native `StyleSheet` for performance
- Color scheme tokens for light/dark mode support
- Consistent spacing and typography
- Subtle shadows and rounded corners
- Flexbox layouts for responsive design

## Next Steps

1. **Connect to Backend**: Replace mock data with API calls
2. **Add Navigation**: Set up tab navigation for bottom tabs
3. **Implement Search**: Add real search and filtering logic
4. **Add Forms**: Create forms for creating/editing employees and contacts
5. **Error Handling**: Add error states and loading skeletons
6. **Images**: Implement actual image uploads for avatars
7. **Offline Support**: Use MMKV/SQLite for offline data

## Dependencies

Current setup uses:
- React Native 0.81
- Expo Router 6.0
- Expo 54.0
- React 19.1
- TypeScript 5.9

No additional dependencies installed yet. Consider adding:
- `nativewind` for Tailwind support (optional, current solution uses native styles)
- `react-hook-form` + `zod` for forms
- `axios` for API calls
- `zustand` for state management
