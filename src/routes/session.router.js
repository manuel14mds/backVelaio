import {Router} from 'express'
import UserManager from '../managers/user.manager.js'
import { encodeJWT, destroyJWT } from '../utils.js'
import authUser from '../middelwares/authUser.js'

const router = Router()
const userService = new UserManager()

router.post('/login', async (req,res)=>{

    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).send({error:'bad request'})
        }else{
            let user = await userService.getByEmail(email)
            if(!user || user.password != password){
                return res.status(401).send({error:'Unauthorized'})
            }
            delete user.password
            let token = encodeJWT(user)
            res.send({message:'logged successfull', user, token})
        }
    } catch (error) {
        return res.status(500).send({error:'server error'})
    }
    
})

router.get('/logout', authUser, async (req,res)=>{
    try {
        let result = destroyJWT(req.user.token)
        console.log(result)
        return res.send({message:'Log-out Successfully!'})
    } catch (error) {
        return res.status(500).send({error:'server error'})
    }
})
export default router