import React, { useContext } from "react";

import Image from "next/image";
import { Button } from "@mui/material";
import { useState } from "react";
import { RiVipCrownFill, RiHourglassLine } from "react-icons/ri";
import { BiSolidCameraMovie } from "react-icons/bi";
import { ISubCard } from "./subCard.props";
import { DiCodeigniter } from "react-icons/di";
import { useAuth } from "@/hooks/useAuth";
import AuthContextProvider, { AuthContext } from "@/context/auth.context";
const SubCard = ({ product }: ISubCard): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const onSubmitSubscription = async (priceId: string) => {
    const payload = { email: user?.email, priceId };
    setIsLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      window.open(data.subscription.url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={` ${
        product.name == "Pro"
          ? "md:h-[450px] lg:h-[480px] xl:h-[550px]"
          : "h-[450px] xl:h-[520px]"
      } flex flex-col pb-[10px] pt-[20px]  px-[15px]  bg-white/20 rounded-xl transform lg:hover:scale-105 transition duration-500  cursor-pointer `}
    >
      <h2
        className={`uppercase text-red-400 mb-[5px]    md:mb-[10px] font-semibold ${
          product.name == "Pro" &&
          "border-[2px] rounded-xl w-[120px] py-[3px] md:py-[6px] text-center"
        }`}
      >
        {product.name}
      </h2>
      <div className="h-[250px]  relative rounded-xl overflow-hidden">
        <img
          className="object-cover w-full absolute h-full object-left"
          src={product.images}
          alt="sub-starter-image"
        />
        <span className="p-[5px] md:p-[8px] rounded-br-xl  text-[16px] md:text-[20px] font-semibold w-[100px] text-center  bg-white/50 absolute top-0 left-0">
          {(product.default_price.unit_amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <div className="mt-[5px] mb-[10px] md:mt-[10px] border-[2px] border-white/70" />
      <button
        disabled={isLoading}
        onClick={() => onSubmitSubscription(product.default_price.id)}
        className={`p-[5px] hover:opacity-70 transition duration-300 md:p-[10px] bg-red-500 font-semibold ${
          isLoading && `opacity-50`
        }`}
      >
        {isLoading ? "Loading..." : "Buy Plan"}
      </button>
      <div className="flex flex-col mt-[10px] space-y-[5px] md:space-y-[10px]">
        {product.metadata.adv.split(", ").map((text, id) => (
          <div
            key={text}
            className="flex items-center space-x-[10px] md:space-x-[15px] "
          >
            {id == 0 && <RiVipCrownFill className="w-6 h-6 text-white" />}
            {id == 1 && <RiHourglassLine className="w-6 h-6 text-white" />}
            {id == 2 && product.name == "Premium" && (
              <DiCodeigniter className="w-6 h-6 text-white" />
            )}
            {id == 2 && product.name !== "Premium" && (
              <BiSolidCameraMovie className="w-6 h-6 text-white" />
            )}
            {id == 3 && <BiSolidCameraMovie className="w-6 h-6 text-white" />}
            <span>{text}</span>
          </div>
        ))}
      </div>
    </li>
  );
};

export default SubCard;
