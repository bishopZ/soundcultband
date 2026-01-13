export interface SEOMetadata {
  title: string;
  author: string;
  description: string;
  image: string;
  url: string;
}

// Default SEO metadata for the application
export const defaultSEO: SEOMetadata = {
  title: 'Soundcult',
  author: 'Soundcult',
  description: 'Official website for Soundcult band',
  image: 'https://soundcultband.com/og-image.jpg',
  url: 'https://soundcultband.com',
};

// Helper function to merge custom SEO data with defaults
export const getSEO = (custom: Partial<SEOMetadata> = {}): SEOMetadata => ({
  ...defaultSEO,
  ...custom,
});

