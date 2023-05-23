const express = require( "express" )
const cors = require( "cors" )
const cookie_parser = require( "cookie-parser" )
const mongoose = require('mongoose')

const router = require("./router/index")
require( "dotenv" ).config( )

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookie_parser())
app.use(cors())

//когда в постмане отправляете запрос приложение смотрит какой роутер в1`ы хотите
//использовать после этого переходим в файлик роутера
app.use("/api", router)

const start = async() => {
    try {
        //await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
        app.listen(port, () => {
            console.log("SERVER STARTED AT PORT " + port)
        })

    } catch(e) {
        console.log(e)
    }
}

start();