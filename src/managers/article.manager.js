import * as fs from 'fs';
import __dirname from '../utils.js';
const path = `${__dirname}/files/articles.json`

class ArticleManager{
    save = async(newsList) =>{
        try {
            await fs.promises.writeFile(path,JSON.stringify(newsList, null, '\t'))
            return true
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let articles = JSON.parse(fileData)
                return articles
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    getByTittle = async(title) =>{
        try {
            let articles = await this.getAll()
            let article = articles.find((article)=>article.title = title)
            return article
        } catch (error) {
            console.log('getProductById',error)
        }
    }
}

export default ArticleManager;
