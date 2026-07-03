
## Goal

Add a complete admission + member management flow with two role-based admin panels and branded email notifications to **saqibharoonharoon@gmail.com**.

---

## 1. Backend (Lovable Cloud + Email)

Enable **Lovable Cloud** (needed for database + email sending) and set up a branded email domain (sender: `The Runners Gym <notify@yourdomain>`).

**Database tables:**
- `members` — auto-generated unique ID like `TR-2026-0001`, name, email, phone, age, program, goal, registration_fee_amount, registration_fee_paid (bool), join_date
- `monthly_fees` — member_id, month, year, amount, status (pending/paid), paid_date
- `admission_inquiries` — name, email, phone, age, program_interest, message, created_at
- `user_roles` — separate table with enum `super_admin | admin | member` (security best practice)

**Edge functions:**
- `send-admission-inquiry` — sends 2 emails: (1) inquiry alert to **saqibharoonharoon@gmail.com**, (2) branded confirmation to customer from "The Runners Gym"
- `register-member` — creates member with auto-generated unique ID, records registration fee, seeds first monthly fee

---

## 2. Website Changes

- **New "Admission" button** in Navbar + Hero → opens an admission form modal (name, email, phone, age, program interest, message)
- On submit: shows polished success toast/dialog in Roman Urdu + English, sends inquiry email to admin, sends branded confirmation email to user
- Form validation with zod (name, email, phone, age limits)

---

## 3. Two Admin Panels with Role-Based Access

**Login credentials (demo):**
- Super Admin: `superadmin@therunners.com` / `super1234` → full access
- Admin: `admin@therunners.com` / `admin1234` → no Dashboard, only Registration + Fees
- Member: `demo@therunners.com` / `demo1234` → existing member view

**Super Admin Panel** (`/dashboard`):
- Dashboard (stats: total members, pending fees, monthly revenue, new inquiries)
- Registration (register new member → auto generates unique ID `TR-YYYY-XXXX`)
- Fees (dropdown shows all members by **Name + ID**, select one to view/clear monthly fee; registration fee shown separately)
- Inquiries (list of admission form submissions)

**Admin Panel** (same `/dashboard` routes, Dashboard tab hidden):
- Registration
- Fees
- Inquiries

`AuthContext` extended to store role; sidebar items filtered by role; `DashboardHome` route guarded — if admin lands there, redirect to `/dashboard/registration`.

---

## 4. Fees Module Redesign

- **Member dropdown** populated from `members` table → shows `Ahmed Khan (TR-2026-0001)`
- On select, two cards appear:
  - **Registration Fee** card (one-time, shows paid/pending with "Mark Paid" button)
  - **Monthly Fee** card (current month, amount, "Clear Fee" button → marks paid + logs date)
- History table of past monthly payments below

---

## Technical Notes

- Unique ID generated via Postgres sequence + format `TR-{year}-{padded(4)}`
- RLS: super_admin sees all, admin sees all members/fees but not analytics, members see only their own
- Email templates use The Runners branding (logo, neon green accent, dark theme) via Lovable Emails
- Roman Urdu + English copy in success messages
- Form validation with zod, length limits, email sanitization

---

## Files to Create/Edit

**New:** `AdmissionDialog.tsx`, `supabase/functions/send-admission-inquiry/`, `pages/dashboard/Inquiries.tsx`, role-based route guards, members/fees hooks  
**Edit:** `AuthContext.tsx` (add role), `DashboardLayout.tsx` (filter sidebar by role), `Fees.tsx` (member dropdown), `Registration.tsx` (creates real member with unique ID), `Navbar.tsx` (Admission button), `SignIn.tsx` (3 demo credential shortcuts), `App.tsx` (new routes)

Approve and I'll enable Lovable Cloud, set up the email domain, and build everything.
