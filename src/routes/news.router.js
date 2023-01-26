import { Router } from 'express'
import ArticleManager from '../managers/article.manager.js'
import config from '../../config/config.js'


const router = Router()
const urlAll = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${config.app.newsKey}`

const articleService = new ArticleManager()

router.get('/', async (req,res)=>{
    try {
        fetch(urlAll)
        .then(response => response.json())
        .then(data => {
            articleService.save(data.articles)
            res.send(data)
        })
        .catch(()=>res.send("Coudn't show"))

    } catch (error) {
        res.status(500).send('server error')
    }
    
})

router.get('/:title', async (req,res)=>{
    try {
        const title = req.params.title
        if(title){
            let data = await articleService.getByTittle(title)
            console.log(data)
            res.send({article:data})
        }else{
            res.status(400).send({message:'invalid title', error:'Bad Request'})
        }
    } catch (error) {
        res.status(500).send({message:'server error', error:error})
    }
})

export default router