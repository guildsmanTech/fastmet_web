import {useEffect} from "react";
import UserForm from "@/components/register/UserForm";
import InfoUser from "@/components/register/InfoUser";

export default function UserRegisterAppView() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="flex justify-center items-center px-4 min-h-screen">
      <div className="grid grid-cols-1 gap-10 items-center pb-10 xl:w-full lg:grid-cols-2">
        <div className="bg-[#F2F5FA] hidden fixed z-[-10] top-0 bottom-0 lg:w-1/2 lg:block left-0" />
        <InfoUser />
        <UserForm />
      </div>
    </section>
  );
}
