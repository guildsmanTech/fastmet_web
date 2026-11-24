import { expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SupportContactText from "@/components/SupportContactText";

it("displays the official support address as a highlighted email link", () => {
  const html = renderToStaticMarkup(<SupportContactText />);
  expect(html).toContain('href="mailto:support@fastmet.com.ph"');
  expect(html).toContain(">support@fastmet.com.ph</a>");
  expect(html).toContain("font-semibold underline");
});
