export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export const toAbsoluteUrl = (path: string) => (/^https?:\/\//i.test(path) ? path : `${SITE_URL}${path}`);

export const DEFAULT_AVATAR =
  "/avatar.svg";

export const PLACEHOLDER_IMAGE = "/placeholder.png";

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  category: (slug: string) => `/products?category=${encodeURIComponent(slug)}`,
  articles: "/articles",
  article: (idOrSlug: string) => `/articles/${encodeURIComponent(idOrSlug)}`,
  cart: "/cart",
  favorites: "/favorites",
  about: "/about",
  contact: "/contact-us",
  rules: "/rules",
  login: "/login-register",
  forgotPassword: "/forgot-password",
  dashboard: {
    home: "/dashboard",
    orders: "/dashboard/orders",
    tickets: "/dashboard/tickets",
    ticket: (id: string) => `/dashboard/tickets/${id}`,
    comments: "/dashboard/comments",
    favorites: "/dashboard/favorites",
    profile: "/dashboard/detail-profile",
  },
} as const;
