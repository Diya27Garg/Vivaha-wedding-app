# Test Cases Document
## Vivaha - Wedding Services Platform

**Version:** 1.0  
**Date:** April 21, 2026  
**Author:** Diya Garg  
**Total Test Cases:** 65

---

## Test Case Summary

| Category | Pass | Fail | Pending | Total |
|----------|------|------|---------|-------|
| Authentication & Onboarding | 8 | 0 | 0 | 8 |
| Couple Dashboard | 7 | 0 | 0 | 7 |
| Checklist | 6 | 0 | 0 | 6 |
| Inspiration Board | 5 | 0 | 0 | 5 |
| Build Package & Booking | 8 | 0 | 0 | 8 |
| Vendor Dashboard | 7 | 0 | 0 | 7 |
| Admin Dashboard | 5 | 0 | 0 | 5 |
| AI Assistant | 4 | 0 | 0 | 4 |
| Sustainability Hub | 5 | 0 | 0 | 5 |
| Wellness Hub | 4 | 0 | 0 | 4 |
| Rasam & Riwaz | 3 | 0 | 0 | 3 |
| Legal Docs | 3 | 0 | 0 | 3 |
| **Total** | **65** | **0** | **0** | **65** |

---

## 1. Authentication & Onboarding Tests

### TC-01: Splash Screen Display
| Field | Value |
|-------|-------|
| **ID** | TC-01 |
| **Test Case** | Verify splash screen displays and auto-navigates |
| **Precondition** | App not opened |
| **Steps** | 1. Open app URL<br>2. Observe splash screen<br>3. Wait 3.5 seconds |
| **Expected Result** | Hindi logo "विवाह" appears with animation, navigates to RealWeddings |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-02: Real Weddings Carousel
| Field | Value |
|-------|-------|
| **ID** | TC-02 |
| **Test Case** | Verify carousel auto-slides and has play/pause |
| **Precondition** | On RealWeddings page |
| **Steps** | 1. Observe carousel for 5 seconds<br>2. Click play/pause button<br>3. Click on story card |
| **Expected Result** | Slides change every 5 seconds, play/pause works, modal opens |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-03: OTP Login - Email
| Field | Value |
|-------|-------|
| **ID** | TC-03 |
| **Test Case** | Verify email OTP login works |
| **Precondition** | On Login page |
| **Steps** | 1. Select "Email" tab<br>2. Enter "test@example.com"<br>3. Click "Continue with OTP"<br>4. Enter any 6-digit OTP |
| **Expected Result** | Navigates to Role Selection |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-04: OTP Login - Mobile Number
| Field | Value |
|-------|-------|
| **ID** | TC-04 |
| **Test Case** | Verify mobile OTP login works |
| **Precondition** | On Login page |
| **Steps** | 1. Select "Mobile Number" tab<br>2. Enter "9876543210"<br>3. Click "Continue with OTP"<br>4. Enter any 6-digit OTP |
| **Expected Result** | Navigates to Role Selection |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-05: Invalid Email Validation
| Field | Value |
|-------|-------|
| **ID** | TC-05 |
| **Test Case** | Verify invalid email shows error |
| **Precondition** | On Login page |
| **Steps** | 1. Select "Email" tab<br>2. Enter "invalid-email"<br>3. Click "Continue with OTP" |
| **Expected Result** | Shows error message "Please enter a valid email address" |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-06: Invalid Mobile Validation
| Field | Value |
|-------|-------|
| **ID** | TC-06 |
| **Test Case** | Verify invalid mobile shows error |
| **Precondition** | On Login page |
| **Steps** | 1. Select "Mobile Number" tab<br>2. Enter "12345"<br>3. Click "Continue with OTP" |
| **Expected Result** | Shows error "Please enter a valid 10-digit mobile number" |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-07: Role Selection - Bride/Groom
| Field | Value |
|-------|-------|
| **ID** | TC-07 |
| **Test Case** | Verify Bride/Groom role selection |
| **Precondition** | After successful login |
| **Steps** | 1. Click "Bride/Groom" card<br>2. Click "Continue" |
| **Expected Result** | Navigates to CoupleForm onboarding |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-08: Role Selection - Vendor
| Field | Value |
|-------|-------|
| **ID** | TC-08 |
| **Test Case** | Verify Vendor role selection |
| **Precondition** | After successful login |
| **Steps** | 1. Click "Vendor" card<br>2. Click "Continue" |
| **Expected Result** | Navigates to VendorForm onboarding |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 2. Couple Dashboard Tests

