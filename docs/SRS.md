# Software Requirements Specification (SRS)
## Vivaha - Wedding Services Platform

**Version:** 1.0  
**Date:** April 23, 2026  
**Author:** Diya Garg  
**Course:** Software Engineering, JK Lakshmipat University

---

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for **Vivaha**, a full-stack wedding services platform that connects couples with verified vendors, provides AI-powered planning assistance, and offers a seamless booking experience.

### 1.2 Scope
Vivaha addresses the fragmented wedding planning market in India by providing:
- Unified vendor discovery and booking platform
- Collaborative planning tools for couples
- AI-powered wedding assistance
- Premium features for enhanced experience

### 1.3 Definitions and Acronyms
| Term | Definition |
|------|------------|
| SPA | Single Page Application |
| OTP | One-Time Password |
| UI/UX | User Interface/User Experience |
| API | Application Programming Interface |

---

## 2. Overall Description

### 2.1 Product Perspective
Vivaha is a standalone Single Page Application (SPA) built with:
- **Frontend:** React 18 + Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS + Inline CSS
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel

### 2.2 User Characteristics

| User Type | Technical Expertise | Frequency | Key Needs |
|-----------|--------------------|-----------|-----------|
| Couple | Low-Medium | High | Plan wedding, book vendors, track budget |
| Vendor | Medium | Medium | Manage bookings, showcase services |
| Admin | High | Low | Monitor platform, approve vendors |

### 2.3 Operating Environment
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Platform:** Web-based, responsive (desktop + mobile)
- **Internet:** Required for API calls

---

## 3. Functional Requirements

### 3.1 Authentication & Onboarding

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | System shall display animated splash screen for 3.5 seconds | High |
| FR-02 | User shall select role (Couple/Vendor/Admin) | High |
| FR-03 | System shall accept email or mobile number for login | High |
| FR-04 | System shall verify OTP (any 6-digit for demo) | High |
| FR-05 | New users shall complete multi-step onboarding | High |

### 3.2 Couple Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06 | System shall display wedding countdown timer | High |
| FR-07 | System shall show live vendor offers in grid | High |
| FR-08 | Non-premium users shall see blurred vendor tiles | High |
| FR-09 | System shall provide "Invite Fiancé" with Love Code | High |

### 3.3 Interactive Checklist

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10 | Users shall add, complete, and delete tasks | High |
| FR-11 | System shall show priority indicators (High/Medium/Low) | High |
| FR-12 | Users shall set deadlines for tasks | High |
| FR-13 | System shall display progress bar | High |

### 3.4 Inspiration Board

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-14 | Users shall create multiple mood boards | High |
| FR-15 | Users shall save pins by category | High |
| FR-16 | System shall provide grid/list view toggle | Medium |
| FR-17 | Users shall share boards with vendors | Medium |

### 3.5 Vendor Booking System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-18 | Users shall browse vendors by category | High |
| FR-19 | Users shall add vendors to cart | High |
| FR-20 | System shall calculate total savings | High |
| FR-21 | Users shall send booking requests | High |
| FR-22 | Vendors shall accept or decline requests | High |
| FR-23 | System shall allow meeting scheduling | High |

### 3.6 Vendor Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-24 | Vendors shall view incoming booking requests | High |
| FR-25 | Vendors shall manage portfolio | Medium |
| FR-26 | System shall display analytics dashboard | Medium |

### 3.7 Admin Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-27 | Admin shall login with separate credentials | High |
| FR-28 | Admin shall approve/reject vendors | High |
| FR-29 | Admin shall view platform analytics | Medium |

### 3.8 Additional Features

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-30 | System shall display Hindi calligraphic logo | High |
| FR-31 | System shall provide sustainability hub | Medium |
| FR-32 | System shall provide wellness hub | Medium |
| FR-33 | System shall provide budget planner | Medium |
| FR-34 | System shall provide cultural rituals guide | Medium |
| FR-35 | System shall provide legal documents guide | Medium |

---

## 4. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Page load time | < 2 seconds |
| NFR-02 | API response time (simulated) | < 1.5 seconds |
| NFR-03 | Responsive design | Mobile, Tablet, Desktop |
| NFR-04 | Cross-browser compatibility | Chrome, Firefox, Safari |
| NFR-05 | Security | API keys not exposed |
| NFR-06 | Usability | Intuitive navigation |

---

## 5. External Interface Requirements

### 5.1 User Interfaces
- Responsive design (320px to 1920px width)
- Color palette: #3E0014, #7A002B, #AC1634, #E77291, #FDF0F3
- Fonts: DM Serif Display (headings), DM Sans (body), Rozha One (Hindi)

### 5.2 Software Interfaces
| Interface | Purpose | Protocol |
|-----------|---------|----------|
| Google Gemini API | AI wedding assistant | HTTPS/REST |

---

## 6. Appendix

### 6.1 Glossary
| Term | Definition |
|------|------------|
| Love Code | Unique code for fiancé invitation |
| Power Pairs | Vendor combinations with discounts |
| Green Score | Sustainability rating for vendors |

---

**Document Prepared By:** Diya Garg  
**Date:** April 23, 2026  
**Status:** Final
