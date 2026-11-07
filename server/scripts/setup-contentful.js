require('dotenv').config();
const { createClient } = require('contentful-management');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const client = createClient({ accessToken: managementToken }, { type: 'plain' });

async function setup() {
  console.log(`Connecting to Space: ${spaceId}...`);

  // 1. Update Content Type: sectionSection with ContactFormSection in validations & ensure internalTitle displayField
  let sectionType = await client.contentType.get({ spaceId, environmentId, contentTypeId: 'sectionSection' });
  sectionType.displayField = 'internalTitle';
  
  const compTypeField = sectionType.fields.find(f => f.id === 'componentType');
  if (compTypeField && compTypeField.validations) {
    compTypeField.validations = [
      {
        in: ['HeroBanner', 'ProductShelf', 'DualFeaturette', 'CategoryPillsGrid', 'ContactFormSection']
      }
    ];
  }

  sectionType = await client.contentType.update({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  console.log(' Updated & Published Content Type: "Section"');

  // Helper to upsert a section
  async function upsertSection(entryId, internalTitle, componentType, props) {
    let entry;
    try {
      entry = await client.entry.get({ spaceId, environmentId, entryId });
      entry.fields.internalTitle = { 'en-US': internalTitle };
      entry.fields.componentType = { 'en-US': componentType };
      entry.fields.props = { 'en-US': props };
      entry = await client.entry.update({ spaceId, environmentId, entryId }, entry);
    } catch (err) {
      entry = await client.entry.createWithId(
        { spaceId, environmentId, contentTypeId: 'sectionSection', entryId },
        {
          fields: {
            internalTitle: { 'en-US': internalTitle },
            componentType: { 'en-US': componentType },
            props: { 'en-US': props }
          }
        }
      );
    }
    await client.entry.publish({ spaceId, environmentId, entryId }, entry);
    console.log(` Created/Updated section: "${internalTitle}"`);
    return entry;
  }

  // Helper to upsert a page
  async function upsertPage(slug, title, sectionIds) {
    let page;
    const pages = await client.entry.getMany({
      spaceId,
      environmentId,
      query: { content_type: 'page', 'fields.slug': slug }
    });

    const sectionLinks = sectionIds.map(id => ({
      sys: { type: 'Link', linkType: 'Entry', id }
    }));

    if (pages.items && pages.items.length > 0) {
      page = pages.items[0];
      page.fields.title = { 'en-US': title };
      page.fields.slug = { 'en-US': slug };
      page.fields.sections = { 'en-US': sectionLinks };
      page = await client.entry.update({ spaceId, environmentId, entryId: page.sys.id }, page);
    } else {
      page = await client.entry.create(
        { spaceId, environmentId, contentTypeId: 'page' },
        {
          fields: {
            title: { 'en-US': title },
            slug: { 'en-US': slug },
            sections: { 'en-US': sectionLinks }
          }
        }
      );
    }
    await client.entry.publish({ spaceId, environmentId, entryId: page.sys.id }, page);
    console.log(` Published Page: "${title}" (Slug: /pages/${slug})`);
    return page;
  }

  // 2. Create Sections for "contact"
  const secContactHero = await upsertSection(
    'sec-contact-hero',
    'Contact - Corporate Support Hero',
    'HeroBanner',
    {
      tag: 'Corporate Support 2026',
      headline: 'We Are Here to Assist Your Workplace',
      subtitle: 'Get in touch with our dedicated commercial accounts team for bulk quotes, custom fitouts, and warranty support.',
      ctaText: 'View Commercial Terms',
      ctaLink: '#contact-form',
      image: '/images/ergonomic-chair.jpg'
    }
  );

  const secContactForm = await upsertSection(
    'sec-contact-form',
    'Contact - Sales Inbox & Direct Form',
    'ContactFormSection',
    {
      tag: 'Direct Commercial Enquiry',
      title: 'Contact Corporate Sales',
      description: 'Speak with our workplace specialists regarding volume commercial quotes, ergonomic workstation assessments, or ongoing procurement accounts.',
      email: 'sales@officeworks-workplace.com.au',
      phone: '1300 000 890 (Mon-Fri 8am-6pm AEST)',
      address: '236 Bourke Street, Melbourne VIC 3000'
    }
  );

  const secPills = await upsertSection(
    'sec-workplace-pills',
    'Categories - 5 Workplace Collections Grid',
    'CategoryPillsGrid',
    {
      title: 'Explore Workplace Collections',
      subtitle: '5 Core Product Ranges',
      categories: [
        { name: 'Furniture & Seating', slug: 'furniture & seating', image: '/images/ergonomic-chair.jpg' },
        { name: 'Monitors & Tech', slug: 'technology & monitors', image: '/images/curved-monitor.jpg' },
        { name: 'Printers & Machines', slug: 'printers & machines', image: '/images/laser-printer.jpg' },
        { name: 'Storage Units', slug: 'storage & organisation', image: '/images/filing-cabinet.jpg' },
        { name: 'Stationery & Desk', slug: 'stationery & supplies', image: '/images/stationery-set.jpg' }
      ]
    }
  );

  // 3. Create Sections for "ergonomics"
  const secErgoHero = await upsertSection(
    'sec-ergo-hero',
    'Ergonomics - Guide & Standards Hero',
    'HeroBanner',
    {
      tag: 'Health & Wellness at Work',
      headline: 'Ergonomic Standards for 2026',
      subtitle: 'AFRDI Level 6 certified seating and dual-motor sit-stand workstations designed to reduce repetitive strain and elevate productivity.',
      ctaText: 'Explore Ergonomic Chairs',
      ctaLink: '/category/furniture%20%26%20seating',
      image: '/images/ergonomic-chair.jpg'
    }
  );

  const secErgoShelf = await upsertSection(
    'sec-ergo-shelf',
    'Ergonomics - Certified Seating Shelf',
    'ProductShelf',
    {
      title: 'AFRDI-Certified Ergonomic Seating',
      viewAllText: 'View All Chairs',
      viewAllLink: '/category/furniture%20%26%20seating',
      mode: 'featured',
      limit: 5
    }
  );

  const secErgoDuals = await upsertSection(
    'sec-ergo-duals',
    'Ergonomics - Standing Desks & Curved Displays',
    'DualFeaturette',
    {
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
        btnText: 'View Displays'
      }
    }
  );

  // 4. Create Sections for "deals"
  const secDealsHero = await upsertSection(
    'sec-deals-hero',
    'Deals - Workstation Flash Sale Hero',
    'HeroBanner',
    {
      tag: 'Commercial Clearance 2026',
      headline: 'Workstation Flash Sale',
      subtitle: 'Up to 30% off commercial ergonomic seating, electric sit-stand desks, and high-resolution displays.',
      ctaText: 'View Clearance',
      ctaLink: '/category/furniture%20%26%20seating',
      image: '/images/standing-desk.jpg'
    }
  );

  const secDealsShelf = await upsertSection(
    'sec-deals-shelf',
    'Deals - Top Clearance Picks Shelf',
    'ProductShelf',
    {
      title: 'Top Clearance Picks (Featured)',
      viewAllText: 'Explore All Furniture',
      viewAllLink: '/category/furniture%20%26%20seating',
      mode: 'featured',
      limit: 5
    }
  );

  // 5. Publish the 3 Pages in Contentful
  await upsertPage('contact', 'Contact Us', [
    secContactHero.sys.id,
    secContactForm.sys.id,
    secPills.sys.id
  ]);

  await upsertPage('ergonomics', 'Workplace Ergonomics Guide', [
    secErgoHero.sys.id,
    secErgoShelf.sys.id,
    secErgoDuals.sys.id,
    secContactForm.sys.id
  ]);

  await upsertPage('deals', 'Clearance & Deals', [
    secDealsHero.sys.id,
    secDealsShelf.sys.id,
    secErgoDuals.sys.id,
    secPills.sys.id
  ]);

  console.log('\n Successfully created and published all pages and sections directly in Contentful!');
}

setup().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
