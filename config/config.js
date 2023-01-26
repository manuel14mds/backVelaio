import dotenv from 'dotenv'

export default {
    app:{
        PORT:process.env.PORT||8080,
        JWTSecret:"ScretJWT",
        JWTExpire:"2h"
    }
}