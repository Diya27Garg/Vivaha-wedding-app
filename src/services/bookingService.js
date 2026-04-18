// src/services/bookingService.js
import { mockUsers, mockBookings, mockSlots } from "../data/mockData";

// Mock API service
class BookingService {
  constructor() {
    this.bookings = [...mockBookings];
    this.listeners = [];
  }

  // Send booking request to vendor
  async sendBookingRequest(vendorId, coupleDetails, requirements) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vendor = mockUsers.vendors[vendorId];
        const request = {
          id: Date.now(),
          vendorId: vendorId,
          vendorName: vendor.name,
          vendorType: vendor.type,
          coupleId: mockUsers.couple.id,
          coupleName: mockUsers.couple.name,
          coupleEmail: mockUsers.couple.email,
          couplePhone: mockUsers.couple.phone,
          weddingDate: mockUsers.couple.weddingDate,
          venue: mockUsers.couple.venue,
          requirements: requirements,
          status: "pending",
          createdAt: new Date().toISOString(),
          vendorResponse: null,
          meetingScheduled: null,
          paymentStatus: "pending",
          amount: this.extractPrice(vendor.price)
        };
        this.bookings.unshift(request);
        this.notifyListeners();
        resolve(request);
      }, 1500);
    });
  }

  extractPrice(priceString) {
    const match = priceString.match(/[\d,]+/);
    if (match) {
      return parseInt(match[0].replace(/,/g, ''));
    }
    return 50000;
  }

  // Vendor accepts request
  async vendorAccept(bookingId, message = "") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.status = "vendor_accepted";
          booking.vendorResponse = {
            action: "accept",
            message: message || "Thank you for your interest! We'd love to work with you.",
            respondedAt: new Date().toISOString()
          };
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 1000);
    });
  }

  // Vendor rejects request
  async vendorReject(bookingId, message = "") {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.status = "rejected";
          booking.vendorResponse = {
            action: "reject",
            message: message || "Unfortunately, we're not available on your wedding date.",
            respondedAt: new Date().toISOString()
          };
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 1000);
    });
  }

  // Schedule meeting
  async scheduleMeeting(bookingId, slot) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.meetingScheduled = {
            date: slot.date,
            time: slot.time,
            status: "scheduled",
            meetingLink: `https://meet.vivaha.com/${bookingId}`,
            scheduledAt: new Date().toISOString()
          };
          booking.status = "meeting_scheduled";
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 1000);
    });
  }

  // Confirm booking after meeting
  async confirmBooking(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.status = "confirmed";
          booking.confirmedAt = new Date().toISOString();
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 1000);
    });
  }

  // Process payment
  async processPayment(bookingId, paymentDetails) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.paymentStatus = "completed";
          booking.status = "booked";
          booking.paymentDetails = {
            ...paymentDetails,
            paidAt: new Date().toISOString(),
            transactionId: `TXN_${Date.now()}`
          };
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 2000);
    });
  }

  // Get couple's bookings
  async getCoupleBookings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.bookings]);
      }, 500);
    });
  }

  // Get vendor bookings
  async getVendorBookings(vendorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bookings.filter(b => b.vendorId === vendorId));
      }, 500);
    });
  }

  // Get single booking
  async getBooking(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bookings.find(b => b.id === bookingId));
      }, 300);
    });
  }

  // Subscribe to booking updates
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.bookings));
  }

  // Get available meeting slots
  async getAvailableSlots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSlots]);
      }, 500);
    });
  }
}

export const bookingService = new BookingService();