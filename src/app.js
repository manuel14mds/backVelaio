import express from 'express'
import newsRouter from './routes/news.router.js'
import sessionsRouter from './routes/session.router.js'
import config from '../config/config.js'

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Velaio Challeng')
})
app.use('/api/sessions', sessionsRouter)
app.use('/api/news', newsRouter)
app.listen(config.app.PORT,()=>console.log('running on 8080 port'))
