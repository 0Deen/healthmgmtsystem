"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";

// Update getAppointmentSchema to include timeZone
const getAppointmentSchema = (type: "create" | "schedule" | "cancel") => {
  return z.object({
    primaryPhysician: z.string().nonempty("Primary physician is required"),
    schedule: z.date(),
    reason: type !== "cancel" ? z.string().nonempty("Reason is required") : z.string().optional(),
    note: z.string().optional(),
    cancellationReason: type === "cancel" ? z.string().nonempty("Cancellation reason is required") : z.string().optional(),
    timeZone: z.string().nonempty("Time zone is required"), // Include timeZone in the schema
  });
};

export const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule!) : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
      timeZone: appointment?.timeZone || "America/New_York", // Add default timeZone
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
          timeZone: values.timeZone, // Include timeZone when creating an appointment
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate: UpdateAppointmentParams = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
            timeZone: values.timeZone, // Include timeZone when updating an appointment
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Appointment reason"
              placeholder="Annual monthly check-up"
              disabled={type === "schedule"}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Comments/notes"
              placeholder="Prefer afternoon appointments, if possible"
              disabled={type === "schedule"}
            />
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="timeZone"
          label="Time Zone"
          placeholder="Select your time zone"
        >
          <SelectItem value="Africa/Nairobi">Africa/Nairobi</SelectItem>
          <SelectItem value="America/New_York">America/New_York</SelectItem>
          <SelectItem value="Europe/London">Europe/London</SelectItem>
          <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
          <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
          <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
          <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
          <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
          <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
          <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
          <SelectItem value="America/Chicago">America/Chicago</SelectItem>
          <SelectItem value="America/Denver">America/Denver</SelectItem>
          <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
          <SelectItem value="Asia/Hong_Kong">Asia/Hong_Kong</SelectItem>
          <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
          <SelectItem value="Africa/Cairo">Africa/Cairo</SelectItem>
          <SelectItem value="America/Sao_Paulo">America/Sao_Paulo</SelectItem>
          <SelectItem value="Asia/Seoul">Asia/Seoul</SelectItem>
          <SelectItem value="Europe/Amsterdam">Europe/Amsterdam</SelectItem>
          <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
          <SelectItem value="Europe/Zurich">Europe/Zurich</SelectItem>

          {/* Add more time zones as needed */}
        </CustomFormField>

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
