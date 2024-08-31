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
    <section>
    <div id="select_buttons">
    <button id="select_skills">skills</button>
    <button id="select_info">Operator info</button>
    <button id="select_voicelines">Operator voice lines</button>
    </div>
    <div id="textContent">
        <h3>skills</h3>
        <div id = buttons>
            ${data.skills.map((skills, index) => `<button class="skillButton" id="${index}">${skills.name}</button>`).join('')}
        </div>
        <div id="skills">
            <h5>${data.skills[0].name}</h5>
            <input type="range" value="0" min="1" max="${data.skills[0].variations.length - 1}" name="${data.skills[0].name}" id="skillslider">
            <div class="skills_text"">
                <p>SP Charge Type</p>
                <p>Skill Activation</p>
                <p>Duration</p>
                <p>Initial SP</p>
                <p>SP cost</p>
            </div>
            <section id="skill_info">
            <div class="skills_text">
                <p>${data.skills[0].skill_charge}</p>
                <p>${data.skills[0].skill_activation}</p>
                <p>${data.skills[0].variations[0].duration}</p>
                <p>${data.skills[0].variations[0].initial_sp}</p>
                <p>${data.skills[0].variations[0].sp_cost}</p>
            </div>
            <div>
                <p>${data.skills[0].variations[0].description}</p>
            </div>
            </section>
        </div>
    </div>
    </section>
    `
    modal.append(operatorinfor);

    let skillslider = document.getElementById('skillslider')
    skillslider.addEventListener("input",changeSkillLevel)

   let imgbuttons = document.querySelectorAll('.imgButton')
   imgbuttons.forEach(button =>{
        button.addEventListener("click",changeImg)
    })

    let skillbuttons = document.querySelectorAll('.skillButton')
    skillbuttons.forEach(button =>{
        button.addEventListener("click",changeSkill)
    })
    let skillbuton = document.getElementById('select_skills')
    skillbuton.addEventListener("click",operatorskills)

    let infobutton = document.getElementById('select_info')
    infobutton.addEventListener("click",operatorinfo)

    let voicebutton = document.getElementById('select_voicelines')
    voicebutton.addEventListener("click",voicelines)

    function changeImg(){
        let i = this.id
        let characterImg = document.getElementById('characterImg')
        characterImg.setAttribute('src', data.art[i].link,)
    }

    function changeSkill(){
        let i = this.id
        console.log(i)
        let skills = document.getElementById('skills')
        skills.innerHTML = `
        <h5>${data.skills[i].name}</h5>
            <input type="range" value="0" min="1" max="${data.skills[i].variations.length - 1}" name="${data.skills[i].name}" id="skillslider">
            <div class="skills_text"">
                <p>SP Charge Type</p>
                <p>Skill Activation</p>
                <p>Duration</p>
                <p>Initial SP</p>
                <p>SP cost</p>
            </div>
            <section id="skill_info">
            <div class="skills_text">
                <p>${data.skills[i].skill_charge}</p>
                <p>${data.skills[i].skill_activation}</p>
                <p>${data.skills[i].variations[0].duration}</p>
                <p>${data.skills[i].variations[0].initial_sp}</p>
                <p>${data.skills[i].variations[0].sp_cost}</p>
            </div>
            <div>
                <p>${data.skills[i].variations[0].description}</p>
            </div>
            </section>
        `
        let skillslider = document.getElementById('skillslider')
        skillslider.addEventListener("input",changeSkillLevel)
    }

    function changeSkillLevel(){
        let i = this.value
        console.log(i)
        let currentname = this.name
        let id = data.skills.findIndex(({ name }) => name == currentname);  
        skillinfo = document.getElementById('skill_info')
        skillinfo.innerHTML =`
            <div class="skills_text">
                <p>${data.skills[id].skill_charge}</p>
                <p>${data.skills[id].skill_activation}</p>
                <p>${data.skills[id].variations[i].duration}</p>
                <p>${data.skills[id].variations[i].initial_sp}</p>
                <p>${data.skills[id].variations[i].sp_cost}</p>
            </div>
            <div>
                <p>${data.skills[id].variations[i].description}</p>
            </div>
        `
    }
    function operatorskills(){
        let box = document.getElementById('textContent')
        box.innerHTML= `
        <h3>skills</h3>
        <div id = buttons>
            ${data.skills.map((skills, index) => `<button class="skillButton" id="${index}">${skills.name}</button>`).join('')}
        </div>
        <div id="skills">
            <h5>${data.skills[0].name}</h5>
            <input type="range" value="0" min="1" max="${data.skills[0].variations.length - 1}" name="${data.skills[0].name}" id="skillslider">
            <div class="skills_text"">
                <p>SP Charge Type</p>
                <p>Skill Activation</p>
                <p>Duration</p>
                <p>Initial SP</p>
                <p>SP cost</p>
            </div>
            <section id="skill_info">
            <div class="skills_text">
                <p>${data.skills[0].skill_charge}</p>
                <p>${data.skills[0].skill_activation}</p>
                <p>${data.skills[0].variations[0].duration}</p>
                <p>${data.skills[0].variations[0].initial_sp}</p>
                <p>${data.skills[0].variations[0].sp_cost}</p>
            </div>
            <div>
                <p>${data.skills[0].variations[0].description}</p>
            </div>
            </section>
        </div>
        `
        let skillslider = document.getElementById('skillslider')
        skillslider.addEventListener("input",changeSkillLevel)

        let skillbuttons = document.querySelectorAll('.skillButton')
        skillbuttons.forEach(button =>{
            button.addEventListener("click",changeSkill)
        })
    }

    function operatorinfo(){
        let box = document.getElementById('textContent')
        const info = Object.entries(data.lore);
            box.innerHTML=`
                <h3>Biography</h3>
                <p>${data.biography}</p>
                <h4> affiliation: ${data.affiliation[0]}
                <h4>Infto</h4>
                <ul>
                ${info.map((i) => `<li>${i[0]}: ${i[1]}</li>`).join('').replace(/_/g, " ")}
                </ul>
            `
    }

    function voicelines(){
        let box = document.getElementById('textContent')
        const entries = Object.entries(data.voicelines);
        slicenumber = entries.length/7
        slicearray=[]
        buttonarray =[1,2,3,4,5,6,7];
        for (let i = 0; i<entries.length; i+=slicenumber){
            const chunk = entries.slice(i, i + slicenumber);
            slicearray.push(chunk);
        }
        console.log(slicearray)
        //insert voice line then use join to get rid of , and then replace all _ with a space via the use of regex
        box.innerHTML=`
        <h2> voice lines </h2>
        <div id='selected_voice_lines'>
        ${slicearray[0].map((voicelines) => `<p>${voicelines[0]}: ${voicelines[1]}</p>`).join('').replace(/_/g, " ")}
        </div>
        <div id='voice_line_bt'>
        ${buttonarray.map((numbers) => `<button class="voiceButton" id="${numbers-1}">${numbers}</button>`).join('')}
        </div>
        `
        let voiceButtons = document.querySelectorAll('.voiceButton')
        voiceButtons.forEach(button =>{
            button.addEventListener("click", () =>voice_selctor(slicearray, button.id))
        })
    }

    function voice_selctor(slicearray, i){
        console.log(i)
        let box = document.getElementById('selected_voice_lines')
        box.innerHTML =`
        ${slicearray[i].map((voicelines) => `<p>${voicelines[0]}: ${voicelines[1]}</p>`).join('').replace(/_/g, " ")}
        `
    }
}



