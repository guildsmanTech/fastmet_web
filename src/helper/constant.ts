export const API_URL = import.meta.env.VITE_API_URL;
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL as string;

export function getBusinessInquiryMailto() {
  return `mailto:${SUPPORT_EMAIL}`;
}

export const tagColors: Record<string, string> = {
  Announcement: "bg-primary/10 text-primary",
  Drivers: "bg-sky-100 text-sky-700",
  Users: "bg-violet-100 text-violet-700",
  Guide: "bg-green-100 text-green-700",
  Updates: "bg-amber-100 text-amber-700",
};
