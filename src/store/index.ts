import { IMovie } from "@/interface/movie.app";
import { create } from "zustand";

interface IinfoState {
  modal: boolean;
  movie: IMovie;
  setModal: (bool: boolean) => void;
  setCurrentMovie: (data: IMovie) => void;
}

export const UseMovieStore = create<IinfoState>()((set) => ({
  modal: false,
  movie: {} as IMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setCurrentMovie: (data: IMovie) =>
    set((state) => ({ ...state, movie: data })),
}));
