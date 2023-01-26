import Router from 'express'
import config from '../../config/config.js'

const router = Router()
const url = `https://api.openweathermap.org/data/2.5/weather?id=3687925&appid=${config.app.weatherKey}&units=metric`

router.get('/', (req, res) => {
    try {
        fetch(url)
            .then(response => response.json())
            .then(data => res.send(data))
            .catch(() => res.status(500).send("Coudn't show"))
    } catch (error) {
        return res.status(500).send({error:'server error'})
    }

})

export default router