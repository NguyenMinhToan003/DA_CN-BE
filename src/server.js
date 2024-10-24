import express from 'express'
import { CONNECT_DB, GET_DB } from './configs/mongodb'
import 'dotenv/config'
import { APIs_v1 } from './routes/v1'
const app = express()

app.use('/api/v1', APIs_v1)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, async () => {
  await CONNECT_DB()
  await GET_DB()
  console.log(`Server is running on ${process.env.PORT}`)
})