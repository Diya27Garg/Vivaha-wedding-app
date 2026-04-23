# Software Design Description (SDD)
## Vivaha - Wedding Services Platform

**Version:** 1.0  
**Date:** April 23, 2026  
**Author:** Diya Garg  

---

## 1. Introduction

### 1.1 Purpose
This document describes the architectural design of the Vivaha wedding platform.

### 1.2 Scope
Covers component architecture, data structures, UI design, and deployment.

---

## 2. System Architecture

### 2.1 High-Level Architecture

- **Presentation Layer**: React 18 + Vite
- **Application Layer**: React Router + Booking Service
- **Data Layer**: Mock Database (JSON)

### 2.2 Component Hierarchy

**Authentication Pages:**
- SplashScreen → RealWeddings → Login → RoleSelection

**Onboarding:**
- CoupleForm, VendorForm

**Couple Pages:**
- CoupleDashboard, Checklist, InspirationBoard, BuildPackage, CoupleProfile

**Vendor Pages:**
- VendorDashboard

**Admin Pages:**
- AdminLogin, AdminDashboard

**Feature Pages:**
- PremiumPage, Messaging, InvitationDesign, BudgetPlanner, WellnessHub, SustainabilityHub, ScheduleMeeting

**Information Pages:**
- RasamRiwaz, LegalDocs

### 2.3 Page Summary

| Category | Count | Pages |
|----------|-------|-------|
| Authentication | 4 | SplashScreen, RealWeddings, Login, RoleSelection |
| Onboarding | 2 | CoupleForm, VendorForm |
| Couple | 5 | Dashboard, Checklist, Inspiration, Package, Profile |
| Vendor | 1 | VendorDashboard |
| Admin | 2 | AdminLogin, AdminDashboard |
| Features | 7 | Premium, Messaging, InvitationDesign, BudgetPlanner, WellnessHub, SustainabilityHub, ScheduleMeeting |
| Information | 2 | RasamRiwaz, LegalDocs |
| **Total** | **23** | |

---

## 3. Component Design

### 3.1 Core Components

**HindiLogo Component**
- Purpose: Display "विवाह" in Devanagari script
- Props: animated, size
- Features: Gradient text, fade-in animation

**BottomNav Component**
- Purpose: Persistent navigation for authenticated users
- Routes: Home, Checklist, Inspire, Package, Profile
- Features: Active state highlighting, hover effects

**GlobalNotifications Component**
- Purpose: Real-time notification system
- Features: Bell icon, badge, dropdown menu
- Types: Accept, Meeting, Confirm, Invoice, Payment

**AIWeddingAssistant Component**
- Purpose: Chat interface for wedding tips
- Features: Typing indicator, minimize/maximize

**WeddingCountdown Component**
- Purpose: Live countdown to wedding date
- Features: Days/Hours/Minutes/Seconds, progress bar, scratch card

**VendorCard Component**
- Purpose: Display vendor information
- Features: Hover details, rating, price, eco badge

**BookingRequestModal Component**
- Purpose: Collect booking requirements
- Validation: Date, guests, contact number

### 3.2 Service Layer

**bookingService.js**
- sendBookingRequest()
- vendorAccept() / vendorReject()
- scheduleMeeting()
- getCoupleBookings() / getVendorBookings()

---

## 4. Data Design

### 4.1 User Object

- id: Number, name: String, email: String
- role: "couple" | "vendor" | "admin"
- premium: Boolean, weddingDate: String, budget: String

### 4.2 Vendor Object

- id: Number, name: String, category: String
- price: String, rating: Number, location: String
- trustBadges: Array, isPremium: Boolean

### 4.3 Booking Object

- id: Number, vendorId: Number, coupleName: String
- weddingDate: String, status: String, amount: Number

---

## 5. User Interface Design

### 5.1 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Rustic Red | #3E0014 | Headers, buttons |
| Secondary | #7A002B | Gradients |
| Accent | #AC1634 | CTAs |
| Deep Blush | #E77291 | Icons |
| Background | #FDF0F3 | Main background |
| Borders | #F5D0DA | Cards |

### 5.2 Typography

| Element | Font | Size |
|---------|------|------|
| Headings | DM Serif Display | 24-48px |
| Body | DM Sans | 12-18px |
| Hindi | Rozha One | 28-80px |

### 5.3 Responsive Breakpoints

| Device | Width | Columns |
|--------|-------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640-1024px | 2 |
| Desktop | > 1024px | 3-4 |

---

## 6. Deployment

### 6.1 Deployment Commands

npm run build
git add .
git commit -m "message"
git push origin main

### 6.2 Live URL

https://vivaha-wedding-app.vercel.app

---

## 7. Appendix

### 7.1 Future Enhancements

- Real backend with Firebase
- Real payment gateway
- Real-time chat
- Mobile app

---

**Document Prepared By:** Diya Garg  
**Date:** April 23, 2026  
**Status:** Final
