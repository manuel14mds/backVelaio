import * as fs from 'fs';
import __dirname from '../utils.js';
const path = `${__dirname}/files/users.json`

class UserManager{
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

    getByEmail = async(email) =>{
        try {
            let users = await this.getAll()
            let user = users.find((user)=>user.email = email)
            return user
        } catch (error) {
            console.log('getProductById',error)
        }
    }
}

export default UserManager;
