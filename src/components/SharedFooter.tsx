import {useRegistrationCounts} from "@/hooks/useRegistrationQueries";
import {Truck, User} from "lucide-react";
import {SocialIcon} from "react-social-icons";
import PageContainer from "@/components/PageContainer";
import {Link} from "react-router-dom";

export default function SharedFooter() {
  const {data: counts} = useRegistrationCounts();

  return (
    <footer className="w-full bg-secondary">
      <PageContainer className="flex flex-col gap-8 items-center py-3 md:py-5">
        <h2 className="text-sm font-semibold text-center text-white md:text-xl">
          Need it <span className="text-primary">Fast</span>? Consider it{" "}
          <span className="text-primary">Met</span>. Pre-register now!
        </h2>

        <div className="flex flex-col gap-8 items-center md:flex-row md:divide-x">
          {/* Statistics */}
          <div className="flex flex-col gap-5 items-center md:flex-row lg:gap-10 md:pr-5">
            <div className="grid grid-cols-2 gap-5 place-items-center">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-xs font-medium text-white lg:text-sm">
                  Pre-Registered Drivers
                </p>
                <div className="flex gap-2 items-center">
                  <div className="p-1.5 border border-primary bg-white rounded-md w-fit">
                    <Truck className="fill-primary text-secondary lg:size-7" />
                  </div>
                  <p className="font-bold text-white">{counts?.drivers ?? 0}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <p className="text-xs font-medium text-white lg:text-sm">
                  Pre-Registered Users
                </p>
                <div className="flex gap-2 items-center">
                  <div className="p-1.5 border border-primary bg-white rounded-md w-fit">
                    <User className="fill-primary text-secondary lg:size-7" />
                  </div>
                  <p className="font-bold text-white">{counts?.users ?? 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3 items-center">
            <p className="text-sm font-medium text-white">Follow us on</p>

            <div className="flex gap-3">
              <SocialIcon
                url="https://www.facebook.com/profile.php?id=61585768732620"
                className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full 
                   hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{width: 36, height: 36}}
                target="_blank"
              />

              <SocialIcon
                url="https://www.instagram.com/fastmetph?igsh=aDB2c2lmY2djNzUy&utm_source=qr"
                className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full 
                   hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{width: 36, height: 36}}
                target="_blank"
              />

              <SocialIcon
                url="https://www.tiktok.com/@fastmet0"
                className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full 
                   hover:scale-110 hover:shadow-lg transition-all duration-300"
                style={{width: 36, height: 36}}
                target="_blank"
              />
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Legal row — its own section, visually separated */}
      <PageContainer className="flex items-center justify-center gap-1.5 py-4 text-xs mb-7 text-white/60">
        <Link
          to="/legal/privacy-policy/user"
          className="transition-colors hover:text-primary"
        >
          Privacy Policy
        </Link>
        <span className="text-white/25">💠</span>
        <Link
          to="/legal/terms/user"
          className="transition-colors hover:text-primary"
        >
          Terms & Conditions
        </Link>
      </PageContainer>

      <div className="pb-3 md:pb-5">
        <p className="text-xs text-center text-white md:text-sm">
          © 2026 FastMet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
