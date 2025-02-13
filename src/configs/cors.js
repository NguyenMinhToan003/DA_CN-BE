import cors from 'cors'
import 'dotenv/config'
const corsOptions = {
  origin: process.env.APP_PORT,
  credentials: true
}

export const corsMiddleware = cors(corsOptions)
