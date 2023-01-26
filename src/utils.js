import { fileURLToPath } from 'url'
import { dirname } from 'path'
import config from '../config/config.js'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const encodeJWT = (entity)=>{
    let token = jwt.sign({user:entity}, config.app.JWTSecret, {expiresIn:config.app.JWTExpire})
    return token
}
const decodeJWT = (token)=>{
    try {
        let user = jwt.verify(token, config.app.JWTSecret)
        return user
    } catch (error) {
        return false
    }
    
}
const verifyJWT = (token, user)=>{
    let entityUncoded = jwt.verify(token, config.app.JWTSecret)
    if(!entityUncoded)return null
    if(entityUncoded.id === user.id){
        return true
    }else{
        return false
    }
}
const destroyJWT = (token)=>{
    try {
        jwt.verify(token, 'wrong-secret')
    } catch (error) {
        return true
    }
}

export {
    encodeJWT, 
    decodeJWT,
    verifyJWT,
    destroyJWT,
}
export default __dirname