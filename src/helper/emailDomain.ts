export const ALLOWED_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "icloud.com"];

export function isAllowedEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && ALLOWED_EMAIL_DOMAINS.includes(domain);
}
