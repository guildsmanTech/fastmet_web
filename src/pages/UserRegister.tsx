import {useEffect} from "react";
import {ChevronLeft} from "lucide-react";
import UserForm from "@/components/register/UserForm";
import InfoUser from "@/components/register/InfoUser";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="flex justify-center items-center px-4 min-h-screen">
      <Button
        onClick={() => navigate("/")}
        variant="ghost"
        className="absolute left-3 top-20 z-10 cursor-pointer md:top-25"
      >
        <ChevronLeft className="text-primary size-7 lg:scale-150" />
      </Button>
      <div className="grid grid-cols-1 gap-10 items-center pt-20 pb-10 xl:w-full lg:grid-cols-2 md:pt-25 lg:pt-30">
        <div className="bg-[#F2F5FA] hidden fixed z-[-10] top-0 bottom-0 lg:w-1/2 lg:block left-0" />
        <InfoUser />
        <UserForm />
      </div>
    </section>
  );
}
