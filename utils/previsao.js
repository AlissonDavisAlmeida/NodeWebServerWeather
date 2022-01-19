const http = require("postman-request")
const ApiKey = "27cfe439fec21edef0193dbfe9e0ce11"

const forecast = async(latitude, longitude, callback)=>{
   
   await http(`http://api.weatherstack.com/current?access_key=27cfe439fec21edef0193dbfe9e0ce11&query=${latitude},${longitude}`,{json:true},(err, res, body)=>{
       
        if (err) {
            callback("Não foi possível conectar-se à Api",undefined)
        } else {
            if (res.body.error) {
            callback("Não foi possível encontrar a localização",undefined)
            }else{
    
                callback(undefined, `A temperatura atual em ${body.location.name} é de ${body.current.temperature} graus
                com sensação térmica de ${body.current.feelslike} graus`)
            }
        }
    })
}


module.exports = forecast