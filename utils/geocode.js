const http = require("postman-request")
const token = "pk.eyJ1IjoiYWxpc3NvbmRhdmlzIiwiYSI6ImNreGdpajV6MDRhNWczMnBsNzdiOW40aDkifQ.S_NDP99ylGOK_kYCnFMhng"


const geocode = async(address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`

    await http(url, { json: true }, (err, res, body) => {
    try {
        
       callback(undefined,{
           local : body.features[0].place_name,
           latitude : +body.features[0].center[1],
           longitude : +body.features[0].center[0]
       })
    } catch (err) {
        callback(err, undefined)
    }

})

}


module.exports = geocode