### TC-09: Welcome Card Display
| Field | Value |
|-------|-------|
| **ID** | TC-09 |
| **Test Case** | Verify welcome card shows user name |
| **Precondition** | User logged in as couple |
| **Steps** | 1. Navigate to /home<br>2. Observe welcome card |
| **Expected Result** | Shows "Welcome, {user.name}!" |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-10: Countdown Timer
| Field | Value |
|-------|-------|
| **ID** | TC-10 |
| **Test Case** | Verify countdown updates every second |
| **Precondition** | On dashboard |
| **Steps** | 1. Observe days/hours/minutes/seconds<br>2. Wait 5 seconds |
| **Expected Result** | Seconds decrease by 5 |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-11: Scratch Card Tip
| Field | Value |
|-------|-------|
| **ID** | TC-11 |
| **Test Case** | Verify scratch card reveals tip on click |
| **Precondition** | On dashboard |
| **Steps** | 1. Click on scratch card<br>2. Observe content change |
| **Expected Result** | Tip revealed with category and message |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-12: Featured Vendor Rotator
| Field | Value |
|-------|-------|
| **ID** | TC-12 |
| **Test Case** | Verify featured vendor changes every 3 seconds |
| **Precondition** | On dashboard |
| **Steps** | 1. Observe featured vendor section<br>2. Wait 3 seconds |
| **Expected Result** | Vendor changes to next in list |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-13: Search Bar Functionality
| Field | Value |
|-------|-------|
| **ID** | TC-13 |
| **Test Case** | Verify search bar filters vendors |
| **Precondition** | On dashboard |
| **Steps** | 1. Type "photography" in search bar<br>2. Observe results |
| **Expected Result** | Shows photography-related vendors |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-14: Invite Fiancé Modal
| Field | Value |
|-------|-------|
| **ID** | TC-14 |
| **Test Case** | Verify invite modal opens and Love Code generates |
| **Precondition** | On dashboard |
| **Steps** | 1. Click "Invite your Fiancé" button<br>2. Observe modal |
| **Expected Result** | Modal opens with unique Love Code |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-15: Copy Love Code
| Field | Value |
|-------|-------|
| **ID** | TC-15 |
| **Test Case** | Verify Love Code copy works |
| **Precondition** | Invite modal open |
| **Steps** | 1. Click "Copy" button next to Love Code<br>2. Paste elsewhere |
| **Expected Result** | Code copied to clipboard, button shows "Copied!" |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 3. Checklist Tests

### TC-16: Display Tasks
| Field | Value |
|-------|-------|
| **ID** | TC-16 |
| **Test Case** | Verify checklist displays tasks |
| **Precondition** | Navigate to /checklist |
| **Steps** | 1. Open Checklist page |
| **Expected Result** | Shows list of tasks with checkboxes |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-17: Complete Task
| Field | Value |
|-------|-------|
| **ID** | TC-17 |
| **Test Case** | Verify task can be marked complete |
| **Precondition** | On Checklist page |
| **Steps** | 1. Click checkbox on a task |
| **Expected Result** | Checkbox fills, task text gets strike-through, progress updates |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-18: Add New Task
| Field | Value |
|-------|-------|
| **ID** | TC-18 |
| **Test Case** | Verify new task can be added |
| **Precondition** | On Checklist page |
| **Steps** | 1. Click "Add New Task"<br>2. Fill task details<br>3. Submit |
| **Expected Result** | New task appears in list |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-19: Delete Task
| Field | Value |
|-------|-------|
| **ID** | TC-19 |
| **Test Case** | Verify task can be deleted |
| **Precondition** | On Checklist page |
| **Steps** | 1. Click delete icon on a task |
| **Expected Result** | Task removed from list |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-20: Progress Bar Updates
| Field | Value |
|-------|-------|
| **ID** | TC-20 |
| **Test Case** | Verify progress bar updates correctly |
| **Precondition** | On Checklist page |
| **Steps** | 1. Complete a task<br>2. Observe progress bar |
| **Expected Result** | Progress percentage increases |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-21: AI Premium Gate
| Field | Value |
|-------|-------|
| **ID** | TC-21 |
| **Test Case** | Verify AI suggestions show lock for non-premium |
| **Precondition** | Non-premium user |
| **Steps** | 1. Scroll to AI suggestion section |
| **Expected Result** | Shows lock icon and premium upgrade prompt |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 4. Inspiration Board Tests

