# Dev Deen

# <a name="introduction">🤖 Introduction</a>

A healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors, featuring administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.

If you're getting started and need assistance or face any bugs, join our active Discord community with over **34k+** members. It's a place where people help each other out.
<br>

# Registration Page

<<<<<<< HEAD
![These is the registration page](public/po.jpg)

# Scheduling Appointment Page

![These is the page for scheduling appointment](public/pop.jpg)

# Success Page

![These is the success page](public/p.jpg)

=======

![These is the registration page](public/po.jpg)

# Scheduling Appointment Page

![These is the page for scheduling appointment](public/pop.jpg)

# Success Page

![These is the success page](public/p.jpg)

> > > > > > > 42e7857 (commit)

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

.............
## <a name="features">🔋 Features</a>

👉 **Register as a Patient**: Users can sign up and create a personal profile as a patient.

👉 **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.

👉 **Manage Appointments on Admin Side**: Administrators can efficiently view and handle all scheduled appointments.

👉 **Confirm/Schedule Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled.

👉 **Cancel Appointment from Admin Side**: Administrators have the ability to cancel any appointment as needed.

👉 **Send SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.

👉 **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.

👉 **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app using Appwrite storage services.

👉 **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone
cd
```

**Installation**

Install the project dependencies using npm:

```bash
npm install

messaging tool use Twilio
Twilio = https://www.twilio.com/en-us/messaging/channels/sms
Twilio Recovery code = 44D62JKWB2548SKNHCMGS4VX


Database i used cloud Appwrite = https://cloud.appwrite.io/

Error checking and issues handling i used senry
 sentry.io
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
NEXT_PUBLIC_ADMIN_PASSKEY=29292929
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

git clone https://github.com/01Deen/healthmgmtsystem

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
