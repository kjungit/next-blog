import ContactForm from "@/components/ContactForm";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { SiTistory } from "react-icons/si";

export const metadata = {
  title: "Contact me",
  description: "케이준에게 메일 보내기",
};

const LINKS = [
  { icon: <BsGithub />, href: "https://github.com/kjungit" },
  { icon: <SiTistory />, href: "https://codeno-te.tistory.com/" },
];

function ContactPage() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="my-2 text-3xl font-bold">Contact Me</h2>
      <p>kjun_all@naver.com</p>
      <ul className="flex justify-center gap-4 my-2">
        {LINKS.map(({ icon, href }) => (
          <a
            key={href}
            className="mx-2 text-3xl hover:text-blue-400"
            href={href}
            target="_blank"
          >
            {icon}
          </a>
        ))}
      </ul>
      <h2 className="my-8 text-3xl font-bold">Or Send me an Email</h2>
      <ContactForm />
    </section>
  );
}

export default ContactPage;
