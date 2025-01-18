import express from 'express'
import 'dotenv/config'
const app = express()
app.use(express.json())

import { router } from './routes/v1/index'

const PORT = process.env.PORT ?? 3000

app.use('/v1', router)

app.listen(PORT, () => {
	console.log(`Server is serving at ${PORT}`)
}).on("error", (err) => {
	console.log(err)
})
