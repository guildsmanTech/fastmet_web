export type BlogTag =
  | "Announcement"
  | "Drivers"
  | "Users"
  | "Guide"
  | "Updates";

// Card fields only — used in blog list
export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string;
  tag: BlogTag;
  featured?: boolean;
  readTime: number;
  createdAt: string;
}

// Full post — used in blog detail
export interface IBlogPostDetail extends IBlogPost {
  content: string;
  cta?: {
    label: string;
    url: string;
    title: string;
    description: string;
  };
  relatedPosts: IBlogPost[];
}
