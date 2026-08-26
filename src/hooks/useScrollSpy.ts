import {useEffect, useState} from "react";

export function useScrollSpy(ids: string[], offset = 120): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const idsKey = ids.join("\0");

  useEffect(() => {
    const sectionIds = idsKey ? idsKey.split("\0") : [];
    if (!sectionIds.length) return;

    const handleScroll = () => {
      let current: string | null = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }

      // Last section may never cross the offset line when the page ends early.
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const atBottom =
        scrollTop + clientHeight >= document.documentElement.scrollHeight - 1;
      if (atBottom) {
        const lastId = sectionIds[sectionIds.length - 1];
        const lastEl = document.getElementById(lastId);
        if (lastEl && lastEl.getBoundingClientRect().top - offset > 0) {
          current = lastId;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});
    window.addEventListener("hashchange", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [idsKey, offset]);

  return activeId;
}
