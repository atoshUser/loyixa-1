import React from "react";
import { IRow } from "./row.props";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import { Card } from "..";
const Row = ({ movie, title, isBig, isFirst }: IRow) => {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [moved, setMoved] = useState<number>(0);

  const handliClick = (data: "right" | "left") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;

      const carouselData =
        data == "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({
        left: carouselData,
        behavior: "smooth",
      });
      if (data == "left") {
        if (moved == 0) {
          return;
        } else {
          setMoved((pre) => pre - 1);
        }
      } else {
        setMoved((pre) => pre + 1);
      }
    }
  };
  return (
    <div className={`${isFirst && ` top-[-110px] lg:top-[-130px]`} relative `}>
      <div className="flex flex-col mb-[20px] md:mb-[30px]">
        <h2 className="text-[18px] pl-[10px] md:pl-[15px] mb-[5px] md:mb-[10px] lg:mb-[20px] lg:pl-[20px] md:text-[25px] lg:text-[30px]">
          {title}
        </h2>
        <div className="relative group w-full  flex items-center   ">
          <div className="absolute z-30 left-0">
            <IconButton
              aria-label="icon-left-player"
              className={` transition-all duration-300 text-[20px] md:text-[30px] lg:text-[40px] ${
                moved == 0 ? `opacity-0` : "opacity-100"
              } `}
              sx={{ color: "white" }}
              onClick={() => handliClick("left")}
            >
              <TbPlayerSkipBackFilled />
            </IconButton>
          </div>
          <ul
            ref={carouselRef}
            className="flex overflow-y-hidden overflow-x-scroll  space-x-2  scrollbar-hide md:space-x-5 lg:pl-[15px]"
          >
            {movie.map((card) => {
              return <Card movie={card} key={card.id} isBig={isBig} />;
            })}
          </ul>
          <div className="absolute  z-30 right-0">
            <IconButton
              aria-label="icon-right-player"
              className=" transition-all duration-300  text-[20px] md:text-[30px] lg:text-[40px] opacity-0 group-hover:opacity-100"
              sx={{ color: "white" }}
              onClick={() => handliClick("right")}
            >
              <TbPlayerSkipForwardFilled />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
