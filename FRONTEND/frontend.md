# Project Context — Premium React Native Field Force Application

## Product Vision

Build a world-class enterprise mobile application for field sales and workforce management.

The application should feel as polished and refined as products like Linear, Notion, Stripe Dashboard, and modern CRM systems. It must work beautifully on both iOS and Android while maintaining a single codebase.

The overall impression should be:

> Premium. Minimal. Fast. Spacious. Professional. Trustworthy.

This is not a traditional ERP-style application with cluttered screens and excessive forms. Every screen should feel intentionally designed with excellent typography, generous spacing, subtle animations, and consistent reusable components.

---

# Core Design Philosophy

1. Typography-first design
2. Spacious layouts with generous whitespace
3. Rounded cards and soft shadows
4. Minimal color usage with one strong accent color
5. Smooth micro-interactions and transitions
6. Clear visual hierarchy
7. Consistent reusable components
8. Platform-native behavior on iOS and Android
9. Offline-first user experience
10. Enterprise-grade professionalism

---

# Visual Inspiration

Use the following products as design inspiration:

- Linear
- Notion
- Stripe
- Slack
- Airtable
- Salesforce Mobile
- HubSpot Mobile

Search inspiration on:
- Mobbin
- Dribbble
- Figma Community

---

# Technology Stack

## Mobile Framework
- React Native
- Expo
- TypeScript

## Navigation
- Expo Router
- React Navigation

## Styling
- NativeWind (Tailwind CSS for React Native)

## Animation
- React Native Reanimated
- Moti

## Icons
- Lucide Icons

## State Management
- Zustand

## Forms
- React Hook Form
- Zod

## API
- Axios

## Local Storage
- MMKV
- SQLite (for offline data)

## Maps
- React Native Maps

## Notifications
- Firebase Cloud Messaging

---

# Typography

Font Family:
- Inter

Font Weights:
- 400 Regular
- 500 Medium
- 600 Semibold
- 700 Bold

Text Scale:
- Display: 32
- Heading 1: 28
- Heading 2: 24
- Heading 3: 20
- Body Large: 16
- Body: 14
- Caption: 12

Line Heights:
- Tight and readable with generous spacing.

---

# Color Palette

## Light Theme

Primary: Indigo 600
Primary Soft: Indigo 50

Background: Slate 50
Surface: White
Surface Secondary: Slate 100

Text Primary: Slate 900
Text Secondary: Slate 500
Text Muted: Slate 400

Border: Slate 200

Success: Emerald 500
Warning: Amber 500
Danger: Rose 500
Info: Sky 500

## Dark Theme

Background: Slate 950
Surface: Slate 900
Text Primary: White
Text Secondary: Slate 400
Border: Slate 800

---

# Spacing System

Use an 8-point spacing system.

- xs = 4
- sm = 8
- md = 16
- lg = 24
- xl = 32
- 2xl = 48

---

# Border Radius

- Small = 8
- Medium = 12
- Large = 16
- XL = 20
- 2XL = 24
- Full = 9999

Default card radius should be 24.

---

# Shadows

Use soft and subtle shadows.

Avoid heavy dark shadows.

Prefer low-opacity shadows and slight elevation.

---

# Component Design Principles

All UI should be composed from reusable components.

## Core Components

- Screen
- Card
- StatCard
- SectionHeader
- Badge
- Button
- IconButton
- Input
- SearchBar
- Avatar
- EmptyState
- Skeleton
- BottomSheet
- TimelineItem
- KPIWidget

---

# Navigation Structure

## Bottom Tabs

1. Home
2. Visits
3. Map
4. Attendance
5. More

## Additional Modules

- Employees
- Contacts
- Orders
- Reports
- Notifications
- Settings

---

# Home Screen

The home screen should include:

- Personalized greeting
- KPI cards
- Quick actions
- Today's tasks
- Recent activity
- Sync status

KPI Cards:
- Today Visits
- Completed Visits
- Pending Visits
- Distance Travelled
- Sales Total

Quick Actions:
- Start Attendance
- Add Visit
- Capture Photo
- View Map

---

# Employees Module

Premium employee cards with:

- Circular avatar
- Name
- Employee code
- Role badge
- City
- Status indicator

Employee detail screen should contain:

- Hero profile header
- Employment information
- Address
- Documents
- Reporting hierarchy

---

# Contacts Module

Used for:

- Agents
- Distributors
- Retailers

Features:
- Segmented filters
- Search
- Business profile cards
- GST details
- Address and contact information

---

# Network Screen

Interactive hierarchy visualization using reporting relationships.

Company Admin
└── SM
    └── RSM
        ├── Salesman A
        ├── Salesman B
        └── Salesman C

---

# Visit Timeline

Vertical timeline with:

- Shop photo
- Check-in time
- Duration
- Status
- Notes
- Photos

---

# Attendance Screen

Circular progress showing:
- Check-in time
- Working hours
- Break duration
- Check-out action

---

# Map Screen

Full-screen map with:

- Current location
- Team markers
- Route lines
- Geofencing indicators

---

# Search Experience

Global command palette style search.

Search across:
- Employees
- Contacts
- Shops
- Orders
- Codes
- GST numbers

---

# Animation Guidelines

Use animations sparingly and consistently.

Recommended:
- Fade in
- Slide up
- Staggered lists
- Skeleton loaders
- Pull-to-refresh
- Haptic feedback

Duration:
- 200–300ms

---

# Interaction Guidelines

- Touch targets minimum 44x44
- Use haptic feedback on important actions
- Pull to refresh
- Swipe actions
- Floating action buttons where appropriate

---

# Platform-Specific Guidelines

## iOS
- Respect safe areas
- Use blur and translucency where appropriate
- Smooth spring animations

## Android
- Material-compliant ripple feedback
- Proper back navigation
- Consistent elevations

---

# Dark Mode

Every screen must support both light and dark themes.

Use semantic color tokens only.

Never hardcode colors directly in components.

---

# Offline-First UX

Show:
- Sync status
- Pending uploads
- Retry actions
- Last sync time

Users should always know whether data is saved locally or synced.

---

# Performance Standards

- Use FlashList for large lists
- Memoize expensive components
- Lazy load screens
- Optimize images
- Avoid unnecessary re-renders

---

# Accessibility

- Adequate contrast
- Scalable font sizes
- Screen reader labels
- Clear touch targets

---

# Recommended Folder Structure

app/
components/
  ui/
  dashboard/
  employees/
  contacts/
  visits/
  maps/
  forms/
lib/
hooks/
store/
services/
theme/
types/
utils/

---

# AI Prompt Template

Build a premium React Native screen using Expo Router, TypeScript, NativeWind, and Lucide icons. Use Inter font, rounded 2xl cards, generous whitespace, subtle shadows, smooth Moti animations, and a clean enterprise aesthetic inspired by Linear, Notion, and Stripe. Ensure the screen looks excellent on both iOS and Android and supports light and dark mode.

---

# Code Quality Standards

- TypeScript strict mode
- Reusable components
- Semantic naming
- No inline magic values
- Use design tokens
- Keep components small and focused

---

# Overall Product Goal

The final application should look like a premium SaaS mobile product rather than a conventional ERP.

Users should immediately feel that the app is:

- Modern
- Fast
- Reliable
- Elegant
- Professional
- Enterprise-grade