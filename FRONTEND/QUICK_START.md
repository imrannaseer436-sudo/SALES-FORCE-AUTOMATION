# Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### 1. Start the App
```bash
cd "d:\Work Folder\ESSA SFA\FRONTEND"
npm start
```

### 2. Open on Your Device
```bash
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web browser
```

### 3. Navigate
- **Home** shows 3 modules
- Click **Employees** → See list with search/filter → Click card for details
- Click **Contacts** → See list with search/filter → Click card for details
- Click **Hierarchy** → See organizational structure

---

## 📁 File Quick Lookup

### I want to...

**Add a new screen**
```
Create: app/myfeature/index.tsx
Import in: app/_layout.tsx
```

**Change colors**
```
Edit: lib/colors.ts
Both light and dark mode colors defined
```

**Change spacing/sizes**
```
Edit: lib/spacing.ts
Update xs, sm, md, lg, xl, 2xl values
```

**Add a utility function**
```
Edit: utils/formatting.ts
Add new function with JSDoc comments
```

**Create a new component**
```
Create: components/ui/MyComponent.tsx
Export from: components/ui/index.ts
```

**Update API endpoints**
```
Edit: lib/api.ts
Add/modify in API_ENDPOINTS object
```

**Change employee card design**
```
Edit: components/modules/employees/EmployeeCard.tsx
Update styles object
```

**Add validation**
```
Edit: utils/formatting.ts
Add isValid... function
```

**Update database types**
```
Edit: types/schema.ts
Update interfaces to match backend schema
```

---

## 🎨 Common Customizations

### Change Primary Color
```typescript
// In lib/colors.ts
primary: '#4F46E5',  // Change this hex color

// Then rebuild to see changes
```

### Adjust Spacing
```typescript
// In lib/spacing.ts
md: 16,  // Change from 16 to 20, etc.
```

### Modify Card Style
```typescript
// In components/ui/Card.tsx
card: {
  backgroundColor: scheme.surface,
  borderRadius: radius['2xl'],
  padding: spacing.lg,  // Change padding here
  // ... other styles
}
```

### Change Badge Colors
```typescript
// In components/ui/Card.tsx
const variantColors = {
  primary: { bg: scheme.primarySoft, text: scheme.primary },
  success: { bg: '#D1FAE5', text: colors.light.success },
  // ... modify these color pairs
}
```

### Add New Role Type
```typescript
// In types/schema.ts
export type UserRole = 
  | 'company_admin' 
  | 'sm' 
  | 'rsm' 
  | 'distributor' 
  | 'agent' 
  | 'salesman'
  | 'new_role';  // Add here
```

---

## 🔧 Common Issues & Solutions

### Colors look wrong
```
❌ Problem: Colors are inverted
✅ Solution: Force reload (Shift+R in dev menu)
```

### Search not working
```
❌ Problem: Search is only in mock data
✅ Solution: Replace setSearchText state with API call
```

### Navigation not working
```
❌ Problem: Screen won't load
✅ Solution: Check app/_layout.tsx has route registered
```

### Type errors
```
❌ Problem: TypeScript errors
✅ Solution: Check types/schema.ts matches your backend data
```

### Styling looks different on real device
```
❌ Problem: Colors or spacing off
✅ Solution: Check useColorScheme() is returning correct value
```

---

## 📚 Documentation Map

| Need | File |
|------|------|
| Screen overview & features | `DELIVERABLES.md` |
| How to integrate with API | `IMPLEMENTATION.md` |
| Visual architecture | `ARCHITECTURE.md` |
| Detailed screen specs | `SCREENS.md` |
| File structure | `FILE_TREE.md` |
| Design guidelines | `frontend.md` |

---

## 🎯 Next Steps (Priority Order)

1. **Test the app** - Run on Android/iOS
2. **Review screens** - Check UI looks good
3. **Connect API** - Replace mock data with real API
4. **Add forms** - Create add/edit screens
5. **Add bottom tabs** - Home, Visits, Map, Attendance, More
6. **Deploy** - Build APK/IPA

---

## 🧪 Testing

### Test Employee Search
1. Go to Employees
2. Type "Rajesh" in search
3. Should filter to one card

### Test Contact Filter
1. Go to Contacts
2. Click "DISTRIBUTOR"
3. Should show only distributors

### Test Dark Mode
1. Go to device settings
2. Change theme to dark
3. App should update colors

### Test Employee Detail
1. Go to Employees
2. Click any employee card
3. Should show detail screen

---

## 🚨 Important Notes

### Mock Data
- All screens have mock data included
- Replace in screen components when API is ready
- See `IMPLEMENTATION.md` for API integration steps

### Type Safety
- All types are defined in `types/schema.ts`
- Update when your backend schema changes
- TypeScript will catch mismatches

### Styling
- Never hardcode colors - always use `colors.light` or `colors.dark`
- Use spacing constants from `lib/spacing.ts`
- Follow existing patterns in components

### Performance
- Lists use `FlatList` (already optimized)
- Components are memoizable
- Keep heavy operations out of render

---

## 🎁 Included Utilities

```typescript
// Formatting
getInitials("Rajesh Kumar")        // "RK"
formatPhone("9876543210")          // "+91-98765-43210"
formatCurrency(50000)              // "₹50,000"
formatDate("2023-01-15")           // "15 Jan 2023"

// Validation
isValidGST("27AABCT1234H1Z0")     // true
isValidAadhar("1234-5678-9012")   // true
isValidPhone("9876543210")         // true

// Display Names
getRoleDisplayName("salesman")     // "Salesman"
getCategoryDisplayName("agent")    // "Agent"

// Date Utilities
daysSince("2024-01-15")           // 119
getRelativeTime("2024-01-15")     // "4 months ago"
```

---

## 💾 File Backup Tip

Before making major changes:
```bash
git init
git add .
git commit -m "Initial commit - all screens working"
```

Then you can always revert if something breaks.

---

## 📞 Key Files at a Glance

| File | Purpose | What to Edit |
|------|---------|-------------|
| `app/index.tsx` | Home screen | Module cards, layout |
| `app/employees/index.tsx` | Employees list | Search, filter logic |
| `lib/colors.ts` | Color scheme | Theme colors |
| `lib/spacing.ts` | Spacing grid | Space sizes |
| `types/schema.ts` | Data types | Database fields |
| `components/ui/*.tsx` | UI components | Visual style |
| `utils/formatting.ts` | Helpers | Formatting functions |
| `lib/api.ts` | API config | Endpoints |

---

## ✨ You're All Set!

Everything is ready to:
- ✅ Test immediately
- ✅ Customize styling
- ✅ Connect to backend
- ✅ Add more features
- ✅ Deploy to production

**Start with:** `npm start`

**Questions?** Check the documentation files or review the code comments.

Good luck! 🚀
