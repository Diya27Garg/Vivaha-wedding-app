// src/data/mockData.js

// Mock user data
export const mockUsers = {
  couple: {
    id: 1,
    name: "Priya & Raj",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    weddingDate: "2025-12-15",
    venue: "Jaipur, Rajasthan",
    guestCount: 200,
    budget: "₹25,00,000"
  },
  vendors: {
    1: { 
      id: 1, 
      name: "Lens & Love Studio", 
      email: "contact@lenslove.com", 
      phone: "+91 99887 66554", 
      type: "Photography", 
      rating: 4.9,
      price: "₹85,000",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80"
    },
    2: { 
      id: 2, 
      name: "Royal Blooms Decor", 
      email: "info@royalblooms.com", 
      phone: "+91 98765 12345", 
      type: "Decor", 
      rating: 4.8,
      price: "₹1,20,000",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80"
    },
    3: { 
      id: 3, 
      name: "Glam by Priya", 
      email: "priya@glam.com", 
      phone: "+91 87654 32109", 
      type: "Makeup", 
      rating: 5.0,
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80"
    },
    4: { 
      id: 4, 
      name: "Grand Feast Caterers", 
      email: "contact@grandfeast.com", 
      phone: "+91 99887 12345", 
      type: "Catering", 
      rating: 4.7,
      price: "₹1,80,000",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80"
    },
    5: { 
      id: 5, 
      name: "Beat Masters DJ", 
      email: "dj@beatmasters.com", 
      phone: "+91 98765 99887", 
      type: "Music", 
      rating: 4.6,
      price: "₹60,000",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80"
    },
    6: { 
      id: 6, 
      name: "Dream Venues", 
      email: "info@dreamvenues.com", 
      phone: "+91 87654 11223", 
      type: "Venue", 
      rating: 4.9,
      price: "₹5,00,000",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80"
    }
  }
};

// Mock bookings database (starts empty)
export let mockBookings = [];

// Mock available meeting slots
export const mockSlots = [
  { id: 1, date: "2024-01-20", time: "10:00 AM", available: true },
  { id: 2, date: "2024-01-20", time: "2:00 PM", available: true },
  { id: 3, date: "2024-01-21", time: "11:00 AM", available: true },
  { id: 4, date: "2024-01-21", time: "3:00 PM", available: true },
  { id: 5, date: "2024-01-22", time: "12:00 PM", available: true },
  { id: 6, date: "2024-01-22", time: "4:00 PM", available: true },
  { id: 7, date: "2024-01-23", time: "10:30 AM", available: true },
  { id: 8, date: "2024-01-23", time: "1:30 PM", available: true }
];

// Mock vendor responses (for simulating vendor actions)
export const mockVendorResponses = {
  accept: {
    message: "Thank you for your interest! We'd love to work with you. Let's schedule a call to discuss your requirements in detail.",
    timeline: "Response within 1 hour"
  },
  reject: {
    message: "Unfortunately, we're already booked for your wedding date. We wish you the best for your special day!",
    timeline: "Response within 2 hours"
  }
};

// Helper function to add a sample booking (for testing)
export function addSampleBooking() {
  const sampleBooking = {
    id: Date.now(),
    vendorId: 1,
    coupleId: mockUsers.couple.id,
    coupleName: mockUsers.couple.name,
    coupleEmail: mockUsers.couple.email,
    couplePhone: mockUsers.couple.phone,
    weddingDate: mockUsers.couple.weddingDate,
    venue: mockUsers.couple.venue,
    requirements: {
      eventDate: mockUsers.couple.weddingDate,
      guestCount: mockUsers.couple.guestCount,
      budget: "1L-2L",
      specialRequests: "Looking for candid photography style",
      contactNumber: mockUsers.couple.phone
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    vendorResponse: null,
    meetingScheduled: null,
    paymentStatus: "pending",
    amount: 85000
  };
  mockBookings.push(sampleBooking);
  return sampleBooking;
}