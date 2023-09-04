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

//generate all operator
function generatetiles(data){
    console.log(data)
    for ( objects of data) {
        console.log(objects.name)
        let name = objects.name
        const button = document.createElement('li')
        button.classList.add('grid')
        button.innerHTML = `
        <div class="op-image">
            <img src = "${objects.art[0].link}">
            ${objects.name}
        </div>
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

    // Close operator info button
    let closeBtn = document.createElement('button');
    closeBtn.innerText = "X";
    modal.append(closeBtn);
    closeBtn.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    })

    // operator info
    let operatorinfor = document.createElement('section');
    operatorinfor.id = "operatorinfor"
    operatorinfor.innerHTML = `
    <div id = "imageAndButtons">
        <h2>${data.name}</h2>
        <div id = buttons>
            ${data.art.map((art,index) => `<button class="imgButton" id="${index}">${art.name}</button>`).join('')}
        </div>
        <div id = "modalImage">
            <img id = "characterImg" src = "${data.art[0].link}">
        </div>
    </div>

    <div id = "textContent">
        <h3>Biography</h3>
        <p>${data.biography}</p>
        <h3>skills</h3>
        <div id = buttons>
            ${data.skills.map((skills, index) => `<button class="skillButton" id="${index}>${skills.name}</button>`).join('')}
        </div>
        <div>
            <h5>${data.skills[0].name}</h5>
            <input type="range" value="1" min="1" max="10" name="skillLevel" id="skill0Level" oninput="changeSkillLevel(this,0)" style="margin-top:10px" class=" skillLevelInput">
            <div>
                <p>SP Charge Type</p>
                <p>Skill Activation</p>
                <p>Duration</p>
            </div>
            <section>
            <div>
                <p>${data.skills[0].skill_charge}</p>
                <p>${data.skills[0].skill_activation}</p>
                <p>${data.skills[0].variations[0].duration}</p>
            </div>
            <div>
                <p></p>
                <p></p>
            </div>
            </section>
        </div>
    </div>
    `
    modal.append(operatorinfor);

    let imgbuttons = document.querySelectorAll('.imgButton')
   imgbuttons.forEach(button =>{
        button.addEventListener("click",changeImg)
    })

    let skillbuttons = document.querySelectorAll('.skillButton')
    skillbuttons.forEach(button =>{
        button.addEventListener("click",changeSkill)
    })

    function changeImg(){
        let i = this.id
        console.log(i)
        let characterImg = document.getElementById('characterImg')
        characterImg.setAttribute('src', data.art[i].link,)
        console.log(characterImg)
    
    }

    function changeSkill(){
        let i = this.id

    }

    function changeSkillLevel(){
        
    }
}



