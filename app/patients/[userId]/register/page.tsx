import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view", user.name);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 Primetchee</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
