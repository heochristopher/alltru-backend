import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(`${process.env.DB}`).then(() => { console.log('connected to mongo') })

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})