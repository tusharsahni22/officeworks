require('dotenv').config();
const { createClient } = require('contentful-management');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const client = createClient({ accessToken: managementToken }, { type: 'plain' });

async function refineAndPublish() {
  console.log(`Updating Contentful Space: ${spaceId}...`);

  // 1. Update Content Type: Section to allow ValuePropsStrip in validations
  let sectionType = await client.contentType.get({ spaceId, environmentId, contentTypeId: 'sectionSection' });
  sectionType.displayField = 'internalTitle';
  
  const compTypeField = sectionType.fields.find(f => f.id === 'componentType');
  if (compTypeField && compTypeField.validations) {
    compTypeField.validations = [
      {
        in: ['HeroBanner', 'ProductShelf', 'DualFeaturette', 'CategoryPillsGrid', 'ContactFormSection', 'ValuePropsStrip']
      }
    ];
  }

  sectionType = await client.contentType.update({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  console.log(' Updated Content Type "Section" with ValuePropsStrip');

  // Helper function to upsert section
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
    console.log(` Upserted section: "${internalTitle}"`);
    return entry;
  }

  // Helper function to upsert page
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
    console.log(` Published Page: "${title}" (Slug: ${slug})`);
    return page;
  }

  // 2. Create polished unique sections for Homepage
  const secHomeHero = await upsertSection(
    'sec-home-hero',
    'Home - Commercial Workplace Suite 2026',
    'HeroBanner',
    {
      tag: 'Commercial Solutions 2026',
      headline: 'The Modern Commercial Suite',
      subtitle: 'Engineered for team performance. Commercial-grade ergonomic task seating, motorized sit-stand desks, and high-resolution monitors with full Australian AFRDI warranties.',
      ctaText: 'Explore Workstations',
      ctaLink: '/category/furniture%20%26%20seating',
      image: '/images/ergonomic-chair.jpg'
    }
  );

  const secHomeValueProps = await upsertSection(
    'sec-home-value-strip',
    'Home - Enterprise Guarantees Strip',
    'ValuePropsStrip',
    {
      items: [
        { title: 'Free Metro Delivery', description: 'On commercial orders over $55' },
        { title: 'AFRDI Certified', description: 'Level 6 commercial durability' },
        { title: '10-Year Warranty', description: 'Comprehensive manufacturer support' },
        { title: '30-Day B2B Accounts', description: 'Streamlined trade credit terms' }
      ]
    }
  );

  const secHomeBestSellers = await upsertSection(
    'sec-home-bestsellers',
    'Home - Featured Top-Rated Workplace Hardware',
    'ProductShelf',
    {
      title: 'Best Sellers (Top 5 Commercial Workstations)',
      viewAllText: 'Browse All Workstations',
      viewAllLink: '/category/furniture%20%26%20seating',
      mode: 'featured',
      limit: 5
    }
  );

  const secHomeDuals = await upsertSection(
    'sec-home-duals',
    'Home - Dual Focus: Standing Desks & Precision Displays',
    'DualFeaturette',
    {
      leftCard: {
        title: 'Dual-Motor Sit-Stand Workstations',
        image: '/images/standing-desk.jpg',
        link: '/product/2',
        btnText: 'View Desk Specs'
      },
      rightCard: {
        title: 'Dell UltraSharp 34" Curved Monitors',
        image: '/images/curved-monitor.jpg',
        link: '/product/3',
        btnText: 'View Display Specs'
      }
    }
  );

  const secHomeTechShelf = await upsertSection(
    'sec-home-tech-shelf',
    'Home - Commercial Technology & Devices Shelf',
    'ProductShelf',
    {
      title: 'Commercial Technology & Displays',
      viewAllText: 'View Tech & Hardware',
      viewAllLink: '/category/technology%20%26%20monitors',
      mode: 'category',
      category: 'technology & monitors',
      limit: 5
    }
  );

  const secHomeCategories = await upsertSection(
    'sec-home-categories',
    'Home - 5 Workplace Collections Directory',
    'CategoryPillsGrid',
    {
      title: 'Shop by Workplace Collection',
      subtitle: '5 Commercial Departments',
      categories: [
        { name: 'Furniture & Seating', slug: 'furniture & seating', image: '/images/ergonomic-chair.jpg' },
        { name: 'Monitors & Tech', slug: 'technology & monitors', image: '/images/curved-monitor.jpg' },
        { name: 'Printers & Machines', slug: 'printers & machines', image: '/images/laser-printer.jpg' },
        { name: 'Storage Units', slug: 'storage & organisation', image: '/images/filing-cabinet.jpg' },
        { name: 'Stationery & Desk', slug: 'stationery & supplies', image: '/images/stationery-set.jpg' }
      ]
    }
  );

  // 3. Publish refined Home Page
  await upsertPage('home', 'Home Page', [
    secHomeHero.sys.id,
    secHomeValueProps.sys.id,
    secHomeBestSellers.sys.id,
    secHomeDuals.sys.id,
    secHomeTechShelf.sys.id,
    secHomeCategories.sys.id
  ]);

  console.log('\n Homepage and SDUI blocks have been successfully refined in Contentful!');
}

refineAndPublish().catch(err => {
  console.error('Refine failed:', err);
  process.exit(1);
});

