"use client";

import React, { FormEvent } from "react";
import Banner, { BannerDate } from "./Banner";
import { sendContactEmail } from "@/Service/contact";

type Form = {
  email: string;
  subject: string;
  message: string;
};

const INPUT_STYLE = "p-2 text-black";
const DEFAULT_DATA = {
  email: "",
  subject: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = React.useState<Form>(DEFAULT_DATA);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [banner, setBanner] = React.useState<BannerDate | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendContactEmail(form)
      .then(() => {
        setBanner({
          message: "정상적으로 전송되었습니다. 😀",
          state: "success",
        });
        setForm(DEFAULT_DATA);
      })
      .catch(() => {
        setBanner({
          message: "전송에 실패했습니다. 😥",
          state: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };

  return (
    <>
      {banner && <Banner banner={banner} />}

      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-md gap-2 p-4 m-4 text-white shadow-2xl bg-slate-700 rounded-xl"
      >
        <label htmlFor="email" className="font-semibold">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoFocus
          value={form.email}
          onChange={onChange}
          className={INPUT_STYLE}
        />
        <label htmlFor="subject" className="font-semibold">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
          className={INPUT_STYLE}
        />
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          rows={10}
          className={INPUT_STYLE}
        />
        <button className="py-2 my-2 font-bold bg-yellow-300 text-slate-700 hover:bg-yellow-500">
          Submit
        </button>
      </form>
    </>
  );
}

export default ContactForm;
