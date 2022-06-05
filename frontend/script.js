//extragem inputul utilizatorului
var urlInput = document.getElementById('urlInput')
var button = document.getElementById('btn')
//verificare URL cand se apasa butonul
button.addEventListener('click', checkURL)


//functie validare URL
function checkURL() {
  let ok = 0
  if (
    ( urlInput.value.startsWith('http://') ||
      urlInput.value.startsWith('https://')) &&
    (urlInput.value.endsWith('.com') || urlInput.value.endsWith('.ro'))
  )
    {
      //daca url e valid se apeleaza functia de obtinere a url-ului scurt
      //apoi se apeleaza functia de afisare a url-ului scurt
      ok=1
      getShort(urlInput.value).then(shortUrl=>{
        
        showShortUrl(shortUrl)
      })

    }
    // daca url e invalid se genereaza mesaj de eroare
    if(ok==0) alert("Adresa URL invalida! Adresa trebuie sa inceapa cu http:// sau https:// si sa se termine cu .ro sau .com");
}
//trimite cerere la server si obtine un json
async function getShort(url)
{ //
  const response = await fetch('/shorten', {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify({'url':url}) 
  });
  return response.json();

}
//functie de afisare a url-ului scurt 
function showShortUrl(shortUrl){
  //retinem toate elementele care trebuie ascunse 
  allAddUrlComponents=document.getElementsByClassName("addUrlComponents")
 
  for(var i=0;i < allAddUrlComponents.length;i++){
    //ascundem elementele
    allAddUrlComponents[i].hidden=true;
  }
    document.getElementById("shortUrlText").hidden=false;
        document.getElementById("countVisits").hidden=false;
        
  document.getElementById("shortUrl").innerHTML="localhost:3000/shortUrl/"+shortUrl.shortUrl;
    document.getElementById("shortUrl").href="/shortUrl/"+shortUrl.shortUrl;
      document.getElementById("countVisits").innerHTML+=shortUrl.count;


}