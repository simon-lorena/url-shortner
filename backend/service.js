const { MongoClient, ServerApiVersion } = require('mongodb')
//uri conectare 
const uri = process.env.URLSHORTMONGOAPI
console.log(uri)
module.exports.getUrlObject = async function (url) {
  //create new client
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  //connect to mongodbserver
  await client.connect()

  //select collection
  const collection = await client.db('proiectdsw').collection('urls')
  const dbUrl = await collection.findOne({ url: url })
  //verify if the url exists
  var urlExists = false
  if (dbUrl != null) urlExists = true
  console.log(dbUrl)
  if (urlExists) {
    await client.close()
    //daca exista se trimite obiectul din db
    return dbUrl
  } else {
    //daca nu exista se trimite obiectul creat
    var shortUrl = generateShortUrl()
    var myObj = { url: url, shortUrl: shortUrl, count: 0 }
    await collection.insertOne(myObj)
    await client.close()
    return myObj
  }

}
//functie de generare url scurt
function generateShortUrl() {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
//functie de cautare url scurt in db; trimite inapoi adresa url; se incrementeaza count-ul;
module.exports.findUrl = async function (shortUrl) {
  //create new client
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  //conncet to mongodbserver
  await client.connect()

  //select collection
  const collection = await client.db('proiectdsw').collection('urls')
  const databaseUrl = await collection.findOne({ shortUrl: shortUrl })

  await collection.updateOne({ shortUrl: shortUrl },{$inc:{count:1}})
  await client.close()
  console.log(databaseUrl)
  return databaseUrl.url
}
