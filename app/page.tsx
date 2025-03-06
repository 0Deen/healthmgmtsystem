import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[696px]">
          <div className="flex items-center space-x-4 pb-6">
            <Image
              src="/assets/icons/logo.jpg"
              height={100}
              width={100}
              alt="patient"
              className="w-fit"
            />
            <h1 className="text-36-bold flex">Primetchee</h1>
          </div>
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Primetchee
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
            <Link href="" className="text-green-500">
              Visit our Site
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
