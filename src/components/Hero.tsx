import Image from "next/image";
import React from "react";
import ProfileImage from "public/images/profile.png";
import Link from "next/link";
function Hero() {
  return (
    <section className="flex flex-col justify-between text-left sm:flex-row">
      <div className="flex flex-col items-center justify-center w-1/2 ">
        <h2 className="mt-2 text-3xl font-bold">{"Hi!, I'm kwonBeomJun"}</h2>
        <h3>Frontend Engineer</h3>
        <p>새로운것을 배우는게 즐거운 개발자</p>
        <Link href="/contact">
          <button className="px-8 py-4 mt-4 font-bold text-white bg-black rounded-full">
            CONTACT ME
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center w-1/2 max-w-full ">
        <Image
          src={ProfileImage}
          alt="Picture of the author"
          width={360}
          height={360}
          className="rounded-full "
          priority
        />
      </div>
    </section>
  );
}

export default Hero;
