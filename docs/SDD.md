# Software Design Description (SDD)
## Vivaha - Wedding Services Platform

**Version:** 1.0  
**Date:** April 23, 2026  
**Author:** Diya Garg  
**Course:** Software Engineering, JK Lakshmipat University

---

## Table of Contents
1. Introduction
2. System Architecture
3. Component Design
4. Data Design
5. User Interface Design
6. Deployment Diagram
7. Appendix

---

## 1. Introduction

### 1.1 Purpose
This document describes the architectural and detailed design of the Vivaha wedding services platform, a full-stack web application connecting couples with verified wedding vendors.

### 1.2 Scope
The design covers component architecture, data structures, API integrations, UI/UX design patterns, and deployment strategy.

### 1.3 Definitions

| Term | Definition |
|------|------------|
| SPA | Single Page Application |
| OTP | One-Time Password |
| API | Application Programming Interface |
| UI/UX | User Interface/User Experience |

---

## 2. System Architecture

### 2.1 High-Level Architecture
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER │
│ React 18 + Vite │
│ ┌──────────┬──────────┬──────────┬──────────┬──────────┐ │
│ │Dashboard │Checklist │Inspire │ Package │ Profile │ │
│ └──────────┴──────────┴──────────┴──────────┴──────────┘ │
├─────────────────────────────────────────────────────────────┤
│ APPLICATION LAYER │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ React Router DOM v7 (Routing) │ │
│ ├──────────────────────────────────────────────────────┤ │
│ │ Booking Service (Mock API Layer) │ │
│ ├──────────────────────────────────────────────────────┤ │
│ │ State Management (useState) │ │
│ └──────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ DATA LAYER │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Mock Database (JSON) │ │
│ │ ┌──────────┬──────────┬──────────┬──────────┐ │ │
│ │ │ Users │ Vendors │ Bookings │ Tasks │ │ │
│ │ └──────────┴──────────┴──────────┴──────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘


### 2.2 Complete Component Hierarchy
App.jsx
│
├─── Authentication & Entry ────────────────────────────────
│ ├── SplashScreen
│ ├── RealWeddings
│ ├── Login
│ └── RoleSelection
│
├─── Onboarding ────────────────────────────────────────────
│ ├── CoupleForm
│ └── VendorForm
│
├─── Couple Pages ──────────────────────────────────────────
│ ├── CoupleDashboard
│ │ ├── HindiLogo
│ │ ├── BottomNav
│ │ ├── GlobalNotifications
│ │ ├── AIWeddingAssistant
│ │ ├── WeddingCountdown
│ │ ├── FeaturedVendorRotator
│ │ ├── LiveOfferBanner
│ │ └── CategoryVendorSection
│ │
│ ├── Checklist
│ ├── InspirationBoard
│ │ └── PinModal
│ ├── BuildPackage
│ │ ├── BookingRequestModal
│ │ └── VendorDetailModal
│ └── CoupleProfile
│ └── MeetingScheduler
│
├─── Vendor Pages ──────────────────────────────────────────
│ └── VendorDashboard
│ ├── Sidebar Navigation
│ └── GreenScoreCard
│
├─── Admin Pages ───────────────────────────────────────────
│ ├── AdminLogin
│ └── AdminDashboard
│ └── Sidebar Navigation
│
├─── Feature Pages ─────────────────────────────────────────
│ ├── PremiumPage
│ │ ├── PaymentModal
│ │ └── SuccessScreen
│ ├── Messaging
│ │ ├── ChatList
│ │ └── ChatArea
│ ├── InvitationDesign
│ │ ├── CanvaTemplates
│ │ └── VendorList
│ ├── BudgetPlanner
│ │ ├── BudgetOverview
│ │ └── CategoryBreakdown
│ ├── WellnessHub
│ │ ├── MeditationSection
│ │ ├── YogaSection
│ │ ├── MusicPlayer
│ │ └── TherapistsList
│ ├── SustainabilityHub
│ │ ├── GreenScore
│ │ ├── FoodDonation
│ │ └── GreenVendors
│ └── ScheduleMeeting
│ ├── SlotSelector
│ └── MeetingConfirmation
│
├─── Information Pages ─────────────────────────────────────
│ ├── RasamRiwaz
│ │ ├── CommunitySelector
│ │ └── RitualsList
│ └── LegalDocs
│ ├── CategoryNav
│ └── ContentSection
│
└─── AI Assistant ──────────────────────────────────────────
└── AIAssistantPage
└── AIWeddingAssistant (Demo Mode)


### 2.3 Shared Components

| Component | Purpose | Used On |
|-----------|---------|---------|
| HindiLogo | Devanagari script "विवाह" | All pages |
| BottomNav | Bottom navigation bar | Authenticated pages |
| GlobalNotifications | Notification bell | Authenticated pages |
| AIWeddingAssistant | Chat assistant | Dashboard, AI page |
| BookingRequestModal | Vendor booking form | BuildPackage |

### 2.4 Page Summary

| Category | Count | Pages |
|----------|-------|-------|
| Authentication | 4 | SplashScreen, RealWeddings, Login, RoleSelection |
| Onboarding | 2 | CoupleForm, VendorForm |
| Couple Dashboard | 5 | Dashboard, Checklist, Inspiration, Package, Profile |
| Vendor | 1 | VendorDashboard |
| Admin | 2 | AdminLogin, AdminDashboard |
| Features | 7 | Premium, Messaging, InvitationDesign, BudgetPlanner, WellnessHub, SustainabilityHub, ScheduleMeeting |
| Information | 2 | RasamRiwaz, LegalDocs |
| AI | 1 | AIAssistantPage |
| **TOTAL** | **24** | **Pages** |

---

## 3. Component Design

### 3.1 Core Components

#### HindiLogo Component

```jsx
// Purpose: Display "विवाह" in Devanagari script
// Props: { animated, size }
// Features: Gradient text, fade-in animation, sparkle effect
### **BottomNav Component**
jsx
// Purpose: Persistent navigation for authenticated users
// Routes: Home, Checklist, Inspire, Package, Profile
// Features: Active state highlighting, hover effects


