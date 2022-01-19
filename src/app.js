const express = require("express")
const hbs = require("hbs")
const app = express()
const path = require("path")
const geocode = require("../utils/geocode")
const previsao = require("../utils/previsao")

const caminhoPastaPublica = path.join(__dirname,'../public/assets')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.use(express.static(caminhoPastaPublica))

app.set("view engine","hbs")
app.set("views", viewsPath) 
hbs.registerPartials(partialsPath)

app.get("",(req, res)=>{
    res.render("index.hbs", {
        mensagem : "Texto Vindo do Node Js"
    })
})

app.get("/weather", (req, res)=>{
    const {local} = req.query
    geocode(local, (err, resultado)=>{

        if(err){
           return  res.status(400).json({
                mensagem:"Ocorreu um erro",
                err
            })
        }

        const {latitude, longitude} = resultado

        previsao(latitude, longitude,(err, resultado)=>{


            if(err){
                res.json({
                    mensagem : "Ocorreu um erro",
                    err
                })
            }


            res.json({
                mensagem:"Requisição feita com sucesso",
                resultado
            })

        })

    })
})

app.get("*", (req, res)=>{
    res.render("404.hbs",{
        mensagem : "A página não pode ser encontrada"
    }

    )
})

app.listen(3000, ()=>{
    console.log("Conectado na porta 3000")
})