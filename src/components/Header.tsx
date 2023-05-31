import Link from "next/link";
import React from "react";
import ProfileImage from "public/images/profile.png";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 ">
      <Link href="/">
        <h1 className="text-3xl font-bold">{"Kjun Blog"}</h1>
      </Link>
      <nav className="flex items-end justify-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      <Link href="/contact">
        <Image
          src={ProfileImage}
          alt="Picture of the author"
          width={50}
          height={50}
          className="border-4 border-gray-500 rounded-full"
        />
      </Link>
    </header>
  );
}

export default Header;
