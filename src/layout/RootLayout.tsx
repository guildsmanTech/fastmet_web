import Header from "@/components/Header";
import RewardModal from "@/components/modals/RewardModal";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SharedFooter from "@/components/SharedFooter";
import {Outlet, useLocation} from "react-router-dom";

export default function RootLayout() {
  const {pathname} = useLocation();

  const hideRewardModal =
    pathname.startsWith("/legal") || pathname.startsWith("/blog");
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
