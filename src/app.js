import express from 'express'
import newsRouter from './routes/news.router.js'
import sessionsRouter from './routes/session.router.js'
import timeRouter from './routes/time.router.js'
import config from '../config/config.js'
import cors from 'cors'
import pino from 'pino'
import __dirname from './utils.js'

const app = express()

const logger = pino({}, pino.multistream([{ level: 'info', stream: pino.destination(__dirname + '/logs.log') }]))

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Velaio Challeng')
    logger.info('Hello Word')
})

const logs = (req,res,next)=>{
    logger.info(`route -> ${req.protocol + '://' + req.get('host') + req.originalUrl} Method: ${req.method}`)
    next()
}

app.use('/api/sessions', logs, sessionsRouter)
app.use('/api/news', logs, newsRouter)
app.use('/api/time', logs, timeRouter)


app.listen(config.app.PORT,()=>console.log('running on 8080 port'))
