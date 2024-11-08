const container = document.getElementById('container')
const URL = 'https://rhodesapi.up.railway.app/api/operator'


// function for fetching API and returning data via recived funcion call
function Fetch(url, functioncall){
    fetch(`${url}`)
    .then((response) => response.json())
      .then((data) => {
       functioncall(data)
       })
}

//fetching all operators
function fectch_All (){
    Fetch(URL,generatetiles)
}
fectch_All()

//generate all operator
function generatetiles(data){
    for (objects of data) {
        let name = objects.name
        const button = document.createElement('li')
        button.classList.add('grid')
            button.innerHTML = `
            <div class="op-image">
                <img src = "${objects.art[0].link}">
                ${objects.name}
            </div>
            `
        // set background color based on character rarity.
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

//display the selected operator
function displaySelectedOperator(name){
    Fetch(`${URL}/${name}`,generateDisplay)
}

//generate display for spesifick opperator info
function generateDisplay(data) {
    console.log(data)
    // get all buttons and set their display to none as to not remove them but make them not visible
    const btns = document.querySelectorAll('.grid')
    btns.forEach(btn => {
        btn.classList.add('none')
    })

    //change id to apply difrent styling
    container.setAttribute('id','operator')
    // Close operator info button
    let closeBtn = document.createElement('button');
    closeBtn.setAttribute('id', 'closeBtn')
    closeBtn.innerText = "X";
    container.append(closeBtn);
    closeBtn.addEventListener('click', () => {
        //remove child ellemetns before removing display none from all buttons
        var operatorinfor = document.getElementById('operatorinfor')
        var closeBtn = document.getElementById('closeBtn')
        container.removeChild(closeBtn)
        container.removeChild(operatorinfor)
        container.setAttribute('id','container')
        btns.forEach(btn => {
            btn.classList.remove('none')
        })
    })
    // operator info
    let operatorinfor = document.createElement('section');
    operatorinfor.id = "operatorinfor"
    operatorinfor.innerHTML = `
    <div id = "imageAndButtons">
        <h2>${data.name}</h2>
        <div class = "buttons">
            ${data.art.map((art,index) => `<button class="imgButton" id="${index}">${art.name}</button>`).join('')}
        </div>
        <div id = "modalImage">
            <img id = "characterImg" src = "${data.art[0].link}">
        </div>
    </div>
    <section>
    <div class= "buttons">
    <button id="select_skills">skills</button>
    <button id="select_info">Operator info</button>
    <button id="select_voicelines">Operator voice lines</button>
    </div>
    <div id="textContent">
        ${setstats(data, "base")}
        ${data.skills && data.skills.length > 0 ?  setskills(data,0,0) : ``}
        ${data.module && data.module.length > 0 ? setModules(data,0) : ``}
    </div>
    </section>
    `
    container.append(operatorinfor);

    if(data.skills && data.skills.length){
        let skillslider = document.getElementById('skillslider')
        skillslider.addEventListener("input",changeSkillLevel)
    }


   let imgbuttons = document.querySelectorAll('.imgButton')
   imgbuttons.forEach(button =>{
        button.addEventListener("click",changeImg)
    })

    if(data.skills && data.skills.length){
    let skillbuttons = document.querySelectorAll('.skillButton')
    skillbuttons.forEach(button =>{
        button.addEventListener("click",changeSkill)
    })

    let statsButtons = document.querySelectorAll('.statsButton')
    statsButtons.forEach(button=>{
        button.addEventListener("click", changestats)
    })

    function changestats(){
        id = this.id
        let Stats = document.getElementById('stats')
        Stats.innerHTML= `${stats(data, id)}`
    }

    }
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
                ${setskilllevel(data,i,0)}
            </section>

        `
        let skillslider = document.getElementById('skillslider')
        skillslider.addEventListener("input",changeSkillLevel)
    }

    function changeSkillLevel(){
        let i = this.value
        let currentname = this.name
        let id = data.skills.findIndex(({ name }) => name == currentname);  
        skillinfo = document.getElementById('skill_info')
        skillinfo.innerHTML =`
            ${setskilllevel(data,id,i)}
        `
    }
    function operatorskills(){
        let box = document.getElementById('textContent')
        box.innerHTML= `
        ${setstats(data, "base")}
        ${data.skills && data.skills.length > 0 ?  setskills(data,0,0) : ``}
        
        `
        if(data.skills && data.skills.length){
        let skillslider = document.getElementById('skillslider')
        skillslider.addEventListener("input",changeSkillLevel)
        }
        if(data.skills && data.skills.length){
        let skillbuttons = document.querySelectorAll('.skillButton')
        skillbuttons.forEach(button =>{
            button.addEventListener("click",changeSkill)
        })
    }

        let statsButtons = document.querySelectorAll('.statsButton')
        statsButtons.forEach(button=>{
            button.addEventListener("click", changestats)
        })
    }

    // get info on the charater
    function operatorinfo(){
        let box = document.getElementById('textContent')
        const info = Object.entries(data.lore);
            box.innerHTML=`
                <h3>Description</h3>
                <p>${data.description}
                <h3>Biography</h3>
                <p>${data.biography}</p>
                <h4> affiliation: ${data.affiliation.map((i)=> `${i}, `).join('').slice(0, -2)}
                <h4>Info</h4>
                <ul>
                ${info.map((i) => `<li>${i[0]}: ${i[1]}</li>`).join('').replace(/_/g, " ")}
                </ul>
            `
    }

    function voicelines(){
        let box = document.getElementById('textContent')
        const entries = Object.entries(data.voicelines);
        slicenumber = entries.length/5
        slicearray=[]
        buttonarray =[1,2,3,4,5];
        for (let i = 0; i<entries.length; i+=slicenumber){
            const chunk = entries.slice(i, i + slicenumber);
            slicearray.push(chunk);
        }
        //insert voice line then use join to get rid of , and then replace all _ with a space via the use of regex
        box.innerHTML=`
        <h2> voice lines </h2>
        <div id='selected_voice_lines'>
        ${slicearray[0].map((voicelines) => `<p><b>${voicelines[0]}:</b> ${voicelines[1]}</p>`).join('').replace(/_/g, " ")}
        </div>
        <div class = "buttons">
        ${buttonarray.map((numbers) => `<button class="voiceButton" id="${numbers-1}">${numbers}</button>`).join('')}
        </div>
        `
        let voiceButtons = document.querySelectorAll('.voiceButton')
        voiceButtons.forEach(button =>{
            button.addEventListener("click", () =>voice_selctor(slicearray, button.id))
        })
    }

    function voice_selctor(slicearray, i){
        let box = document.getElementById('selected_voice_lines')
        box.innerHTML =`
        ${slicearray[i].map((voicelines) => `<b><p>${voicelines[0]}:</b> ${voicelines[1]}</p>`).join('').replace(/_/g, " ")}
        `
    }
}


//text pieces to use in main functions
function setskills(data,i1,i2){
    return `
        <h3>skills</h3>
        <div class = "buttons">
            ${data.skills.map((skills, index) => `<button class="skillButton" id="${index}">${skills.name}</button>`).join('')}
        </div>
        <div id="skills">
            <h5>${data.skills[i1].name}</h5>
            <input type="range" value="0" min="1" max="${data.skills[i1].variations.length - 1}" name="${data.skills[i1].name}" id="skillslider">
            <div class="skills_text"">
                <p>SP Charge Type</p>
                <p>Skill Activation</p>
                <p>Duration</p>
                <p>Initial SP</p>
                <p>SP cost</p>
            </div>
            <section id="skill_info">
                ${setskilllevel(data,i1,i2)}
            </section>
        </div>
        `
}

function setskilllevel(data,i1,i2){
    return`
               <div class="skills_text">
                <p>${data.skills[i1].skill_charge}</p>
                <p>${data.skills[i1].skill_activation}</p>
                <p>${data.skills[i1].variations[i2].duration}</p>
                <p>${data.skills[i1].variations[i2].initial_sp}</p>
                <p>${data.skills[i1].variations[i2].sp_cost}</p>
            </div>
            <div>
                <p>${data.skills[i1].variations[i2].description}</p>
            </div>
    `
}

function setstats(data, index){
    var name = Object.getOwnPropertyNames(data.statistics)
    return`
        <h3>Stats</h3>
        <div class = "buttons">
        ${name.map((i) => `<button class="statsButton" id="${i}">${i}</button>`).join('')}
        </div>
        <div id="stats">
            ${stats(data, index)}
        </div>
    `
}

function stats(data, index){
    //insert stats based on index. if index does not contain 
    //on block count recived from data remove all letters : and spaces to make sure only the number remains.
    //This is done as a result that the data recived from block is difrent from operator to operator.
    return`
        <p>HP: ${data.statistics[index].hp}</p>
        <p>ATK: ${data.statistics[index].atk}</p>
        <p>DEF: ${data.statistics[index].def}</p>
        <p>Resist: ${data.statistics.base.resist}</p>
        <p>Redeploy Time: ${data.statistics.base.deploy} sec</p>
        <p>Cost: ${data.statistics.base.cost}</p>
        <p>Block: ${data.statistics[index].block.replace(/^[A-Za-z: ]+/g,"")}</p>
        <p>Attack Time: ${data.statistics.base.interval} sec</p>
    `
}

function setModules(data, i){
    return `
    <h3>Modules</h3>
    <div class = "buttons">
        ${data.module.map((module, index)=> `<button class="x" id="${index}">${module.name}</button>`).join('')}
    </div>
    <div id="moduelInfo>
        ${ModuelData(data, i)}
    </div>
    `
}

function ModuelData(data, i){
    return ``
}