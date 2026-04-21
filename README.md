<div align="center">

# विवाह · Vivaha

### *Plan Your Wedding, Effortlessly*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://vivaha-wedding-app.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

A full-stack wedding planning platform connecting Indian couples with verified vendors, powered by Google Gemini AI.

[Live Demo](https://vivaha-wedding-app.vercel.app) · [Report a Bug](https://github.com/Diya27Garg/Vivaha-wedding-app/issues) · [Request a Feature](https://github.com/Diya27Garg/Vivaha-wedding-app/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [User Roles & Access](#-user-roles--access)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Known Limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌸 About the Project

**Vivaha** is a comprehensive wedding planning platform built specifically for Indian couples. It bridges the gap between couples and vendors through an intuitive, AI-assisted experience — covering everything from vendor discovery and budget planning to cultural rituals, sustainability, and legal documentation.

> *Built with 💍 for Indian couples*

---

## ✨ Features

### 🔐 Authentication & Onboarding
- Animated splash screen with Hindi logo **"विवाह"** (Rozha One font)
- Email/mobile OTP-based login (demo: any 6-digit code)
- Role-based onboarding — Couple or Vendor
- Auto-detection of new vs. returning users

### 👫 Couple Dashboard
- Wedding countdown (live days/hours/minutes/seconds) with celebration popup
- Animated scratch card for planning tips
- Featured vendor carousel (auto-rotates every 3 seconds)
- Live offer banner with countdown timer
- Invite fiancé via unique **Love Code**
- One-click vendor search

### ✅ Interactive Checklist
- Add, complete, and delete tasks with priority indicators (High / Medium / Low)
- Set deadlines and assign categories (Venue, Photography, Catering, etc.)
- Visual progress bar
- Drag-to-reorder (Premium)
- AI-powered recommendations (Premium)

### 🎨 Inspiration Board
- Create and manage multiple mood boards
- Save and categorize inspiration pins
- Share boards directly with vendors
- Toggle between grid and list views
- Search and filter by category

### 🛍️ Build Package & Vendor Booking
- Browse verified vendors with ratings, prices, and trust badges
- **Power Pairs** — curated vendor bundles with exclusive discounts (save up to ₹50,000)
- Shopping cart with savings calculator
- Detailed booking request flow (date, guest count, budget)
- Real-time accept/decline from vendors

### 🏪 Vendor Dashboard
- Manage incoming booking requests
- Built-in meeting scheduler for client video calls
- Analytics — profile views, inquiry rate, conversion rate, revenue charts
- AI-generated performance insights
- Portfolio management
- **Green Score** — sustainability rating based on client reviews
- Power Pair discovery with complementary vendors

### 🛡️ Admin Dashboard
- Separate admin portal at `/admin-login`
- Approve/reject vendor registrations
- Monitor all platform bookings and couples
- Platform-wide analytics and reports

### 💎 Premium Features
- Unlock full vendor catalogue (removes blur on non-premium tiles)
- AI-personalized wedding planning advice
- Priority booking queue
- Dedicated wedding coordinator
- Exclusive Power Pair discounts
- Real-time budget alerts

### 🤖 AI Wedding Assistant (Google Gemini)
- Context-aware responses using your wedding date, budget, location, and guest count
- Full conversation history with typing indicator
- Quick-access suggested questions
- Minimizable floating chat interface

### 🌿 Sustainability Hub
- Green Score points system for eco-friendly choices
- NGO food donation connections by wedding city
- Eco-friendly vendor directory with green badges
- Sustainability checklist and rewards (badges + discounts)
- Progress saved to local storage

### 🧘 Wellness Hub
- Guided meditation and live yoga session schedules
- Curated calming playlists
- Therapist directory for couples
- Daily rotating wellness tips
- 24x7 emergency helpline

### 🪔 Rasam & Riwaz (Cultural Rituals)
- Community-specific guides — Hindu, Sikh, Muslim, Christian
- Ritual descriptions, significance, and duration
- Upcoming: custom timelines, mantra guides, video tutorials

### ⚖️ Legal & Documents
- Overview of the Hindu Marriage Act, Special Marriage Act, and more
- Step-by-step marriage registration guide
- Complete document checklist
- Rights post-marriage (maintenance, property, etc.)
- Prenuptial agreement information (India)
- Lawyer connect directory

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| Frontend | React | 18.x |
| Build Tool | Vite | 4.x |
| Routing | React Router DOM | 7.x |
| Styling | Tailwind CSS + Inline CSS | 3.x |
| Icons | Lucide React | Latest |
| Fonts | Google Fonts (DM Sans, DM Serif Display, Rozha One) | — |
| AI | Google Gemini API | — |
| Deployment | Vercel | — |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Diya27Garg/Vivaha-wedding-app.git
cd Vivaha-wedding-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Quick Test Flows

**Couple Flow**
1. Visit `/login` → enter any email or phone → enter any 6-digit OTP
2. Select **Bride/Groom** → complete onboarding
3. Explore the dashboard, checklist, inspiration board, and vendor packages

**Vendor Flow**
1. Visit `/login` → enter any email or phone → enter any 6-digit OTP
2. Select **Vendor** → complete vendor onboarding
3. Manage requests, analytics, and portfolio from the vendor dashboard

**Admin Flow**
1. Visit `/admin-login`
2. Email: `admin@vivaha.com` · Password: `admin123`
3. Approve vendors and review platform stats

---

## 📁 Project Structure

```
src/
├── components/
│   ├── HindiLogo.jsx             # Devanagari script logo
│   ├── BottomNav.jsx             # Global bottom navigation
│   ├── AIWeddingAssistant.jsx    # Gemini-powered chat assistant
│   └── BookingRequestModal.jsx   # Vendor booking modal
│
├── pages/
│   ├── SplashScreen.jsx
│   ├── RealWeddings.jsx          # Auto-sliding wedding story carousel
│   ├── Login.jsx                 # OTP authentication
│   ├── RoleSelection.jsx
│   ├── CoupleForm.jsx            # Couple onboarding
│   ├── VendorForm.jsx            # Vendor onboarding
│   ├── CoupleDashboard.jsx
│   ├── Checklist.jsx
│   ├── InspirationBoard.jsx
│   ├── BuildPackage.jsx          # Vendor discovery & cart
│   ├── CoupleProfile.jsx
│   ├── VendorDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminLogin.jsx
│   ├── SustainabilityHub.jsx
│   ├── WellnessHub.jsx
│   ├── BudgetPlanner.jsx
│   ├── InvitationDesign.jsx
│   ├── RasamRiwaz.jsx
│   └── LegalDocs.jsx
│
├── services/
│   └── bookingService.js         # Mock booking API
│
├── data/
│   └── mockData.js               # Mock database
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 👥 User Roles & Access

| Role | Credentials | Routes |
|---|---|---|
| **Couple** | Any email/phone + any 6-digit OTP | `/home`, `/checklist`, `/inspiration`, `/package`, `/profile` |
| **Vendor** | Any email/phone + any 6-digit OTP (select Vendor role) | `/vendor/dashboard` |
| **Admin** | `admin@vivaha.com` / `admin123` | `/admin-login`, `/admin` |

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

> ⚠️ Never commit your `.env` file. Use `.env.example` as a safe template for collaborators.

---

## 📦 Deployment

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic deployments on every push to `main`.

> Don't forget to add `VITE_GEMINI_API_KEY` as an environment variable in your Vercel project settings.

---

## ⚠️ Known Limitations

This project is currently a **demo/prototype**. The following apply:

- No real backend — bookings use a mock API
- OTP accepts any 6-digit number (no real SMS/email service)
- Payments are simulated — no real transactions
- App state resets on page refresh (no persistent DB)
- Firebase is installed but not fully integrated

---

## 🗺️ Roadmap

- [ ] Real backend with Firebase / Firestore
- [ ] Real payment gateway (Razorpay / Stripe)
- [ ] Real-time couple–vendor chat
- [ ] Email & SMS notifications for booking updates
- [ ] Google Calendar sync
- [ ] React Native mobile app
- [ ] Video call integration
- [ ] Multi-language support (Hindi, Tamil, Telugu, etc.)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ by [Diya Garg](https://github.com/Diya27Garg)

**Vivaha — Plan Your Wedding, Effortlessly**

</div>
