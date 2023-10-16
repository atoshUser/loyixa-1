import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { BiSolidErrorAlt } from "react-icons/bi";
const Cancel = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <BiSolidErrorAlt
          className={`w-[30px] h-[30px]  md:w-[50px] md:h-[50px] lg:h-[80px] lg:w-[80px] xl:h-[100px] xl:w-[100px] text-red-500`}
        />
        <h2 className="text-[18px] mt-[10px] md:mt-[15px] md:text-[22px] lg:text-[35px] font-bold capitalize">
          Something went wrong
        </h2>
        <Link href={"/"}>
          <button className="py-[5px] px-[8px] md:py-[10px] md:px-[15px] transition duration-300 mt-[10px] bg-red-500/60 transform active:scale-125">
            Buy Plan
          </button>
        </Link>
      </div>
      e
    </div>
  );
};

export default Cancel;
