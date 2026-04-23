// src/services/bookingService.js (updated)
import { mockUsers, mockBookings, mockSlots } from "../data/mockData";

class BookingService {
  constructor() {
    this.bookings = [...mockBookings];
    this.listeners = [];
  }

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
          weddingDate: requirements.eventDate,
          venue: requirements.venue || mockUsers.couple.venue,
          requirements: requirements,
          status: "pending",
          createdAt: new Date().toISOString(),
          vendorResponse: null,
          meetingScheduled: null,
          paymentStatus: "pending",
          amount: this.extractPrice(vendor.price),
          invoiceSent: false,
          paidAt: null
        };
        this.bookings.unshift(request);
        this.notifyListeners();
        resolve(request);
      }, 1500);
    });
  }

  async vendorAccept(bookingId, message) {
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

  async sendInvoice(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.invoiceSent = true;
          booking.invoiceSentAt = new Date().toISOString();
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 1000);
    });
  }

  async processPayment(bookingId, paymentDetails) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.paymentStatus = "completed";
          booking.status = "booked";
          booking.paidAt = new Date().toISOString();
          booking.paymentDetails = {
            ...paymentDetails,
            transactionId: `TXN_${Date.now()}`
          };
          this.notifyListeners();
          resolve(booking);
        }
        resolve(null);
      }, 2000);
    });
  }

  extractPrice(priceString) {
    const match = priceString.match(/[\d,]+/);
    if (match) {
      return parseInt(match[0].replace(/,/g, ''));
    }
    return 50000;
  }

  async getCoupleBookings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.bookings]);
      }, 500);
    });
  }

  async getVendorBookings(vendorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bookings.filter(b => b.vendorId === vendorId));
      }, 500);
    });
  }

  async getBooking(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.bookings.find(b => b.id === bookingId));
      }, 300);
    });
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.bookings));
  }

  async getAvailableSlots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSlots]);
      }, 500);
    });
  }
}

export const bookingService = new BookingService();