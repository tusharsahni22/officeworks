require('dotenv').config();
const { createClient } = require('contentful-management');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!spaceId || !managementToken) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in server/.env');
  process.exit(1);
}

const client = createClient({ accessToken: managementToken }, { type: 'plain' });

async function setup() {
  console.log(`Connecting to Contentful Space: ${spaceId}, environment: ${environmentId}...`);

  // 1. Check/Update Content Type: Section
  let sectionType;
  try {
    sectionType = await client.contentType.get({ spaceId, environmentId, contentTypeId: 'section' });
    console.log('Found existing "section" Content Type. Updating displayField and fields...');
    sectionType.displayField = 'internalTitle';
    // ensure internalTitle field is present
    const hasInternalTitle = sectionType.fields.some(f => f.id === 'internalTitle');
    if (!hasInternalTitle) {
      sectionType.fields.unshift({
        id: 'internalTitle',
        name: 'Internal Title',
        type: 'Symbol',
        required: false
      });
    }
    sectionType = await client.contentType.update({ spaceId, environmentId, contentTypeId: 'section' }, sectionType);
    await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'section' }, sectionType);
  } catch (err) {
    console.log('Creating "section" Content Type...');
    sectionType = await client.contentType.createWithId(
      { spaceId, environmentId, contentTypeId: 'section' },
      {
        name: 'Section',
        description: 'SDUI Component Block',
        displayField: 'internalTitle',
        fields: [
          {
            id: 'internalTitle',
            name: 'Internal Title',
            type: 'Symbol',
            required: false
          },
          {
            id: 'componentType',
            name: 'Component Type',
            type: 'Symbol',
            required: true,
            validations: [{ in: ['HeroBanner', 'ProductShelf', 'DualFeaturette', 'CategoryPillsGrid'] }]
          },
          {
            id: 'props',
            name: 'Props',
            type: 'Object',
            required: true
          }
        ]
      }
    );
    await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'section' }, sectionType);
  }
  console.log(' Content Type "Section" published.');

  // 2. Check/Update Content Type: Page
  let pageType;
  try {
    pageType = await client.contentType.get({ spaceId, environmentId, contentTypeId: 'page' });
    console.log('Found existing "page" Content Type.');
  } catch (err) {
    console.log('Creating "page" Content Type...');
    pageType = await client.contentType.createWithId(
      { spaceId, environmentId, contentTypeId: 'page' },
      {
        name: 'Page',
        description: 'SDUI Dynamic Page Router',
        displayField: 'title',
        fields: [
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'slug',
            name: 'Slug',
            type: 'Symbol',
            required: true,
            validations: [{ unique: true }]
          },
          {
            id: 'sections',
            name: 'Sections',
            type: 'Array',
            items: {
              type: 'Link',
              linkType: 'Entry',
              validations: [{ linkContentType: ['section'] }]
            }
          }
        ]
      }
    );
    await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'page' }, pageType);
  }
  console.log(' Content Type "Page" published.');

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
        { spaceId, environmentId, contentTypeId: 'section', entryId },
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
    console.log(` Created & published section: "${internalTitle}"`);
    return entry;
  }

  // 3. Create Sections for "deals"
  const sec1 = await upsertSection(
    'sec-deals-hero',
    'Hero - Workstation Flash Sale',
    'HeroBanner',
    {
      tag: 'Commercial Clearance 2026',
      headline: 'Workstation Flash Sale',
      subtitle: 'Up to 30% off commercial ergonomic seating, electric sit-stand desks, and high-resolution displays.',
      ctaText: 'View Deals',
      ctaLink: '/category/furniture%20%26%20seating',
      image: '/images/standing-desk.jpg'
    }
  );

  const sec2 = await upsertSection(
    'sec-deals-bestsellers',
    'Shelf - Top Clearance Picks (Featured)',
    'ProductShelf',
    {
      title: 'Top Clearance Picks (Featured)',
      viewAllText: 'Explore All Furniture',
      viewAllLink: '/category/furniture%20%26%20seating',
      mode: 'featured',
      limit: 5
    }
  );

  const sec3 = await upsertSection(
    'sec-deals-duals',
    'Featurette - Desks & Curved Monitors',
    'DualFeaturette',
    {
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
  );

  const sec4 = await upsertSection(
    'sec-deals-tech',
    'Shelf - Monitors & Hardware Offers',
    'ProductShelf',
    {
      title: 'Monitors & Hardware Offers',
      viewAllText: 'View All Monitors',
      viewAllLink: '/category/technology%20%26%20monitors',
      mode: 'category',
      category: 'technology & monitors',
      limit: 5
    }
  );

  // 4. Create or Update the "deals" page
  let dealsPage;
  const pages = await client.entry.getMany({
    spaceId,
    environmentId,
    query: { content_type: 'page', 'fields.slug': 'deals' }
  });

  const sectionLinks = [
    { sys: { type: 'Link', linkType: 'Entry', id: sec1.sys.id } },
    { sys: { type: 'Link', linkType: 'Entry', id: sec2.sys.id } },
    { sys: { type: 'Link', linkType: 'Entry', id: sec3.sys.id } },
    { sys: { type: 'Link', linkType: 'Entry', id: sec4.sys.id } }
  ];

  if (pages.items && pages.items.length > 0) {
    dealsPage = pages.items[0];
    dealsPage.fields.title = { 'en-US': 'Deals & Clearance' };
    dealsPage.fields.slug = { 'en-US': 'deals' };
    dealsPage.fields.sections = { 'en-US': sectionLinks };
    dealsPage = await client.entry.update({ spaceId, environmentId, entryId: dealsPage.sys.id }, dealsPage);
  } else {
    dealsPage = await client.entry.create(
      { spaceId, environmentId, contentTypeId: 'page' },
      {
        fields: {
          title: { 'en-US': 'Deals & Clearance' },
          slug: { 'en-US': 'deals' },
          sections: { 'en-US': sectionLinks }
        }
      }
    );
  }

  await client.entry.publish({ spaceId, environmentId, entryId: dealsPage.sys.id }, dealsPage);
  console.log(' Published Page: "deals" (/pages/deals)');

  console.log('\n Setup completed! All content models and the "deals" page are live in Contentful.');
}

setup().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
