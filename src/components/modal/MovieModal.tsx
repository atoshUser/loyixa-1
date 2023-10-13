import { IMovieTrailer } from "@/interface/movie.app";
import { UseMovieStore } from "@/store";
import { IconButton, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiFillLike } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";

import ReactPlayer from "react-player";
const MovieModal = () => {
  const { modal, setModal, movie } = UseMovieStore();
  const [movieTrailer, setMovieTrailer] = useState<IMovieTrailer>(
    {} as IMovieTrailer
  );

  const handleClose = () => {
    setModal(false);
  };

  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const api_key = process.env.NEXT_PUBLIC_API_KEY;

  const getVideo = async () => {
    const movieData = await fetch(
      `${base_url}/${movie.media_type == "tv" ? "tv" : "movie"}/${
        movie.id
      }/videos?api_key=${api_key}&language=en-US`
    ).then((res) => res.json());

    getMovieTreilerFromArrayData(movieData.results);
  };

  const getMovieTreilerFromArrayData = (movie: IMovieTrailer[]) => {
    const getIndexTreilerFromArray = movie.findIndex(
      (item) => item.type === "Trailer"
    );
    setMovieTrailer(movie[getIndexTreilerFromArray]);
  };

  useEffect(() => {
    getVideo();
  }, [movie]);

  return (
    <Modal open={modal} onClose={handleClose}>
      <div className="h-full flex justify-center items-center">
        <div className=" w-full h-[500px] md:w-[1200px]  lg:h-[600px] bg-red-500 rounded-xl overflow-hidden flex flex-col scrollbar-hide overflow-y-scroll ">
          <div className="relative  w-full h-[300px]  md:h-[95%] flex-shrink-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieTrailer?.key}`}
              width={"100%"}
              height={"100%"}
              muted={true}
              controls={true}
              playing
            />
            <div className="absolute top-[-15px] right-[-10px]">
              <IconButton
                aria-label="icon-close-trailer"
                sx={{ color: "white" }}
                size="large"
                onClick={handleClose}
              >
                <AiOutlineCloseCircle />
              </IconButton>
            </div>
          </div>
          <div className="h-[300px] w-full flex-shrink-0 bg-[#141414]">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Tooltip title="Save " color="white">
                  <IconButton
                    aria-label="add-movie-trailer"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <IoAdd />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Like">
                  <IconButton
                    aria-label="icon-like-hand"
                    size="large"
                    sx={{ color: "white" }}
                  >
                    <AiFillLike />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center pl-[20px] gap-[8px] md:gap-[15px]">
                  <span className="font-semibold text-green-400">
                    {movie.vote_average * 10}% Match
                  </span>
                  <span className="font-light">{movie.release_date}</span>
                  <span className="py-[3px] px-[5px] md:py-[5px] md:px-[10px] rounded-xl border-[1px] bg-[#242428] border-white  text-white">
                    HD
                  </span>
                </div>
                <p className="pl-[20px] text-[15px] md:text-[18px] font-semibold max-w-[280px] md:max-w-[500px] lg:max-w-[800px]">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
