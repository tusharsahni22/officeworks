const contentful = require('contentful');

/**
 * Contentful Adapter (Server-Driven UI)
 * 
 * Retrieves dynamic page configuration schemas from Contentful.
 * When CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are configured,
 * it pulls live dynamic sections.
 * 
 * If credentials are not supplied, it transparently returns a default
 * structured schema (fulfilling Technical Constraint #6: Zero Paid Dependencies for reviewers).
 */

class ContentfulAdapter {
  constructor() {
    this.spaceId = process.env.CONTENTFUL_SPACE_ID;
    this.accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
    this.environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';
    this.client = null;

    if (this.spaceId && this.accessToken) {
      try {
        this.client = contentful.createClient({
          space: this.spaceId,
          accessToken: this.accessToken,
          environment: this.environment
        });
        console.log('[ContentfulAdapter] Initialized with live Contentful Space:', this.spaceId);
      } catch (err) {
        console.warn('[ContentfulAdapter] Setup failed:', err.message);
      }
    } else {
      console.log('[ContentfulAdapter] Running in fallback mode. Supply CONTENTFUL_SPACE_ID & CONTENTFUL_ACCESS_TOKEN in .env for live CMS control.');
    }
  }

  /**
   * Default fallback layout for Header & Footer navigation
   */
  getDefaultNavigation() {
    return {
      header: {
        announcement: 'Free Commercial Metro Delivery On Workstation Orders Over $55',
        brand: 'OFFICEWORKS // WORKPLACE',
        primaryLinks: [
          { label: 'Workstations', url: '/category/furniture%20%26%20seating' },
          { label: 'Technology', url: '/category/technology%20%26%20monitors' },
          { label: 'Deals & Offers', url: '/pages/deals' },
          { label: 'Ergonomics Guide', url: '/pages/ergonomics' },
          { label: 'Contact Us', url: '/pages/contact' }
        ],
        categories: [
          { label: 'All Products', url: '/' },
          { label: 'furniture & seating', url: '/category/furniture%20%26%20seating' },
          { label: 'technology & monitors', url: '/category/technology%20%26%20monitors' },
          { label: 'printers & machines', url: '/category/printers%20%26%20machines' },
          { label: 'storage & organisation', url: '/category/storage%20%26%20organisation' },
          { label: 'stationery & supplies', url: '/category/stationery%20%26%20supplies' }
        ]
      },
      footer: {
        newsletter: {
          title: 'Corporate Trade Updates',
          description: 'Receive updates on volume workstation fitouts, ergonomic certifications, and stock releases.'
        },
        columns: [
          {
            title: 'Workplace Categories',
            links: [
              { label: 'Ergonomic Task Chairs', url: '/category/furniture%20%26%20seating' },
              { label: 'Motorised Standing Desks', url: '/category/furniture%20%26%20seating' },
              { label: 'Curved USB-C Monitors', url: '/category/technology%20%26%20monitors' },
              { label: 'Laser Printers & Scanners', url: '/category/printers%20%26%20machines' }
            ]
          },
          {
            title: 'Customer Services',
            links: [
              { label: 'Request Corporate Quote', url: '/pages/contact' },
              { label: 'Commercial Deals & Clearance', url: '/pages/deals' },
              { label: 'AFRDI Certification Guidelines', url: '/pages/ergonomics' },
              { label: 'Commercial Returns & Service', url: '/pages/contact' }
            ]
          },
          {
            title: 'Account & Legal',
            links: [
              { label: '30-Day B2B Trade Accounts', url: '/pages/contact' },
              { label: 'Supply Chain Compliance', url: '/pages/ergonomics' },
              { label: 'Circular Furniture Recycling', url: '/pages/ergonomics' },
              { label: 'Terms & Warranties', url: '/pages/contact' }
            ]
          }
        ],
        copyright: `© ${new Date().getFullYear()} Officeworks Workplace Catalogue MVP.`
      }
    };
  }

