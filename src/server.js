import express from 'express'
import { CONNECT_DB, GET_DB } from './configs/mongodb'
import 'dotenv/config'
import { corsMiddleware } from './configs/cors'
import http from 'http'
import { Server } from 'socket.io'
import { APIs_v1 } from './routes/v1'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { socket } from './socket/socket'

const START_SERVER = () => {
  const app = express()
  const server = http.createServer(app)
  app.use(corsMiddleware)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use('/api/v1', APIs_v1)
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found'
    })
  })
  // lang nghe socket
  const io = new Server(server, {
    cors: {
      origin: `${process.env.APP_PORT}`
    }
  })
  // cac ham xu ly socket
  socket(io)
  // bat dau lang nghe port cua server(phai chay truoc khi lang nghe socket) khong phai app.listen
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}

(async () => {
  try {
    await CONNECT_DB()
    START_SERVER()
    await GET_DB()
    console.log('Connected to database successfully')
  }
  catch (error) {
    console.log('Error when starting server: ', error)
  }
})()