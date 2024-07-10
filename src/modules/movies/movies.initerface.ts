/* eslint-disable no-unused-vars */
import { Model } from "mongoose";



export type TMovie = {
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  slug: string;
  viewCount: number;
  isDeleted?: boolean;
  totalRating:number;
};

export interface TMovideMethods {
  createSlug(payload:TMovie): string;
}

export type TMovieModel = Model<TMovie,Record<string, unknown>, TMovideMethods>;

