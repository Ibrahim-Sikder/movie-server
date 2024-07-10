import { z } from "zod";


const createMovieValidationSchema = z.object({

        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        releaseDate: z.string().optional(),
        genre: z.string().min(1, { message: "Genre is required" }),
        slug: z.string().min(1, { message: "Slug is required" }),
        isDeleted: z.boolean().optional().default(false),
        viewCount: z.number().optional().default(0),
        totalRating: z.number().optional().default(0),

});



export const MovieValidationSchema = {
    createMovieValidationSchema,
}