import express from 'express'
import { CONNECT_DB, GET_DB } from './configs/mongodb'
import 'dotenv/config'
const app = express()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(process.env.PORT, async () => {
  await CONNECT_DB()
  await GET_DB()
  console.log(`Server is running on ${process.env.PORT}`)
})
// user :nguyentoan040003
// pass :IRbX3c3ObnI3cSnD
// uri : mongodb+srv://nguyentoan040003:IRbX3c3ObnI3cSnD@cluster0.ljlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0