### TC-22: Create Board
| Field | Value |
|-------|-------|
| **ID** | TC-22 |
| **Test Case** | Verify new board can be created |
| **Precondition** | On Inspiration page |
| **Steps** | 1. Click "New Board"<br>2. Enter board name<br>3. Submit |
| **Expected Result** | New board appears in list |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-23: Save Pin to Board
| Field | Value |
|-------|-------|
| **ID** | TC-23 |
| **Test Case** | Verify pin can be saved to board |
| **Precondition** | On Inspiration page |
| **Steps** | 1. Click save icon on a pin<br>2. Select board |
| **Expected Result** | Pin saved to selected board |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-24: Toggle View Mode
| Field | Value |
|-------|-------|
| **ID** | TC-24 |
| **Test Case** | Verify grid/list view toggle works |
| **Precondition** | On Inspiration page |
| **Steps** | 1. Click "Grid" button<br>2. Click "List" button |
| **Expected Result** | Layout changes between grid and list |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-25: Search Pins
| Field | Value |
|-------|-------|
| **ID** | TC-25 |
| **Test Case** | Verify search filters pins |
| **Precondition** | On Inspiration page |
| **Steps** | 1. Type search term<br>2. Observe results |
| **Expected Result** | Only matching pins shown |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-26: Filter by Category
| Field | Value |
|-------|-------|
| **ID** | TC-26 |
| **Test Case** | Verify category filter works |
| **Precondition** | On Inspiration page |
| **Steps** | 1. Click "Decor" category |
| **Expected Result** | Only decor-related pins shown |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 5. Build Package & Booking Tests

### TC-27: Display Vendors
| Field | Value |
|-------|-------|
| **ID** | TC-27 |
| **Test Case** | Verify vendors display correctly |
| **Precondition** | On Package page |
| **Steps** | 1. Open Build Package page |
| **Expected Result** | Shows list of vendors with images, prices, ratings |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-28: Add to Cart
| Field | Value |
|-------|-------|
| **ID** | TC-28 |
| **Test Case** | Verify vendor can be added to cart |
| **Precondition** | On Package page |
| **Steps** | 1. Click "Add" button on a vendor |
| **Expected Result** | Cart count increases, vendor added |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-29: View Cart
| Field | Value |
|-------|-------|
| **ID** | TC-29 |
| **Test Case** | Verify cart modal displays added vendors |
| **Precondition** | At least one vendor in cart |
| **Steps** | 1. Click cart icon |
| **Expected Result** | Modal opens showing added vendors |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-30: Remove from Cart
| Field | Value |
|-------|-------|
| **ID** | TC-30 |
| **Test Case** | Verify vendor can be removed from cart |
| **Precondition** | Cart modal open with items |
| **Steps** | 1. Click "Remove" on a cart item |
| **Expected Result** | Item removed from cart |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-31: Send Booking Request
| Field | Value |
|-------|-------|
| **ID** | TC-31 |
| **Test Case** | Verify booking request can be sent |
| **Precondition** | On Package page |
| **Steps** | 1. Click "Book Now" on a vendor<br>2. Fill requirements form<br>3. Submit |
| **Expected Result** | Success message shown |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-32: Power Pairs Display
| Field | Value |
|-------|-------|
| **ID** | TC-32 |
| **Test Case** | Verify Power Pairs section displays |
| **Precondition** | On Package page |
| **Steps** | 1. Scroll to Power Pairs section |
| **Expected Result** | Shows vendor pairs with discounts |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-33: Calculate Total Savings
| Field | Value |
|-------|-------|
| **ID** | TC-33 |
| **Test Case** | Verify cart calculates savings correctly |
| **Precondition** | Multiple vendors in cart |
| **Steps** | 1. Add vendors with discounts<br>2. Open cart |
| **Expected Result** | Shows total savings amount |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 6. Vendor Dashboard Tests

