import React, { useEffect, useState } from "react";
import { IHero } from "./hero.props";
import { IMovie } from "@/interface/movie.app";
import Image from "next/image";
import { image_base_url } from "@/helper/constant";
import ReactStars from "react-stars";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { Button } from "@mui/material";
import { UseMovieStore } from "@/store";
const Hero = ({ movie }: IHero) => {
  const [selected, setSelected] = useState<IMovie>({} as IMovie);
  const { setModal, setCurrentMovie } = UseMovieStore();
  const randomMovie = (data: IMovie[]) => {
    const randomData = data[Math.floor(Math.random() * data.length)];
    setSelected(randomData);
  };

  const handleOpenModal = () => {
    setModal(true);
    setCurrentMovie(selected);
  };

  useEffect(() => {
    randomMovie(movie);
  }, [movie]);
  return (
    <div className="h-screen relative ">
      <div className="absolute w-full h-full -z-30">
        <Image
          src={`${image_base_url}${
            selected?.backdrop_path || selected?.poster_path
          }`}
          fill
          alt={selected.original_title}
          className="object-cover opacity-50"
        />
      </div>
      <div className="absolute p-[20px]  top-[200px] left-[20px] md:top-[260px] md:left-[50px] lg:top-[280px]">
        <div className="flex flex-col">
          <div className="w-[120px] flex mb-[5px] md:mb-[10px] rounded-bl-lg rounded-tr-lg bg-blue-500/60 capitalize justify-center">
            {selected.media_type}
          </div>
          <div className="flex space-x-4 mb-[10px] items-center">
            <ReactStars
              edit={false}
              size={25}
              count={10}
              color1="white"
              value={selected.vote_average}
            />
            <span>({selected.vote_count})</span>
          </div>
          <h2 className="font-extrabold  max-w-[250px] md:max-w-[400px] lg:max-w-[700px] text-[25px] md:text-[30px] md:leading-[1.1] mb-[10px] md:mb-[18px] lg:mb-[22px] lg:text-[40px] lg:leading-[1.3]">
            {selected.title}
          </h2>
          <p className="max-w-[260px] md:max-w-[380px] mb-[10px] lg:max-w-[680px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptatum ea aut amet earum ad fugit consequuntur ex distinctio
            voluptate. Ratione eum, provident ab,
          </p>
          <div className="w-[150px] p-[1px] md:p-[2.5px] bg-orange-500 rounded-lg">
            <Button
              className="w-full text-white bg-[#141414]"
              startIcon={<TbPlayerPlayFilled />}
              onClick={handleOpenModal}
              sx={{ color: "white" }}
            >
              Watch Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
