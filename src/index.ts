import express from 'express'

import getConfig from './config/config'
import user from './routes/user'
import question from './routes/question'
import answer from './routes/answer'

const port: number = parseInt(process.env.PORT!, 10) || 8080
const app = express()

app.listen(port, () => {
  console.log(`> Ready on ${getConfig().server.host}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

console.log('init middleware')

app.use('/user', user)
app.use('/question', question)
app.use('/answer', answer)

console.log('init router')

app.get('/', (_, res) => {
  res.send('Hello World! : ' + process.env.NODE_ENV)
})
