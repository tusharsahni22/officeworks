import React from 'react';
import HeroBanner from './HeroBanner';
import ProductShelf from './ProductShelf';
import DualFeaturette from './DualFeaturette';
import CategoryPillsGrid from './CategoryPillsGrid';

// Registry maps SDUI block types (from CMS or local JSON) to React components
export const ComponentRegistry = {
  HeroBanner,
  ProductShelf,
  DualFeaturette,
  CategoryPillsGrid
};

export const renderSection = (section, index) => {
  if (!section || !section.type) return null;
  const Component = ComponentRegistry[section.type];

  if (!Component) {
    console.warn(`[SDUI] No matching component registered for type: ${section.type}`);
    return null;
  }

  return <Component key={section.id || `section-${index}`} {...section.props} />;
};

export default ComponentRegistry;

