# 💍 Vivaha — Wedding Services Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)](./LICENSE)
[![Deployment](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://vivaha-wedding-app.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite-orange)](https://reactjs.org)

**A luxury wedding planning platform for Indian couples — discover vendors, build packages, manage checklists, and plan your dream wedding in one place.**

🔗 **Live Demo:** https://vivaha-wedding-app.vercel.app

---

## 📌 Project Objective

### Real-World Problem Statement

Wedding planning in India is deeply fragmented. Couples coordinate dozens of vendors — photographers, decorators, caterers, makeup artists, venues — across WhatsApp groups, broker referrals, and multiple disconnected platforms. There is no single trusted platform that brings together vendor discovery, collaborative planning, budget tracking, and booking management for Indian weddings.

MSMEs in the wedding industry — small photographers, decorators, mehendi artists — also have no digital presence to reach couples directly, losing business to intermediaries and brokers.

### Design Thinking Connection

| Stage | Insight |
|---|---|
| **Empathize** | Couples juggle 20+ vendors across WhatsApp, Excel sheets, and word-of-mouth — no single source of truth for wedding planning |
| **Define** | Couples need a unified platform to discover, compare, and book vendors while collaboratively planning with their partner |
| **Ideate** | Combine vendor marketplace + AI-assisted planning + couple collaboration + inspiration boards into one luxury mobile-first platform |
| **Prototype** | Built functional MVP covering the complete couple and vendor flow with checklist, package builder, and inspiration tools |
| **Test** | Validated complete app flow from splash screen to vendor booking with role-based access for couples, vendors, and admin |

---

## ✨ Features Implemented

| # | Feature | Functional Requirement | Description |
|---|---|---|---|
| 1 | **Role-Based Authentication** | FR-01 | Login with role selection (Couple / Vendor / Admin) with animated verification flow |
| 2 | **Real Weddings Showcase** | FR-02 | Auto-sliding carousel of real wedding stories with hover-reveal couple narratives |
| 3 | **Couple Dashboard** | FR-03 | Wedding info card, live vendor tile grid, premium upgrade banner, fiancé invite system |
| 4 | **Fiancé Invite with Love Code** | FR-04 | Generate unique Love Code and copyable invite message to onboard partner |
| 5 | **Interactive Checklist** | FR-05 | Heart checkboxes, drag-to-reorder tasks, deadlines with countdown, category tags, priority dots |
| 6 | **AI Assistant (Premium Gate)** | FR-06 | AI wedding planning assistant locked behind premium with feature showcase |
| 7 | **Inspiration Board** | FR-07 | Create mood boards by category (Decor, Outfits, Jewelry, Makeup, Venue) with heart save |
| 8 | **Build Package** | FR-08 | Three tabs — Power Pairs, Solo Experts, Top Vendors — with live cart and cost calculator |
| 9 | **Premium Upgrade Flow** | FR-09 | Full premium page with benefits, UPI and card payment forms, success animation |
| 10 | **Vendor Dashboard** | FR-10 | Incoming booking requests with Accept/Decline, services management, reviews and messages tabs |
| 11 | **Couple Profile** | FR-11 | Editable personal, fiancé, and wedding info with saved packages, boards, and settings |
| 12 | **Checklist Tutorial** | FR-12 | 5-step interactive tutorial carousel explaining all checklist features |
| 13 | **Blurred Vendor Tiles** | FR-13 | Non-premium users see blurred vendor offers — tempting upgrade mechanic |
| 14 | **Admin Dashboard** | FR-14 | Platform overview for admin role with user and vendor management |

---

## 🛠️ Tech Stack

### Core Technologies

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite | Single-page application with mobile-first responsive UI |
| **Routing** | React Router DOM v7 | Client-side routing with role-based navigation |
| **Icons** | Lucide React | Sophisticated thin-line icon library |
| **Styling** | Inline CSS + Tailwind CSS | Design system with custom color tokens |
| **Fonts** | DM Serif Display + DM Sans | Luxury editorial typography system |
| **State Management** | React useState (prop drilling) | Lightweight global state for auth and premium status |
| **Deployment** | Vercel | Automatic CI/CD from GitHub main branch |

### Design & CASE Tools

| Tool | Usage |
|---|---|
| Draw.io | UML diagrams (Use Case, Class, Sequence, ER, DFD) |
| Figma / Google Stitch | UI/UX wireframes and prototyping |
| VS Code | Primary code editor |
| Unsplash API | Free-to-use wedding photography for UI |

### AI Tools Used

| Tool | Usage |
|---|---|
| Claude (Anthropic) | Architecture guidance, code generation, documentation drafting |
| GitHub Copilot | Inline code suggestions and boilerplate generation |

---

## 🏗️ System Architecture

### Architecture Type: Single Page Application (SPA) with Component-Based Design

Vivaha follows a **3-Tier Architecture** using React as the presentation layer and Firebase as BaaS:
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION TIER                       │
│           React 18 + Vite (SPA)                         │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │Dashboard │Checklist │ Package  │ Profile  │          │
│  │Component │Component │Component │Component │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
├─────────────────────────────────────────────────────────┤
│                   LOGIC / API TIER                       │
│       Firebase SDK (Backend-as-a-Service)               │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │  Auth    │Firestore │ Storage  │  Rules   │          │
│  │ Service  │ Queries  │ Service  │  Engine  │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
├─────────────────────────────────────────────────────────┤
│                    DATA TIER                             │
│           Cloud Firestore (NoSQL)                       │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │  Users   │ Couples  │ Vendors  │ Bookings │          │
│  │Collection│Collection│Collection│Collection│          │
│  └──────────┴──────────┴──────────┴──────────┘          │
└─────────────────────────────────────────────────────────┘

> Architecture diagram available at [`docs/diagrams/architecture.png`](./docs/diagrams)

---

## 👤 Individual Contribution Summary

> *This is a solo project developed by one student.*

| Module | Files Owned | Effort % |
|---|---|---|
| Authentication & Entry Flow | `Login.jsx`, `SplashScreen.jsx`, `IntroScreens.jsx`, `RoleSelection.jsx` | 15% |
| Real Weddings Showcase | `RealWeddings.jsx` | 6% |
| Couple Dashboard | `CoupleDashboard.jsx` | 14% |
| Checklist + Tutorial + AI Gate | `Checklist.jsx` | 12% |
| Inspiration Board | `InspirationBoard.jsx` | 10% |
| Build Package | `BuildPackage.jsx` | 12% |
| Premium Page + Payment Flow | `PremiumPage.jsx` | 8% |
| Profile | `CoupleProfile.jsx` | 7% |
| Vendor Dashboard | `VendorDashboard.jsx` | 8% |
| Onboarding Forms | `CoupleForm.jsx`, `VendorForm.jsx` | 5% |
| Infrastructure & Config | `App.jsx`, `firebase.js`, `index.css`, `main.jsx`, `theme.js` | 3% |
| **Total** | **15 source files** | **100%** |

### AI Tool Disclosure
This project was developed with guidance from AI tools (Claude by Anthropic, GitHub Copilot) for code generation, debugging, and documentation. All architectural decisions, feature design, and project management were done by the student. AI was used as a coding assistant, similar to how a developer uses Stack Overflow or official documentation.

---

Vivaha-wedding-app/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline
├── docs/
│   ├── SRS.md                      # Software Requirements Specification (IEEE 830)
│   ├── SDD.md                      # Software Design Description (IEEE 1016)
│   └── diagrams/
│       ├── use_case.png            # UML Use Case Diagram
│       ├── class_diagram.png       # UML Class Diagram
│       ├── sequence.png            # UML Sequence Diagram
│       ├── er_diagram.png          # Entity Relationship Diagram
│       └── dfd.png                 # Data Flow Diagram
├── src/
│   ├── pages/
│   │   ├── SplashScreen.jsx        # Branded launch screen
│   │   ├── IntroScreens.jsx        # 3-slide onboarding carousel
│   │   ├── RealWeddings.jsx        # Auto-sliding wedding showcase
│   │   ├── RoleSelection.jsx       # Bride / Groom / Vendor selection
│   │   ├── Login.jsx               # Auth with verification animation
│   │   ├── CoupleForm.jsx          # Multi-step couple onboarding
│   │   ├── VendorForm.jsx          # Multi-step vendor onboarding
│   │   ├── CoupleDashboard.jsx     # Main couple home page
│   │   ├── Checklist.jsx           # Interactive wedding checklist
│   │   ├── InspirationBoard.jsx    # Mood board with category filter
│   │   ├── BuildPackage.jsx        # Vendor package builder
│   │   ├── CoupleProfile.jsx       # Editable couple profile
│   │   ├── PremiumPage.jsx         # Premium upgrade + payment flow
│   │   ├── VendorDashboard.jsx     # Vendor bookings and services
│   │   ├── Messaging.jsx           # Couple ↔ Vendor messaging
│   │   └── AdminDashboard.jsx      # Platform admin panel
│   ├── App.jsx                     # Root component + routing
│   ├── firebase.js                 # Firebase config and exports
│   ├── theme.js                    # Design tokens and color system
│   ├── index.css                   # Global styles and bottom nav
│   └── main.jsx                    # React entry point (Vite)
├── tests/
│   └── test_cases.md               # 37 unit and integration test cases
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── CONTRIBUTING.md                 # Local setup and contribution guide
├── LICENSE                         # MIT License
├── README.md                       # This file
├── package.json                    # Node.js dependencies
└── vercel.json                     # Vercel deployment configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Git** installed locally

### Installation

```bash
# Clone the repository
git clone https://github.com/Diya27Garg/Vivaha-wedding-app.git
cd Vivaha-wedding-app

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Demo Login

> The app accepts **any email and password** for demonstration purposes.

| Role | Navigate To | Description |
|---|---|---|
| Couple | `/home` | Full wedding planning dashboard |
| Vendor | `/vendor/dashboard` | Booking and service management |
| Admin | `/admin` | Platform overview |

---

## 🌐 Deployment

- **Live URL:** https://vivaha-wedding-app.vercel.app
- **Platform:** Vercel (automatic deploys from `main` branch)
- **Status:** ✅ Active and accessible

### Redeploy Manually

```bash
git add .
git commit -m "your update message"
git push origin master:main --force
```

---

## 📄 Documentation

| Document | Description | Link |
|---|---|---|
| SRS | Software Requirements Specification (IEEE 830) | [docs/SRS.md](./docs/SRS.md) |
| SDD | Software Design Description (IEEE 1016) | [docs/SDD.md](./docs/SDD.md) |
| Test Cases | 37 unit and integration test cases | [tests/test_cases.md](./tests/test_cases.md) |
| UML Diagrams | Use Case, Class, Sequence, ER, DFD | [docs/diagrams/](./docs/diagrams) |

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **JK Lakshmipat University** — Software Engineering course framework and evaluation guidelines
- **Unsplash** — Free high-quality wedding photography used in the UI
- **Lucide React** — Open-source icon library
- **Firebase by Google** — Backend-as-a-Service platform

---

**Built with 💍 for Indian couples**

*Vivaha — Plan Your Wedding, Effortlessly*
