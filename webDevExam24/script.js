let otvet;
let otvetGuide, otvetRoute;
let listWalkingRoute = new XMLHttpRequest();
let searchBtn = document.querySelector(".searchBtn")
let listLang = document.querySelector(".unicLanguage")

function blockOfWalkingRoutes(thisPage) {

    const buttonRange = 9;
    let btnStart, btnEnd;
    let allButtonOnPage = Math.ceil(otvetRoute.length / 4); // 30
    console.log(thisPage<=5,thisPage);

    if (thisPage <= 5) {
        btnStart = 1;
        btnEnd = buttonRange;
    } else if (thisPage + 4 >= allButtonOnPage) {
        btnStart = allButtonOnPage - buttonRange + 1
        btnEnd = allButtonOnPage
    } else {
        btnStart = thisPage - 4;
        btnEnd = thisPage + 4;
    }

    let kakoitoconteiner = document.querySelector('.pagination');
    kakoitoconteiner.innerHTML = '';

    for (let Number1 = btnStart; Number1 <= btnEnd; Number1++) {
        let button = document.createElement('button');
        button.innerText = Number1;

        if (Number1 === thisPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', function() {
            blockOfWalkingRoutes(Number1);
        });

        kakoitoconteiner.appendChild(button);
    }


    let start = (thisPage-1) * 4
    let end = start + 4;
    let guideTable = document.querySelector(".TableRoute tbody");
    guideTable.innerHTML = '';

    for (let numberBtn = start; numberBtn < end && numberBtn < otvetRoute.length; numberBtn++) {

       let item = otvetRoute[numberBtn]
       let row = guideTable.insertRow();

       let col1 = row.insertCell(0);
       let col2 = row.insertCell(1);
       let col3 = row.insertCell(2);
       let col4 = row.insertCell(3);

       col1.innerHTML = item.name;
       col2.innerHTML = item.description;
       col3.innerHTML = item.mainObject;

       let choiceBtn = document.createElement('button');
       choiceBtn.innerHTML = 'выбрать';
       choiceBtn.className = 'btn btn-success align';

       col4.appendChild(choiceBtn); 

       choiceBtn.addEventListener('click', function() {
        let id_route = item.id;
        ApiRequest(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id_route}/guides?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6`, 2)
       })
    }
}

function forBlockOfGuide() {

    let guideTable = document.querySelector(".TableGuide tbody");
    guideTable.innerHTML = '';

    console.log(otvetGuide)
    console.log(otvetGuide.length)

    let unicLanguageMassive = new Set(); //уникальные языки


    otvetGuide.forEach(function(item) {

        let row = guideTable.insertRow();1
 
        let col1 = row.insertCell(0);
        let col2 = row.insertCell(1);
        let col3 = row.insertCell(2);
        let col4 = row.insertCell(3);
        let col5 = row.insertCell(4);
        let col6 = row.insertCell(5);
 
        col1.innerHTML = '<img src="image/person.png" class="mx-auto d-block" width="30" height="30"></img>';
        col2.innerHTML = item.name;
        col3.innerHTML = item.language;
        unicLanguageMassive.add(item.language);
        col4.innerHTML = item.workExperience;
        col5.innerHTML = item.pricePerHour;

        let choiceBtnGuid = `
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Выбрать
        </button>`;
        col6.innerHTML = choiceBtnGuid;

        // choiceBtnGuid.addEventListener('click', function({}))
            

    });

    unicLanguageMassive.forEach(function(language){
        let choiceLang = document.createElement('option')
        choiceLang.value = language;
        choiceLang.text = language;
        listLang.appendChild(choiceLang);
    });
}

searchBtn.addEventListener('click', function(){
    let searchContent = document.querySelector(".searchContent");
    let searchRoute = searchContent.value;
    console.log(searchRoute.trim());
    if (searchRoute.trim().length > 0) {   // .trim() удаляет пробельные символы с начала и конца строки
        let tab = document.querySelector('.TableRoute');
        let row = tab.getElementsByTagName('tr');

        for (let i = 1; i < row.length; i++){
            let cell = row[i].getElementsByTagName('td')

            if (cell[0].textContent == searchRoute) {

            }else {
                row[i].style.display = 'none';

            }
 
        }
    }

});


function ApiRequest(url, flag) {
    let listWalkingRoute = new XMLHttpRequest();
    
    listWalkingRoute.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            otvet = JSON.parse(this.responseText);
            if (flag === 1){
                otvetRoute = otvet;
                blockOfWalkingRoutes(1);
            }
            else if (flag === 2) {
                otvetGuide = otvet;
                forBlockOfGuide();
            }
            
        }
    }
    listWalkingRoute.open('GET', url, true);
    listWalkingRoute.send();
}

window.onload = function() {
    ApiRequest('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6', 1);
}