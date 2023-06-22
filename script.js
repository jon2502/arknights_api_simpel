
const URL1 = 'https://rhodesapi.up.railway.app/api/operator'
const URL2 ='https://rhodesapi.up.railway.app/api/operator/'

//fetching all operators
function fectch_All (){
    fetch(`${URL1}`)
    .then((response) => response.json())
      .then((data) => {
       generatetiles(data)
       })
}
fectch_All()

function generatetiles(x){
    console.log(x)
    for ( objects of x) {
        console.log(objects)
        fe
}
}