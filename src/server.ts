import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/db'
import router from './router'
dotenv.config()

connectDB()

const app = express()

app.use(morgan('dev')) 
app.use(express.json())

app.use('/api/streaming', router)

export default app