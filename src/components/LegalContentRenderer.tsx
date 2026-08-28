import {Link} from "react-router-dom";
import type {LegalContent} from "@/types/legal";
import {slugify} from "@/utils/slugify";

interface Props {
  content: LegalContent;
}

export default function LegalContentRenderer({content}: Props) {
  return (
    <article>
      {content.sections.map((section, i) => {
        const [num, ...rest] = section.heading.split(". ");
        const label = rest.join(". ") || section.heading;
        const id = slugify(section.heading);

        return (
          <section
            key={i}
            id={id}
            className="relative mt-10 first:mt-0 scroll-mt-28"
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold leading-none select-none text-primary/30">
                {num.padStart(2, "0")}
              </span>

              <h2 className="text-base font-semibold text-secondary">
                {label}
              </h2>
            </div>

            <div className="pl-1 space-y-3 text-sm leading-relaxed text-gray-600">
              {section.blocks.map((block, j) => {
                if (block.type === "subheading") {
                  return (
                    <h3
                      key={j}
                      className="pt-2 pl-3 text-sm font-semibold border-l-2 text-secondary/90 border-primary"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul
                      key={j}
                      className="pl-5 space-y-1 list-disc marker:text-primary/60"
                    >
                      {block.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "p") {
                  return (
                    <p key={j}>
                      {block.content
                        ? block.content.map((item, k) =>
                            typeof item === "string" ? (
                              item
                            ) : (
                              <Link
                                key={k}
                                to={item.href}
                                className="text-primary underline underline-offset-2 hover:opacity-80"
                              >
                                {item.text}
                              </Link>
                            ),
                          )
                        : block.text}
                    </p>
                  );
                }

                return null;
              })}
            </div>
          </section>
        );
      })}
    </article>
  );
}
