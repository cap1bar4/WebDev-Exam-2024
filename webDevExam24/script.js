let otvet;
let otvetGuide, otvetRoute;
let listWalkingRoute = new XMLHttpRequest();
let searchBtn = document.querySelector(".searchBtn")
let listLang = document.querySelector(".unicLanguage")
let fioGuide = document.querySelector(".nameFIO")
let routeNamE = document.querySelector(".routeName")
let marshrutChoiced = document.querySelector(".marshrut")
let totalCost = document.querySelector(".totalCost")
let totalCostConst;
let hourChoiceConst;
let hourChoice = document.querySelector(".choiceHour")
let numberOfPerson = document.querySelector(".numberOfPerson")
let numOfPerConst;
let interactivMap = document.querySelector(".interactivMap")
let allowance2 = 1;

console.log("well done!")

function blockOfWalkingRoutes(thisPage) {

    const buttonRange = 9;
    let btnStart, btnEnd;
    let allButtonOnPage = Math.ceil(otvetRoute.length / 4); // 30

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

    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    for (let Number1 = btnStart; Number1 <= btnEnd; Number1++) {
        let button = document.createElement('button');
        button.innerText = Number1;

        if (Number1 === thisPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', function() {
            blockOfWalkingRoutes(Number1);
        });

        paginationContainer.appendChild(button);
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

       choiceBtn.addEventListener('click', function() {
        routeNamE.innerHTML = item.name;
        marshrutChoiced.innerHTML  = item.name;

       })
    }
}

function forBlockOfGuide() {

    let guideTable = document.querySelector(".TableGuide tbody");
    guideTable.innerHTML = '';

    let choiceLang = document.createElement('option')
    choiceLang.value = "Не выбрано";
    choiceLang.text = "Не выбрано";
    listLang.innerHTML = '';
    listLang.appendChild(choiceLang);

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
        
        let choiceBtnGuid = document.createElement('button');
        choiceBtnGuid.innerHTML = 'выбрать';
        choiceBtnGuid.className = 'btn btn-success align';

        col6.appendChild(choiceBtnGuid);

        choiceBtnGuid.addEventListener('click', function() {
            fioGuide.innerHTML = item.name;
            totalCostConst = item.pricePerHour;
            theTotalCost();
        })  

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

function theTotalCost() {

    hourChoiceConst =  hourChoice.value;

    let totalCostHelp = totalCostConst * hourChoiceConst * allowance2 + numOfPerConst;

    console.log("сумма", totalCostHelp)

    if (Number.isInteger(totalCostHelp)){ //проверяю на целочисленность
        totalCost.innerHTML = totalCostHelp

    } else {
        totalCost.innerHTML = "Не достаточно данных";
    }
   
}


interactivMap.addEventListener('change', function(){

    if (this.checked) {
        allowance2 = 1.5;

    }else {
        allowance2 = 1;
    }
    
    theTotalCost()
});

hourChoice.addEventListener('change', function(){
    hourChoiceConst = parseInt(hourChoice.value); // перевод в int
    theTotalCost();
});

numberOfPerson.addEventListener('input', function(){
    numOfPerConst = parseInt(numberOfPerson.value);
  
    let valueForPriece
    if (numOfPerConst >= 0 && numOfPerConst < 5){
        valueForPriece = 0
    }else if (numOfPerConst >= 5 && numOfPerConst < 10){
        valueForPriece = 1000
    }else if (numOfPerConst >= 10 && numOfPerConst <= 20){
        valueForPriece = 1500
    }else {
        valueForPriece = 0
    }
    numOfPerConst = valueForPriece;
   
    theTotalCost();
});

let num = numberOfPerson.value;


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