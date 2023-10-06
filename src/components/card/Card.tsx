import React from "react";
import { ICard } from "./card.props";
import Image from "next/image";
import { image_base_url } from "@/helper/constant";
import ReactStars from "react-stars";

const Card = ({ movie, isBig = false }: ICard) => {
  return (
    <li
      className={`${
        isBig
          ? "w-[180px] h-[250px] md:w-[220px] md:h-[330px] lg:w-[350px] lg:h-[430px]"
          : `w-[150px] h-[180px] md:w-[220px] md:h-[250px] lg:w-[280px] lg:h-[350px]`
      } relative flex-shrink-0 flex transition duration-300 flex-col cursor-pointer hover:scale-105 overflow-hidden rounded-lg`}
    >
      <div className="absolute w-full  h-full">
        <Image
          src={`${image_base_url}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 w-full p-[8px] md:py-[15px] md:px-[10px]">
        <div>
          <ReactStars
            edit={false}
            count={10}
            size={15}
            value={movie.vote_average}
            color1="white"
          />
        </div>
        <h3 className="font-bold text-[15px] md:text-[22px] lg:text-[25px]">
          {movie?.title || movie?.original_title || movie?.name}
        </h3>
      </div>
    </li>
  );
};

export default Card;
