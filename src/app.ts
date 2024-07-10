import express, { Application  } from 'express'
import { MoviesRoutes } from './modules/movies/movies.route'
import cors from 'cors'
import { notFound } from './middleware/notFound';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { UserRoutes } from './modules/user/user.route';
import { AuthRoutes } from './modules/auth/auth.route';
const app:Application = express()

//pareser
app.use(express.json());
app.use(cors())


app.use('/api/movies', MoviesRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/auth', AuthRoutes)


app.use(notFound)

app.use(globalErrorHandler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})





export default app;