### TC-34: View Booking Requests
| Field | Value |
|-------|-------|
| **ID** | TC-34 |
| **Test Case** | Verify vendor sees booking requests |
| **Precondition** | Logged in as vendor |
| **Steps** | 1. Navigate to Vendor Dashboard<br>2. Click "Requests" tab |
| **Expected Result** | Shows pending booking requests |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-35: Accept Booking Request
| Field | Value |
|-------|-------|
| **ID** | TC-35 |
| **Test Case** | Verify vendor can accept request |
| **Precondition** | Pending request exists |
| **Steps** | 1. Click "Accept" on a request |
| **Expected Result** | Request moves to accepted status |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-36: Schedule Meeting
| Field | Value |
|-------|-------|
| **ID** | TC-36 |
| **Test Case** | Verify meeting can be scheduled |
| **Precondition** | Accepted request |
| **Steps** | 1. Click "Schedule Meeting"<br>2. Select date and time |
| **Expected Result** | Meeting scheduled confirmation |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-37: View Analytics
| Field | Value |
|-------|-------|
| **ID** | TC-37 |
| **Test Case** | Verify analytics display correctly |
| **Precondition** | Vendor dashboard open |
| **Steps** | 1. Click "Analytics" tab |
| **Expected Result** | Shows profile views, conversion rate, revenue |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-38: Add Portfolio Image
| Field | Value |
|-------|-------|
| **ID** | TC-38 |
| **Test Case** | Verify vendor can add portfolio image |
| **Precondition** | Portfolio tab open |
| **Steps** | 1. Click "Add Photo"<br>2. Enter image URL<br>3. Submit |
| **Expected Result** | Image appears in portfolio |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-39: View Green Score
| Field | Value |
|-------|-------|
| **ID** | TC-39 |
| **Test Case** | Verify green score displays |
| **Precondition** | Vendor dashboard open |
| **Steps** | 1. View Overview tab |
| **Expected Result** | Shows green score circle and tips |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-40: Find Power Pairs
| Field | Value |
|-------|-------|
| **ID** | TC-40 |
| **Test Case** | Verify vendor can find power pairs |
| **Precondition** | Vendor dashboard open |
| **Steps** | 1. Click "Power Pairs" tab<br>2. Click "Find Partners" |
| **Expected Result** | Shows suggested vendor partners |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 7. Admin Dashboard Tests

### TC-41: Admin Login
| Field | Value |
|-------|-------|
| **ID** | TC-41 |
| **Test Case** | Verify admin login works |
| **Precondition** | At /admin-login |
| **Steps** | 1. Enter "admin@vivaha.com"<br>2. Enter "admin123"<br>3. Click Login |
| **Expected Result** | Navigates to Admin Dashboard |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-42: View All Vendors
| Field | Value |
|-------|-------|
| **ID** | TC-42 |
| **Test Case** | Verify admin can view all vendors |
| **Precondition** | Admin dashboard open |
| **Steps** | 1. Click "Vendors" tab |
| **Expected Result** | Shows list of all vendors |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-43: Approve Vendor
| Field | Value |
|-------|-------|
| **ID** | TC-43 |
| **Test Case** | Verify admin can approve vendor |
| **Precondition** | Pending vendor exists |
| **Steps** | 1. Go to Vendors tab<br>2. Click "Approve" on pending vendor |
| **Expected Result** | Vendor status changes to "approved" |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-44: View All Couples
| Field | Value |
|-------|-------|
| **ID** | TC-44 |
| **Test Case** | Verify admin can view all couples |
| **Precondition** | Admin dashboard open |
| **Steps** | 1. Click "Couples" tab |
| **Expected Result** | Shows list of registered couples |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-45: View Platform Reports
| Field | Value |
|-------|-------|
| **ID** | TC-45 |
| **Test Case** | Verify admin can view reports |
| **Precondition** | Admin dashboard open |
| **Steps** | 1. Click "Reports" tab |
| **Expected Result** | Shows platform analytics |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 8. AI Assistant Tests

