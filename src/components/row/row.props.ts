import { IMovie } from "@/interface/movie.app";

export interface IRow {
  movie: IMovie[];
  title: string;
  isBig: boolean;
  isFirst: boolean;
}
