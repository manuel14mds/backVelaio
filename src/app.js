import express from 'express'
import newsRouter from './routes/news.router.js'
const app = express()
let info = {} 
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Velaio Challeng')
})
app.use('/api/news', newsRouter)
app.listen(8080,()=>console.log('running on 8080 port'))

export {
    info
}