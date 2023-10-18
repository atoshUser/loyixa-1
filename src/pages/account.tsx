import { Membership } from "@/components";
import { Subscription } from "@/interface/movie.app";
import { API_REQUEST } from "@/service/service.app";
import { IconButton } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import moment from "moment";
import { useAuth } from "@/hooks/useAuth";
const Account = ({ subscription }: AccountProps) => {
  const { logOut } = useAuth();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Here you can configure your account settings"
        />
        <meta name="viewport" content="width=device-widht, initial-scale=1" />
        <link rel="shortcut icon" href="/site-logo.svg" type="image/x-icon" />
        <title>account settings</title>
      </Head>
      <header>
        <div className="flex items-center justify-between px-[10px] py-[15px] md:px-[25px] md:py-[20px]">
          <Link href={`/`}>
            <Image
              src={`/site-logo.svg`}
              alt="site-logo-image"
              width={80}
              height={80}
            />
          </Link>
          <Link href={`/account`}>
            <IconButton aria-label="user-outline-icon" sx={{ color: "white" }}>
              <AiOutlineUser className={`w-5 h-5 md:w-8 md:h-8 text-white`} />
            </IconButton>
          </Link>
        </div>
      </header>
      <main className="flex flex-col max-w-[1000px] mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row px-[15px]  gap-x-[8px] md:gap-x-[15px]">
            <h2 className="font-bold tracking-[4px] text-[18px] md:text-[22px] lg:text-[30px]">
              Account
            </h2>
            <div className="flex self-start items-center gap-x-[5px] md:gap-x-[10px]">
              <MdOutlineSubscriptions className={`text-red-500`} />
              <span className="text-gray-500">
                Member since
                {moment(subscription.start_date * 1000).format("D,  MMM  YYYY")}
              </span>
            </div>
          </div>
          <Membership subscription={subscription} />
          <div className="flex flex-col px-[10px]">
            <div className="mt-6 grid flex-col md:flex-row grid-cols-1 md:grid-cols-4 border px-2 py-2 md:px-5 md:py-4 border-b-0">
              <h4 className="text-gray-600 text-lg md:text-xl">Plan details</h4>
              <div className="col-span-2 font-medium text-xl">Premium</div>
              <div className="cursor-pointer  flex md:justify-end   text-blue-500 hover:text-white/60 hover:underline transition duration-300">
                Change Plane
              </div>
            </div>

            <div className="mt-6 grid flex-col md:flex-row grid-cols-1 md:grid-cols-4 border px-2 py-2 md:px-5 md:py-4 border-b-0">
              <h4 className="text-gray-600 text-lg md:text-xl">Settings</h4>
              <div
                onClick={logOut}
                className="col-span-3 cursor-pointer text-blue-500 hover:underline font-medium text-xl"
              >
                Sign out of all devices
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;

export const getServerSideProps: GetServerSideProps<AccountProps> = async ({
  req,
}) => {
  const user_id = req.cookies.user_id;
  // if (!user_id) {
  //   return {
  //     redirect: { destination: "/auth", permanent: false },
  //   };
  // }

  const subscription_data = await fetch(
    `${API_REQUEST.subscription}/${user_id}`
  ).then((res) => res.json());
  return {
    props: {
      subscription: subscription_data.subscription.data[0],
    },
  };
};
interface AccountProps {
  subscription: Subscription;
}
