import {useEffect} from "react";
import Header from "@/components/Header";
import RewardModal from "@/components/modals/RewardModal";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SharedFooter from "@/components/SharedFooter";
import {preloadRecaptchaV3} from "@/lib/recaptchaV3";
import {Outlet, useLocation} from "react-router-dom";

export default function RootLayout() {
  const {pathname} = useLocation();

  // Load v3 with ?render= before SPA pages inject v2, so Get Quote works
  // without a hard refresh after navigating from home/forms.
  useEffect(() => {
    preloadRecaptchaV3();
  }, []);

  const hideRewardModal =
    pathname.startsWith("/legal") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/delete-account") ||
    pathname.startsWith("/subscription");
  return (
    <div className="relative">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <SharedFooter />

      {hideRewardModal ? <ScrollToTopButton /> : <RewardModal />}
    </div>
  );
}
