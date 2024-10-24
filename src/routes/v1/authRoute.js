import express from 'express'
const Router = express.Router()

Router.route('/login')
  .get((req, res) => { console.log('login') })

export const authRoute = Router