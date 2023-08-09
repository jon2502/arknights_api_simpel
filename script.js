const container = document.getElementById('container')
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

function generatetiles(data){
    console.log(data)
    for ( objects of data) {
        console.log(objects.name)
        let name = objects.name
        const button = document.createElement('li')
        button.classList.add('grid')
        button.innerHTML = `
        <div class="op-image">
            <img src = "${objects.art[0].link}"
        </div>
        <div>${objects.name}<div>
        `
        if(objects.rarity === 6){
            button.style.backgroundColor = 'rgb(255, 102, 0)'
        } else if (objects.rarity === 5){
            button.style.backgroundColor = 'rgb(255, 174, 0)'
        } else if (objects.rarity === 4){
            button.style.backgroundColor = 'rgb(219, 177, 219)'
        }else if (objects.rarity === 3){
            button.style.backgroundColor = 'rgb(0, 178, 246)'
        }else if (objects.rarity === 2){
            button.style.backgroundColor = '#dce53'
        }else{
            button.style.backgroundColor = 'rgb(159, 159, 159)'
        }
        button.addEventListener('click', () =>{
            displaySelectedOperator(name);
        })
        container.appendChild(button)
}
}

function displaySelectedOperator(name){
    console.log(name)
    fetch(`${URL2}${name}`)
    .then((response) => response.json())
      .then((data) => {
       generateDisplay(data)
       })
}

//generate display for spesifick opperator info
function generateDisplay(data) {
    console.log(data)
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.prepend(overlay);

    // Modal div
    let modal = document.createElement('div');
    modal.classList.add('modal');
    overlay.append(modal);

    // Close artist info button
    let closeBtn = document.createElement('button');
    closeBtn.innerText = "X";
    modal.append(closeBtn);
    closeBtn.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    })

    // operator info
    let operatorinfor = document.createElement('section');
    operatorinfor.innerHTML = `
    <div>
        <h2>${data.name}</h2>
    </div>
    <div id = "imageAndButtons">
        <div id = buttons>
            ${data.art.map((art,index) => `<button class="button" id="${index}">${art.name}</button>`).join('')}
        </div>
        <div id = "modalImage">
            <img id = "characterImg" src = "${data.art[0].link}"
        </div>
    </div>
    `
    modal.append(operatorinfor);

    let buttons = document.querySelectorAll('.button')
    buttons.forEach(button =>{
        button.addEventListener("click",changeImg)
    })

    function changeImg(){
        i = this.id
        let characterImg = document.getElementById('characterImg')
        characterImg.setAttribute('src', data.art[i].link)
        console.log(characterImg)
    
    }
}



