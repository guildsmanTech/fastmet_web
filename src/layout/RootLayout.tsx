import Header from "@/components/Header";
import RewardModal from "@/components/modals/RewardModal";
import ScrollToTop from "@/components/ScrollToTop";
import SharedFooter from "@/components/SharedFooter";
import {Outlet} from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="relative">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <SharedFooter />

      <RewardModal />
    </div>
  );
}
