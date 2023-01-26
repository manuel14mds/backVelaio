import { decodeJWT } from '../utils.js'

const loginValidater = async (req, res, next) => {

    try {
        const { authorization } = req.headers
        let token = authorization.split(" ")[1]
        if (!authorization || !token) return res.status(401).send({error:'unauthorizated'});

        let userData = decodeJWT(token)
        if (!userData) return res.status(401).send({error:'unauthorizated'});
        
        req.user = userData.user
        req.user.token = token
        next()
    } catch (error) {
        return res.status(500).send({error:'server error'});
    }
    
}
export default loginValidater