  /**
   * Fetch Navigation (Header & Footer) from Contentful or default fallback
   */
  async getNavigation() {
    if (!this.client) {
      return this.getDefaultNavigation();
    }

    try {
      const entries = await this.client.getEntries({
        content_type: 'page',
        'fields.slug': 'navigation',
        include: 2
      });

      if (entries.items && entries.items.length > 0) {
        const navEntry = entries.items[0];
        const rawSections = navEntry.fields.sections || [];
        const headerSec = rawSections.find(s => s.fields?.componentType === 'HeaderNavigation');
        const footerSec = rawSections.find(s => s.fields?.componentType === 'FooterNavigation');

        const defaultNav = this.getDefaultNavigation();

        return {
          header: headerSec?.fields?.props || defaultNav.header,
          footer: footerSec?.fields?.props || defaultNav.footer
        };
      }
    } catch (err) {
      console.warn('[ContentfulAdapter] Failed to fetch navigation:', err.message);
    }

    return this.getDefaultNavigation();
  }
  getDefaultContactSchema() {
    return {
      page: 'contact',
      title: 'Contact Us',
      sections: [
        {
          id: 'contact-hero',
          type: 'HeroBanner',
          order: 1,
          props: {
            tag: 'Corporate Support',
            headline: 'We Are Here to Assist Your Workplace',
            subtitle: 'Get in touch with our dedicated commercial accounts team for bulk quotes, custom fitouts, and warranty support.',
            ctaText: 'View Showrooms',
            ctaLink: '#contact-form',
            image: '/images/ergonomic-chair.jpg'
          }
        },
        {
          id: 'contact-form-sec',
          type: 'ContactFormSection',
          order: 2,
          props: {
            tag: 'Direct Enquiry',
            title: 'Contact Corporate Sales',
            description: 'Speak with our workplace specialists regarding volume commercial quotes, ergonomic workstation assessments, or ongoing procurement accounts.',
            email: 'sales@officeworks-workplace.com.au',
            phone: '1300 000 890 (Mon-Fri 8am-6pm AEST)',
            address: '236 Bourke Street, Melbourne VIC 3000'
          }
        },
        {
          id: 'contact-pills',
          type: 'CategoryPillsGrid',
          order: 3,
          props: {
            title: 'Explore Our Product Ranges',
            subtitle: '5 Workplace Collections',
            categories: [
              { name: 'Furniture & Seating', slug: 'furniture & seating', image: '/images/ergonomic-chair.jpg' },
              { name: 'Monitors & Tech', slug: 'technology & monitors', image: '/images/curved-monitor.jpg' },
              { name: 'Printers & Machines', slug: 'printers & machines', image: '/images/laser-printer.jpg' },
              { name: 'Storage Units', slug: 'storage & organisation', image: '/images/filing-cabinet.jpg' },
              { name: 'Stationery & Desk', slug: 'stationery & supplies', image: '/images/stationery-set.jpg' }
            ]
          }
        }
      ]
    };
  }

  /**
   * Default fallback SDUI layout for Workspace Ergonomics guide page
   */
  getDefaultErgonomicsSchema() {
    return {
      page: 'ergonomics',
      title: 'Ergonomic Workplace Guide',
      sections: [
        {
          id: 'ergo-hero',
          type: 'HeroBanner',
          order: 1,
          props: {
            tag: 'Health & Wellness at Work',
            headline: 'Ergonomic Standards for 2026',
            subtitle: 'AFRDI Level 6 certified seating and dual-motor sit-stand workstations designed to reduce repetitive strain and elevate daily productivity.',
            ctaText: 'Explore Ergonomic Chairs',
            ctaLink: '/category/furniture%20%26%20seating',
            image: '/images/ergonomic-chair.jpg'
          }
        },
        {
          id: 'ergo-bestsellers',
          type: 'ProductShelf',
          order: 2,
          props: {
            title: 'Certified Ergonomic Seating',
            viewAllText: 'View All Chairs',
            viewAllLink: '/category/furniture%20%26%20seating',
            mode: 'featured',
            limit: 5
          }
        },
        {
          id: 'ergo-duals',
          type: 'DualFeaturette',
          order: 3,
          props: {
            leftCard: {
              title: 'Motorised Standing Desks',
              image: '/images/standing-desk.jpg',
              link: '/product/2',
              btnText: 'Explore Desks'
            },
            rightCard: {
              title: 'Curved Eye-Care Displays',
              image: '/images/curved-monitor.jpg',
              link: '/product/3',
              btnText: 'View Monitors'
            }
          }
        },
        {
          id: 'ergo-contact',
          type: 'ContactFormSection',
          order: 4,
          props: {
            tag: 'Free Ergonomic Assessment',
            title: 'Book an Office Ergonomic Consultation',
            description: 'Our certified workplace ergonomic specialists evaluate your floor plan and provide customized workstation recommendations.'
          }
        }
      ]
    };
  }

