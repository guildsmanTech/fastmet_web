import {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
      aria-label="Scroll to top"
      className="fixed bottom-6 cursor-pointer right-6 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg hover:bg-primary-hover transition-colors"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
