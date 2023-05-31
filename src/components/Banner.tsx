import React from "react";

export type BannerDate = {
  message: string;
  state: "success" | "error";
};

function Banner({ banner: { message, state } }: { banner: BannerDate }) {
  const isSuccess = state === "success";
  const icon = isSuccess ? "✅" : "❌";
  return (
    <p
      className={`p-4 ${
        isSuccess ? "bg-green-300" : "bg-red-300"
      } rounded-md absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold`}
    >{`${icon} ${message}`}</p>
  );
}

export default Banner;
