import Hero from "@/components/Hero";
import React from "react";

export const metadata = {
  title: "About me",
  description: "케이준 소개 페이지입니다.",
};

function AboutPage() {
  return (
    <>
      <Hero />
      <section className="p-8 m-8 text-center bg-gray-100 shadow-lg ">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p>React, Node</p>
      </section>
    </>
  );
}

export default AboutPage;
