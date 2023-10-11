import { IconButton, Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { AuthContext } from "@/context/auth.context";
const Header = () => {
  const [scroll, setScroll] = useState<boolean>(false);
  const { logOut } = useContext(AuthContext);
  const windowScrolled = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", windowScrolled);

    return () => window.removeEventListener("scroll", windowScrolled);
  }, []);

  return (
    <header className="max-w-[1480px] z-50 left-0 right-0 top-0  mx-auto  fixed w-full">
      <div
        className={`flex items-center justify-between transition-all ease-out duration-300  py-[15px] px-[20px] md:py-[18px] md:px-[20px] ${
          scroll && "bg-red-600 rounded-lg"
        }`}
      >
        <div className="flex items-center md:space-x-8">
          <Image
            src={`/site-logo.svg`}
            alt="site-logo-img"
            width={50}
            height={50}
            className="cursor-pointer hover:opacity-70 "
          />
          <ul className="hidden md:flex items-center space-x-2 md:space-x-4 font-medium">
            <li className="hover:opacity-50 cursor-pointer text-[15px]  md:text-[20px] lg:text-[22px]">
              Home
            </li>
            <li className="hover:opacity-50 cursor-pointer text-[15px] md:text-[20px] lg:text-[22px]">
              Movies
            </li>
            <li className="hover:opacity-50 whitespace-nowrap cursor-pointer text-[15px] md:text-[20px] lg:text-[22px]">
              TV shows
            </li>
            <li className="hover:opacity-50 cursor-pointer text-[15px] md:text-[20px] lg:text-[22px]">
              Now
            </li>
            <li className="hover:opacity-50 cursor-pointer text-[15px] md:text-[20px] lg:text-[22px]">
              Popular
            </li>
          </ul>
        </div>
        <ul className="flex items-center space-x-3 md:space-x-5">
          <li>
            <IconButton aria-label="search-icon" sx={{ color: "white" }}>
              <HiOutlineSearch />
            </IconButton>
          </li>
          <li>
            <Button
              sx={{ color: "white", border: "1px solid white", padding: "2px" }}
            >
              Kids
            </Button>
          </li>
          <li>
            <IconButton aria-label="bell-icons" sx={{ color: "white" }}>
              <AiOutlineBell />
            </IconButton>
          </li>
          <li>
            <IconButton aria-label="account-icons" sx={{ color: "white" }}>
              <VscAccount />
            </IconButton>
          </li>
          <li>
            <IconButton
              onClick={logOut}
              aria-label="logOut-icon"
              sx={{ color: "white" }}
            >
              <LuLogOut />
            </IconButton>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
