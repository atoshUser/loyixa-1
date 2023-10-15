import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Success = () => {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <BsFillCheckCircleFill
          className={`w-[30px] h-[30px]  md:w-[50px] md:h-[50px] lg:h-[80px] lg:w-[80px] xl:h-[100px] xl:w-[100px] text-green-500`}
        />
        <h2 className="text-[18px] mt-[10px] md:mt-[15px] md:text-[22px] lg:text-[35px] font-bold capitalize">
          Subscription Completed
        </h2>
        <Link href={"/"}>
          <button className="py-[5px] px-[8px] md:py-[10px] md:px-[15px] transition duration-300 mt-[10px] bg-green-400 transform active:scale-125">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
