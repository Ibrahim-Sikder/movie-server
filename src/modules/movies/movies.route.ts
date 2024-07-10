/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { MovieController } from './movie.controller';
import { ReviewControllers } from '../review/review.controller';
import { AnyZodObject } from 'zod';
import { MovieValidationSchema } from './movie.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();



router.post('/', validateRequest(MovieValidationSchema.createMovieValidationSchema), MovieController.createMovie)
router.get('/', MovieController.getAllMovies)
router.get('/:movieId', MovieController.getSingleMovies)
router.get('/:slug', MovieController.getMovieBySlug);
router.post("/:slug/review", ReviewControllers.addReview);


// router.get("/:slug/reviews", ReviewControllers.getAllReviews);
// router.put("/:slug/review", ReviewControllers.getReviewById);
// router.delete("/:slug/review", ReviewControllers.deleteReview);


export const MoviesRoutes = router