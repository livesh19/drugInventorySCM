import express from 'express'
import { NotFoundError } from '../error/not-found-error.js'

const router = express.Router()

router.get('/employee', async(req,res) => {
    const id = 1
    if (id === 1) {
        throw new NotFoundError()
    }
    res.status(200).json('hello')
})


export default router