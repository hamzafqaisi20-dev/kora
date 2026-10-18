# KoraPass (كورا باس) - Premium Stadium Booking & Sports Venue Discovery Platform

**KoraPass** is a high-end, investor-ready sports-tech platform designed for effortless stadium reservation, location-based searching, and facility management dashboards. Built on a modern **Laravel + Vue.js 3 + Tailwind CSS** architecture with full English and Arabic (RTL/LTR) localization.

---

## 🚀 Key Features

### 1. Dynamic Landing Page & Venue Discovery
- **"Find Nearest Stadium" Geolocation Trigger**: Uses device GPS (or simulated coordinates across Riyadh, Jeddah, and Al Khobar) to compute real-time Haversine distances in kilometers.
- **Dual Discovery Modes**:
  1. *Nearest to Me*: Automatically sorts fields by proximity (e.g., `1.2 km away`).
  2. *Explore by Region & Rating*: Multi-filter search across cities (Riyadh, Jeddah, Al Khobar), sport types (Football, Padel, Tennis, Basketball), and amenities (Night Floodlighting, Indoor AC, Dedicated Parking, Showers).
- **Interactive Tactical Radar Map**: Visualizes user position and stadium location pins with interactive preview cards.

### 2. Stadium Details & Interactive Time-Slot Selector
- **Direct External Link Integration**: Clicking the stadium name opens its official verified **Facebook page** in a new tab.
- **Direct Contact & Phone Copy**: One-click dialer and clipboard copy for venue inquiries.
- **Interactive Time-Slot Matrix**: Day-by-day selector (Today, Tomorrow, and upcoming 5 days) displaying available vs. reserved hours, peak-hour badges, and pricing.
- **High-Definition Photo Gallery Carousel**: Modal gallery with full-resolution imagery, thumbnails, and keyboard/touch navigation.

### 3. Advanced Pre-Payment Simulation Flow
- **Flexible Payment Options**:
  - *Advance Deposit (30%)*: Secures the slot online with the remaining balance due at the gate.
  - *Full Payment (100%)*: VIP express check-in with zero gate balance.
- **Payment Gateway Simulation**: Supports Mada, Apple Pay, Visa / Mastercard, and Cash on arrival.
- **3D Secure OTP Step**: Interactive bank authorization modal (demo code `1234`).
- **Instant Booking Voucher**: Generates unique reference code (`KP-2026-XXXX`), entry gate QR code, PDF voucher download simulation, and WhatsApp ticket sharing.

### 4. Dedicated Stadium Owners Dashboard (`/owner-portal`)
- **Operations & Financial KPIs**: Today's Bookings, Projected Daily Revenue, Weekly Court Occupancy, and Venue Rating score.
- **Reservations Management**: Interactive table with real-time customer data, status filters (Confirmed, Pending, Completed, Cancelled), and action buttons (Approve, Cancel, Call Customer).
- **Operating Hours & Slot Pricing Control**: Configurable opening/closing times, night floodlight peak-hour surcharge, and slot durations (60 vs 90 minutes).
- **Venue Profile & Social Media Integrations**: Live editor for stadium name, phone, description, and official Facebook page link.

### 5. Comprehensive Application Admin Dashboard (`/admin-portal`)
- **Platform Analytics & GMV**: Platform Gross Merchandise Value, Net 10% commission revenue, active stadium partners, and registered athletic users.
- **Stadium Onboarding & Approvals**: Administrative pipeline to review pending venue applications, verify commercial licenses and Facebook pages, and instantly approve or reject listings.
- **User & Operator Management**: Directory of registered athletes, venue owners, and super administrators with status toggle controls.
- **System Settings**: Global commission percentage, advance deposit requirements, and automated WhatsApp/SMS notifications.

### 6. Bidirectional Localization (العربية / English)
- **Full RTL & LTR Support**: Automatically updates `dir="rtl"` / `dir="ltr"` and `lang="ar"` / `lang="en"`.
- **Bespoke Typography**:
  - Arabic: **IBM Plex Sans Arabic** for clear, legible athletic UI.
  - English: **Inter** with modern font weights.

---

## 🛠️ Technology Stack
- **Backend**: Laravel 11/12 (PHP 8.2+)
- **Frontend**: Vue.js 3 (Composition API `<script setup>`)
- **Build Tooling**: Vite
- **Styling**: Tailwind CSS v4
- **Iconography**: `@lucide/vue`
- **Database**: SQLite / Eloquent ready

---

## 🏃 Getting Started Locally

### 1. Start the Laravel Backend Server
```bash
php artisan serve --port=8000
```

### 2. Compile or Run Frontend Assets
```bash
# Production build
npm run build

# Or development hot-reload server
npm run dev
```

Visit `http://127.0.0.1:8000` in your browser.
