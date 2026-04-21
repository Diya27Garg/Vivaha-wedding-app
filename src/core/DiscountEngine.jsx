// src/core/DiscountEngine.jsx
// Core business logic for discounts and power pairs

export class DiscountEngine {
  constructor() {
    this.powerPairs = [
      { id: 1, name: "Photography + Cinematography", discount: 15, minVendors: 2 },
      { id: 2, name: "Decor + Lighting", discount: 20, minVendors: 2 },
      { id: 3, name: "Makeup + Mehendi", discount: 10, minVendors: 2 },
    ];
    
    this.bulkDiscount = {
      minVendors: 3,
      discountPercentage: 15,
      description: "Book 3+ vendors and get 15% OFF",
    };
  }

  calculatePowerPairDiscount(vendorIds) {
    let totalDiscount = 0;
    let appliedPairs = [];
    
    for (const pair of this.powerPairs) {
      if (vendorIds.length >= pair.minVendors) {
        totalDiscount += pair.discount;
        appliedPairs.push(pair.name);
      }
    }
    
    return {
      totalDiscount,
      appliedPairs,
      finalPrice: 0,
    };
  }

  calculateBulkDiscount(vendorCount) {
    if (vendorCount >= this.bulkDiscount.minVendors) {
      return {
        applied: true,
        discount: this.bulkDiscount.discountPercentage,
        message: this.bulkDiscount.description,
      };
    }
    return {
      applied: false,
      discount: 0,
      message: `Book ${this.bulkDiscount.minVendors - vendorCount} more vendors to get ${this.bulkDiscount.discountPercentage}% off!`,
    };
  }
}

export default DiscountEngine;