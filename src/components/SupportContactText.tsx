import { SUPPORT_EMAIL } from "@/helper/constant";

export default function SupportContactText() {
  return (
    <p className="text-sm leading-relaxed text-secondary">
      Need help? Contact{" "}
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="font-semibold underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
      >
        {SUPPORT_EMAIL}
      </a>
      .
    </p>
  );
}
