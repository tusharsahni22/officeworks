/**
 * Product Adapter Abstraction
 * 
 * Provides a decoupled interface for retrieving product catalogue items.
 * Currently consumes the Fake Store API (or local curated dataset fallback).
 * In future iterations, swapping to MongoDB Atlas, PostgreSQL, or Shopify
 * requires modifying only this adapter, keeping controllers and routes intact.
 */

const FAKESTORE_API_URL = process.env.FAKESTORE_API_URL || 'https://fakestoreapi.com';

// Local curated workplace products matching frontend client visual assets
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Ergohuman Executive Mesh Ergonomic Office Chair",
    price: 649.00,
    description: "Commercial-grade high-back ergonomic task chair with dynamic lumbar support, 4D adjustable armrests, pneumatic height adjustment, and breathable elastomeric mesh.",
    category: "furniture & seating",
    image: "/images/ergonomic-chair.jpg",
    rating: { rate: 4.9, count: 520 }
  },
  {
    id: 2,
    title: "Apex Motorised Dual-Motor Electric Standing Desk (1500 x 750mm)",
    price: 529.00,
    description: "Heavy-duty steel frame dual-motor height adjustable sit-stand desk with 4 programmable memory presets, anti-collision sensor, and cable management tray.",
    category: "furniture & seating",
    image: "/images/standing-desk.jpg",
    rating: { rate: 4.8, count: 430 }
  },
  {
    id: 3,
    title: "Dell UltraSharp 34\" Curved USB-C Hub WQHD Monitor",
    price: 899.00,
    description: "Immersive 34-inch curved productivity monitor with 90W Power Delivery USB-C, built-in RJ45 Ethernet, ComfortView Plus low blue light, and 99% sRGB color accuracy.",
    category: "technology & monitors",
    image: "/images/curved-monitor.jpg",
    rating: { rate: 4.9, count: 380 }
  },
  {
    id: 4,
    title: "Logitech MX Mechanical Wireless Keyboard & Backlit Keys",
    price: 219.00,
    description: "Low-profile tactile quiet mechanical switches, smart illumination, dual Bluetooth and Logi Bolt connectivity with multi-device cross-computer flow.",
    category: "technology & monitors",
    image: "/images/mechanical-keyboard.jpg",
    rating: { rate: 4.8, count: 670 }
  },
  {
    id: 5,
    title: "Logitech MX Master 3S Performance Wireless Ergonomic Mouse",
    price: 149.00,
    description: "8K DPI any-surface optical sensor, MagSpeed electromagnetic scroll wheel, quiet click mechanism, and thumb scroll wheel for seamless spreadsheets and CAD.",
    category: "technology & monitors",
    image: "/images/wireless-mouse.jpg",
    rating: { rate: 4.9, count: 890 }
  },
  {
    id: 6,
    title: "Brother Pro All-in-One Wireless Colour Laser Multi-Function Printer",
    price: 479.00,
    description: "High-speed automatic duplex printing, 50-sheet dual-scan ADF, high-yield toner cartridges, and Gigabit Ethernet / Wi-Fi direct network connectivity.",
    category: "printers & machines",
    image: "/images/laser-printer.jpg",
    rating: { rate: 4.7, count: 310 }
  },
  {
    id: 7,
    title: "Bose QuietComfort 45 Active Noise-Cancelling Commercial Headset",
    price: 349.00,
    description: "Industry-leading acoustic noise cancellation with Aware Mode, lightweight synthetic leather cushions, crystal-clear voice pickup for Zoom and Microsoft Teams.",
    category: "technology & monitors",
    image: "/images/noise-cancelling-headphones.jpg",
    rating: { rate: 4.8, count: 460 }
  },
  {
    id: 8,
    title: "BenQ e-Reading Architect LED Anti-Glare Smart Desk Lamp",
    price: 189.00,
    description: "Curved optical head illuminates entire workstation (90cm range), ambient light sensor with auto-dimming mode and adjustable colour temperatures from 2700K to 5700K.",
    category: "office lighting & decor",
    image: "/images/desk-lamp.jpg",
    rating: { rate: 4.6, count: 210 }
  },
  {
    id: 9,
    title: "Fellowes Powershred 12-Sheet Heavy Duty Cross-Cut Shredder",
    price: 239.00,
    description: "100% Jam Proof system with SafeSense technology, shreds 12 sheets per pass into 4x38mm particles (DIN P-4 security), staples, paper clips, and credit cards.",
    category: "printers & machines",
    image: "/images/shredder-machine.jpg",
    rating: { rate: 4.5, count: 185 }
  },
  {
    id: 10,
    title: "Precision Steel 3-Drawer Mobile Locking Filing Cabinet",
    price: 169.00,
    description: "Heavy-gauge powder coated steel pedestal with anti-tilt fifth wheel, master central lock system, and full extension runners for foolscap & A4 suspension files.",
    category: "storage & organisation",
    image: "/images/filing-cabinet.jpg",
    rating: { rate: 4.6, count: 290 }
  },
  {
    id: 11,
    title: "Moleskine Professional Executive Hardcover A4 Notebook",
    price: 34.95,
    description: "FSC-certified 100gsm acid-free ivory pages, structured project layout with meeting notes section, expandable inner pocket, and double ribbon bookmark.",
    category: "stationery & supplies",
    image: "/images/executive-notebook.jpg",
    rating: { rate: 4.7, count: 740 }
  },
  {
    id: 12,
    title: "Deluxe Executive Desk Organisation & Stationery Gift Suite",
    price: 89.00,
    description: "Weighted matte anodised aluminium desk tray, magnetic paperclip dispenser, heavy-duty stapler, tape dispenser, and brass fountain pen set.",
    category: "stationery & supplies",
    image: "/images/stationery-set.jpg",
    rating: { rate: 4.6, count: 320 }
  }
];

class ProductAdapter {
  /**
   * Fetch all products from external source or fallback
   */
  async getAllProducts() {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products`);
      if (response.ok) {
        const external = await response.json();
        // Return external products or merged dataset
        return external && external.length > 0 ? external : FALLBACK_PRODUCTS;
      }
      return FALLBACK_PRODUCTS;
    } catch (error) {
      console.warn(`[ProductAdapter] External API unreachable (${error.message}). Using fallback data.`);
      return FALLBACK_PRODUCTS;
    }
  }

  /**
   * Fetch a single product by ID
   */
  async getProductById(id) {
    const numericId = parseInt(id, 10);
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products/${numericId}`);
      if (response.ok) {
        const item = await response.json();
        if (item && item.id) return item;
      }
    } catch (error) {
      // Fallback
    }

    return FALLBACK_PRODUCTS.find((p) => p.id === numericId) || null;
  }

  /**
   * Fetch all categories
   */
  async getCategories() {
    try {
      const response = await fetch(`${FAKESTORE_API_URL}/products/categories`);
      if (response.ok) {
        const categories = await response.json();
        if (categories && categories.length > 0) return categories;
      }
    } catch (error) {
      // Fallback
    }

    const uniqueCategories = [...new Set(FALLBACK_PRODUCTS.map((p) => p.category))];
    return uniqueCategories;
  }
}

module.exports = new ProductAdapter();
module.exports.FALLBACK_PRODUCTS = FALLBACK_PRODUCTS;
