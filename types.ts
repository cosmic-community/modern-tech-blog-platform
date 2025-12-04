// TypeScript type definitions for Cosmic objects

interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    published_date?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    job_title?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}