### TC-46: Open AI Assistant
| Field | Value |
|-------|-------|
| **ID** | TC-46 |
| **Test Case** | Verify AI Assistant opens |
| **Precondition** | On Couple Dashboard |
| **Steps** | 1. Click AI Assistant button in header |
| **Expected Result** | Modal opens with chat interface |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-47: Send Message
| Field | Value |
|-------|-------|
| **ID** | TC-47 |
| **Test Case** | Verify AI responds to messages |
| **Precondition** | AI Assistant open |
| **Steps** | 1. Type "What's a good wedding budget?"<br>2. Send |
| **Expected Result** | AI responds with helpful advice |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-48: Suggested Questions
| Field | Value |
|-------|-------|
| **ID** | TC-48 |
| **Test Case** | Verify suggested questions work |
| **Precondition** | AI Assistant open |
| **Steps** | 1. Click a suggested question |
| **Expected Result** | Question sent, AI responds |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-49: Minimize/Maximize
| Field | Value |
|-------|-------|
| **ID** | TC-49 |
| **Test Case** | Verify minimize/maximize works |
| **Precondition** | AI Assistant open |
| **Steps** | 1. Click minimize button<br>2. Click minimized bar |
| **Expected Result** | Window minimizes, then restores |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 9. Sustainability Hub Tests

### TC-50: View Green Score
| Field | Value |
|-------|-------|
| **ID** | TC-50 |
| **Test Case** | Verify green score displays |
| **Precondition** | On Sustainability page |
| **Steps** | 1. Navigate to /sustainability |
| **Expected Result** | Shows green score card with points |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-51: Complete Sustainable Step
| Field | Value |
|-------|-------|
| **ID** | TC-51 |
| **Test Case** | Verify completing step adds points |
| **Precondition** | On Sustainability page |
| **Steps** | 1. Click on a sustainable step |
| **Expected Result** | Points increase, step marked complete |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-52: Food Donation - Select City
| Field | Value |
|-------|-------|
| **ID** | TC-52 |
| **Test Case** | Verify NGO list appears after city selection |
| **Precondition** | On Sustainability page |
| **Steps** | 1. Select a city from dropdown |
| **Expected Result** | Shows NGOs in that city |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-53: Request Food Donation
| Field | Value |
|-------|-------|
| **ID** | TC-53 |
| **Test Case** | Verify food donation request works |
| **Precondition** | NGOs visible |
| **Steps** | 1. Click "Request Pickup" on an NGO |
| **Expected Result** | Shows success confirmation |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-54: Green Vendors Display
| Field | Value |
|-------|-------|
| **ID** | TC-54 |
| **Test Case** | Verify green vendors show badge |
| **Precondition** | On Sustainability page |
| **Steps** | 1. Scroll to Green Vendors section |
| **Expected Result** | Shows vendors with green certification badge |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 10. Wellness Hub Tests

