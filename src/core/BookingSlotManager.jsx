// src/core/BookingSlotManager.jsx
// Core logic for managing booking slots and availability

export class BookingSlotManager {
  constructor() {
    this.slots = [
      { id: 1, date: "2024-01-20", time: "10:00 AM", available: true },
      { id: 2, date: "2024-01-20", time: "2:00 PM", available: true },
      { id: 3, date: "2024-01-21", time: "11:00 AM", available: true },
      { id: 4, date: "2024-01-21", time: "3:00 PM", available: true },
    ];
  }

  getAvailableSlots(date = null) {
    if (date) {
      return this.slots.filter(slot => slot.date === date && slot.available);
    }
    return this.slots.filter(slot => slot.available);
  }

  bookSlot(slotId) {
    const slot = this.slots.find(s => s.id === slotId);
    if (slot && slot.available) {
      slot.available = false;
      return { success: true, message: "Slot booked successfully!" };
    }
    return { success: false, message: "Slot not available" };
  }

  releaseSlot(slotId) {
    const slot = this.slots.find(s => s.id === slotId);
    if (slot) {
      slot.available = true;
      return { success: true };
    }
    return { success: false };
  }
}

export default BookingSlotManager;