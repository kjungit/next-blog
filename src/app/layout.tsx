import Header from "@/components/Header";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "케이준의 블로그",
    template: " 케이준의 블로그 | %s",
  },
  description: "프론트엔드 개발자 케이준의 블로그입니다.",
  icons: {
    favicon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full mx-auto max-w-screen-2xl">
        <Header></Header>
        <main className="grow">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
