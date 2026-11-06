import {useState} from "react";
import {logo} from "@/constants/images";
import GeneralFAQModal from "./modals/GeneralFAQModal";
import PreRegisterActions from "@/components/PreRegisterActions";
import PageContainer from "./PageContainer";
import {Link, useLocation} from "react-router-dom";
import {Menu, X} from "lucide-react";

const navLinks = [
  {label: "Home", to: "/"},
  {label: "Partner - Driver", to: "/partner-driver"},
  {label: "Delivery Services", to: "/delivery-services"},
  {label: "About us", to: "/about"},
  {label: "Blog", to: "/blog"},
];

export default function Header() {
  const {pathname} = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header className="md:py-4 py-3 z-50 bg-secondary text-white fixed top-0 left-0 right-0">
        <PageContainer className="flex items-center justify-between md:px-4 ">
          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex gap-2 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Fastmet Logo"
              className="size-8 lg:size-10 object-contain"
            />
            <h1 className="font-bold text-sm lg:text-2xl">FastMet</h1>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14">
            <div className="flex items-center gap-6">
              {navLinks.map(({label, to}) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-semibold transition-colors relative pb-0.5 whitespace-nowrap ${
                    isActive(to)
                      ? "text-yellow-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow-400 after:rounded-full"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:flex hidden items-center gap-2 xl:gap-3 ">
            <PreRegisterActions layout="header" />

            <div className="flex items-center gap-2 ml-2">
              <p className="text-sm font-semibold text-white/80">FAQs</p>
              <GeneralFAQModal />
            </div>
          </div>

          {/* ── Mobile right: FAQs + hamburger ────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-3">
            <GeneralFAQModal />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </PageContainer>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="fixed top-[52px] left-0 right-0 z-40 bg-secondary border-t border-white/10 lg:hidden px-6 py-4 space-y-1">
            {navLinks.map(({label, to}) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between w-full py-3 text-sm font-semibold border-b border-white/10 last:border-0 transition-colors ${
                  isActive(to)
                    ? "text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="size-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}

            <PreRegisterActions
              layout="stacked-mobile"
              shortLabels
              className="lg:hidden mt-10"
            />
          </div>
        </>
      )}
    </>
  );
}
