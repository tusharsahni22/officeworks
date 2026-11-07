require('dotenv').config();
const { createClient } = require('contentful-management');

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const client = createClient({ accessToken: managementToken }, { type: 'plain' });

async function setupNavigation() {
  console.log(`Setting up Navigation in Contentful Space: ${spaceId}...`);

  // 1. Ensure HeaderNavigation and FooterNavigation are allowed in Section componentType validations
  let sectionType = await client.contentType.get({ spaceId, environmentId, contentTypeId: 'sectionSection' });
  
  const compTypeField = sectionType.fields.find(f => f.id === 'componentType');
  if (compTypeField && compTypeField.validations) {
    compTypeField.validations = [
      {
        in: [
          'HeroBanner',
          'ProductShelf',
          'DualFeaturette',
          'CategoryPillsGrid',
          'ContactFormSection',
          'ValuePropsStrip',
          'HeaderNavigation',
          'FooterNavigation'
        ]
      }
    ];
  }

  sectionType = await client.contentType.update({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  await client.contentType.publish({ spaceId, environmentId, contentTypeId: 'sectionSection' }, sectionType);
  console.log(' Updated Content Type "Section" with navigation types.');

  // Helper to upsert section
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
    console.log(` Published section: "${internalTitle}"`);
    return entry;
  }

  // 2. Create Header Navigation section
  const secHeader = await upsertSection(
    'sec-nav-header',
    'Global Header Navigation Bar',
    'HeaderNavigation',
    {
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
    }
  );

  // 3. Create Footer Navigation section
  const secFooter = await upsertSection(
    'sec-nav-footer',
    'Global Footer Navigation & Columns',
    'FooterNavigation',
    {
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
  );

  // 4. Create/Publish the Page entry for slug: navigation
  let navPage;
  const pages = await client.entry.getMany({
    spaceId,
    environmentId,
    query: { content_type: 'page', 'fields.slug': 'navigation' }
  });

  const sectionLinks = [
    { sys: { type: 'Link', linkType: 'Entry', id: secHeader.sys.id } },
    { sys: { type: 'Link', linkType: 'Entry', id: secFooter.sys.id } }
  ];

  if (pages.items && pages.items.length > 0) {
    navPage = pages.items[0];
    navPage.fields.title = { 'en-US': 'Site Navigation (Header & Footer)' };
    navPage.fields.slug = { 'en-US': 'navigation' };
    navPage.fields.sections = { 'en-US': sectionLinks };
    navPage = await client.entry.update({ spaceId, environmentId, entryId: navPage.sys.id }, navPage);
  } else {
    navPage = await client.entry.create(
      { spaceId, environmentId, contentTypeId: 'page' },
      {
        fields: {
          title: { 'en-US': 'Site Navigation (Header & Footer)' },
          slug: { 'en-US': 'navigation' },
          sections: { 'en-US': sectionLinks }
        }
      }
    );
  }

  await client.entry.publish({ spaceId, environmentId, entryId: navPage.sys.id }, navPage);
  console.log(' Published Page: "Site Navigation (Header & Footer)" in Contentful!');
  console.log('\n Navigation is now fully controlled by Contentful!');
}

setupNavigation().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});

