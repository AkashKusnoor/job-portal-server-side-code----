//pakage imports
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

//file imports
import connectDB from './config/db.js';

//routes import
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middelwares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRouter.js';
import userRoutes from './routes/userRoutes.js';




//Dot env config
dotenv.config();

//mongoDB connection
connectDB();


//port
const PORT = process.env.PORT || 8100



//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))


//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes)





//validation Middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan.white);
})