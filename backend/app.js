
//controller aplicatie
//folosim libraria express
const express = require('express')
//pentru interactiunea cu files si directory
const path = require('path')
//pentru folosirea service
const service = require("./service.js");
//pentru pornirea aplicatiei
const app = express()
const port = 3000
//pentru folosirea frontend 
app.use(express.static('../frontend'))
//pentru folosire date json
app.use(express.json());

//trimiterea paginii index.html
app.get('/', (req, res)=>{
 res.sendFile('../frontend/index.html')

})
//primeste url lung si trimite un obiect cu toate datele 
app.post('/shorten',(req,res) =>{
 service.getUrlObject(req.body.url).then(e=>{return res.json(e)})
 
})
//redirectioneaza catre url-ul extern 
app.get('/shortUrl/:generatedShortURL', function(req, res) {

  var shortURL=req.params.generatedShortURL;
  service.findUrl(shortURL).then(e=>{return res.redirect(e)});

})
app.listen(port,()=>{
 console.log(`Server listening on port:${port}`)
})
