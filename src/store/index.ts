import { IMovie } from "@/interface/movie.app";
import { create } from "zustand";

interface IinfoState {
  modal: boolean;
  movie: IMovie;
}

const useInfoStore = create<IinfoState>()((set) => ({
  modal: false,
  movie: {} as IMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setMovie: (data: IMovie) => set((state) => ({ ...state, movie: data })),
}));