### TC-55: View Meditation Tab
| Field | Value |
|-------|-------|
| **ID** | TC-55 |
| **Test Case** | Verify meditation resources display |
| **Precondition** | On Wellness page |
| **Steps** | 1. Click "Meditate" tab |
| **Expected Result** | Shows meditation sessions |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-56: View Yoga Tab
| Field | Value |
|-------|-------|
| **ID** | TC-56 |
| **Test Case** | Verify yoga sessions display |
| **Precondition** | On Wellness page |
| **Steps** | 1. Click "Yoga" tab |
| **Expected Result** | Shows yoga class schedule |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-57: View Therapists
| Field | Value |
|-------|-------|
| **ID** | TC-57 |
| **Test Case** | Verify therapist directory displays |
| **Precondition** | On Wellness page |
| **Steps** | 1. Click "Therapists" tab |
| **Expected Result** | Shows list of counselors |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-58: Rotating Wellness Tip
| Field | Value |
|-------|-------|
| **ID** | TC-58 |
| **Test Case** | Verify wellness tip changes |
| **Precondition** | On Wellness page |
| **Steps** | 1. Observe tip card<br>2. Wait 8 seconds |
| **Expected Result** | Tip changes to a new one |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 11. Rasam & Riwaz Tests

### TC-59: View Rituals by Community
| Field | Value |
|-------|-------|
| **ID** | TC-59 |
| **Test Case** | Verify rituals change with community selection |
| **Precondition** | On Rasam & Riwaz page |
| **Steps** | 1. Click different community buttons |
| **Expected Result** | Rituals update accordingly |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-60: Coming Soon Banner
| Field | Value |
|-------|-------|
| **ID** | TC-60 |
| **Test Case** | Verify coming soon banner displays |
| **Precondition** | On Rasam & Riwaz page |
| **Steps** | 1. Observe top of page |
| **Expected Result** | Shows "Coming Soon" banner with features |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-61: Ritual Details
| Field | Value |
|-------|-------|
| **ID** | TC-61 |
| **Test Case** | Verify ritual cards show details |
| **Precondition** | On Rasam & Riwaz page |
| **Steps** | 1. Scroll to rituals list |
| **Expected Result** | Each ritual shows name, description, significance, duration |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 12. Legal Documents Tests

### TC-62: View Marriage Laws
| Field | Value |
|-------|-------|
| **ID** | TC-62 |
| **Test Case** | Verify marriage laws display |
| **Precondition** | On Legal Docs page |
| **Steps** | 1. Click "Marriage Laws" category |
| **Expected Result** | Shows Hindu Marriage Act, Special Marriage Act, etc. |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-63: View Registration Steps
| Field | Value |
|-------|-------|
| **ID** | TC-63 |
| **Test Case** | Verify registration process displays |
| **Precondition** | On Legal Docs page |
| **Steps** | 1. Click "Registration" category |
| **Expected Result** | Shows step-by-step registration guide |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

### TC-64: View Required Documents
| Field | Value |
|-------|-------|
| **ID** | TC-64 |
| **Test Case** | Verify document checklist displays |
| **Precondition** | On Legal Docs page |
| **Steps** | 1. Click "Required Docs" category |
| **Expected Result** | Shows checklist of required documents |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## 13. Navigation Tests

### TC-65: Bottom Navigation
| Field | Value |
|-------|-------|
| **ID** | TC-65 |
| **Test Case** | Verify bottom navigation works on all pages |
| **Precondition** | User logged in |
| **Steps** | 1. Click each bottom nav icon<br>2. Verify page changes |
| **Expected Result** | All navigation links work correctly |
| **Actual Result** | ✅ Pass |
| **Status** | Pass |

---

## Test Environment

| Component | Specification |
|-----------|---------------|
| Browser | Chrome 120+, Firefox 120+, Safari 17+ |
| Operating System | Windows 11, macOS Sonoma, iOS 17, Android 14 |
| Screen Resolution | 1920x1080, 1366x768, 375x667 |
| Network | Broadband (10+ Mbps), 4G/5G |

---

## Test Execution Log

| Date | Test Suite | Passed | Failed | Executed By |
|------|------------|--------|--------|-------------|
| April 21, 2026 | Full Regression | 65 | 0 | Diya Garg |

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Tester | Diya Garg | ✅ | April 21, 2026 |
| Developer | Diya Garg | ✅ | April 21, 2026 |

---

*End of Test Cases Document*