import { Router } from 'express'
import ArticleManager from '../managers/article.manager.js'


const router = Router()
const apikey = '391e946c71f340afbc167a64e83bb2ef'
const urlAll = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apikey}`

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