  getDefaultHomeSchema() {
    return {
      page: 'home',
      title: 'Modern Workplace Catalogue',
      sections: [
        {
          id: 'sec-hero-1',
          type: 'HeroBanner',
          order: 1,
          props: {
            tag: 'Commercial Workplace 2026',
            headline: 'The Modern Office Suite',
            subtitle: 'High-performance ergonomic task chairs, dual-motor sit-stand workstations, and precision monitors engineered for commercial durability.',
            ctaText: 'Explore Workstations',
            ctaLink: '/category/furniture%20%26%20seating',
            image: '/images/ergonomic-chair.jpg'
          }
        },
        {
          id: 'sec-bestsellers-2',
          type: 'ProductShelf',
          order: 2,
          props: {
            title: 'Best Sellers (Featured 5 Top Rated)',
            viewAllText: 'Shop All Workstations',
            viewAllLink: '/category/furniture%20%26%20seating',
            mode: 'featured', // Dynamically populates with top 5 rated
            limit: 5
          }
        },
        {
          id: 'sec-duals-3',
          type: 'DualFeaturette',
          order: 3,
          props: {
            leftCard: {
              title: 'Dual-Motor Standing Desks',
              image: '/images/standing-desk.jpg',
              link: '/product/2',
              btnText: 'View Specs'
            },
            rightCard: {
              title: 'Dell UltraSharp 34" Monitors',
              image: '/images/curved-monitor.jpg',
              link: '/product/3',
              btnText: 'View Specs'
            }
          }
        },
        {
          id: 'sec-tech-4',
          type: 'ProductShelf',
          order: 4,
          props: {
            title: 'Commercial Technology & Devices',
            viewAllText: 'View All Tech',
            viewAllLink: '/category/technology%20%26%20monitors',
            mode: 'category',
            category: 'technology & monitors',
            limit: 5
          }
        },
        {
          id: 'sec-categories-5',
          type: 'CategoryPillsGrid',
          order: 5,
          props: {
            title: 'Shop by Category',
            subtitle: '5 Workplace Collections',
            categories: [
              { name: 'Furniture & Seating', slug: 'furniture & seating', image: '/images/ergonomic-chair.jpg' },
              { name: 'Monitors & Tech', slug: 'technology & monitors', image: '/images/curved-monitor.jpg' },
              { name: 'Printers & Machines', slug: 'printers & machines', image: '/images/laser-printer.jpg' },
              { name: 'Storage Units', slug: 'storage & organisation', image: '/images/filing-cabinet.jpg' },
              { name: 'Stationery & Desk', slug: 'stationery & supplies', image: '/images/stationery-set.jpg' }
            ]
          }
        }
      ]
    };
  }

  /**
   * Fetch page schema by slug
   */
  async getPageLayout(slug = 'home') {
    if (!this.client) {
      return this.getDefaultHomeSchema();
    }

    try {
      // Query Contentful for Content Type 'page' with slug matching
      const entries = await this.client.getEntries({
        content_type: 'page',
        'fields.slug': slug,
        include: 3
      });

      if (entries.items && entries.items.length > 0) {
        const pageEntry = entries.items[0];
        const rawSections = pageEntry.fields.sections || [];

        // Parse and sort sections according to Contentful reference list order
        const sections = rawSections.map((sec, index) => {
          const fields = sec.fields || {};
          return {
            id: sec.sys?.id || `sec-${index}`,
            type: fields.componentType || fields.type,
            order: index + 1,
            props: fields.props || fields
          };
        });

        return {
          page: slug,
          title: pageEntry.fields.title || 'Page',
          sections
        };
      } else {
        // Fallback to built-in schemas if not yet created in Contentful
        if (slug === 'contact') return this.getDefaultContactSchema();
        if (slug === 'ergonomics') return this.getDefaultErgonomicsSchema();

        return {
          page: slug,
          title: slug,
          sections: []
        };
      }
    } catch (err) {
      console.warn(`[ContentfulAdapter] Failed to fetch slug '${slug}':`, err.message);
    }

    // Fallbacks if CMS request fails
    if (slug === 'home') return this.getDefaultHomeSchema();
    if (slug === 'contact') return this.getDefaultContactSchema();
    if (slug === 'ergonomics') return this.getDefaultErgonomicsSchema();

    return {
      page: slug,
      title: slug,
      sections: []
    };
  }
}

module.exports = new ContentfulAdapter();

