import {useRegistrationCounts} from "@/hooks/useRegistrationQueries";
import {Truck, User} from "lucide-react";
import {SocialIcon} from "react-social-icons";

export default function SharedFooter() {
  const {data: counts} = useRegistrationCounts();

  return (
    <footer className="bg-secondary flex flex-col items-center gap-8 w-full py-3 md:py-5">
      <h2 className="text-primary text-sm font-semibold md:text-xl text-center">
        "The future of your drive starts with one click. Pre-register."
      </h2>

      <div className="flex flex-col items-center gap-8 md:flex-row md:divide-x">
        {/* Statistics */}
        <div className="flex flex-col md:flex-row gap-5 items-center lg:gap-10">
          <div className="grid grid-cols-2 place-items-center">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white font-medium text-xs lg:text-sm">
                Pre-Registered Drivers
              </p>
              <div className="flex items-center gap-2">
                <div className="p-1.5 border border-primary bg-white rounded-md w-fit">
                  <Truck className="fill-primary text-secondary lg:size-7" />
                </div>
                <p className="text-white font-bold">{counts?.drivers ?? 0}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <p className="text-white font-medium text-xs lg:text-sm">
                App Users
              </p>
              <div className="flex items-center gap-2">
                <div className="p-1.5 border border-primary bg-white rounded-md w-fit">
                  <User className="fill-primary text-secondary lg:size-7" />
                </div>
                <p className="text-white font-bold">{counts?.users ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-white text-sm font-medium">Follow us on</p>

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
              url="https://www.tiktok.com/@yourpage"
              className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full 
                 hover:scale-110 hover:shadow-lg transition-all duration-300"
              style={{width: 36, height: 36}}
              target="_blank"
            />
          </div>
        </div>
      </div>

      <p className="text-white text-xs md:text-sm">
        © 2026 FastMet. All rights reserved.
      </p>
    </footer>
  );
}
