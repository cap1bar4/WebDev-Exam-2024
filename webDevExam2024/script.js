let otvet;
let otvetGuide, otvetRoute;
let listWalkingRoute = new XMLHttpRequest();
let routeTable = document.querySelector(".TableRoute tbody");
let guideTable = document.querySelector(".TableGuide tbody");
let searchBtn = document.querySelector(".searchBtn");
let listLang = document.querySelector(".unicLanguage");
let fioGuide = document.querySelector(".nameFIO");
let routeNamE = document.querySelector(".routeName");
let marshrutChoiced = document.querySelector(".marshrut");
let totalCost = document.querySelector(".totalCost");
let pricePerHour;
let hourChoiceConst = 1;
let hourChoice = document.querySelector(".choiceHour");
let numberOfPerson = document.querySelector(".numberOfPerson");
let numOfPerConst = 0;
let interactivMap = document.querySelector(".interactivMap");
let allowanceInteractiveMap = 1;
let AlertInform = document.querySelector(".AlertInform");
let alertButton = document.querySelector(".alertButton");
let borderTime = document.querySelector(".borderTime");
let allowanceCertainHours = 0;
let dateOfTour = document.querySelector(".dateOfTour");
let transferOption = document.querySelector(".transferOption");
let transferOptionConst = 1;
let dateOfTourConst = 1;
let mainObj = document.querySelector(".mainObj");


function blockOfWalkingRoutes(thisPage) {

    const buttonRange = 9;
    let btnStart, btnEnd;
    let allButtonOnPage = Math.ceil(otvetRoute.length / 4); // 30

    if (thisPage <= 5) {
        btnStart = 1;
        btnEnd = buttonRange;
    } else if (thisPage + 4 >= allButtonOnPage) {
        btnStart = allButtonOnPage - buttonRange + 1;
        btnEnd = allButtonOnPage;
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


    let start = (thisPage - 1) * 4;
    let end = start + 4;
    routeTable.innerHTML = '';

    otvetRoute.forEach(function(item) {
        let nameMainObject = item.mainObject;
        let newOption = document.createElement('option');
        newOption.value = nameMainObject;

        if (nameMainObject.length > 80) {
            let shortName = '';
            for (let len = 0; len <= 80; len++) {
                shortName = shortName + nameMainObject[len]; 
            }
            shortName = shortName + "...";
            nameMainObject = shortName;
        }
        
        newOption.innerHTML = nameMainObject;
        mainObj.appendChild(newOption);
    });

    for (let numberBtn = start; numberBtn < end && numberBtn < otvetRoute.length; numberBtn++) {

        let item = otvetRoute[numberBtn];
        let row = routeTable.insertRow();

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
            routeNamE.innerHTML = item.name;
            marshrutChoiced.innerHTML = item.name;

            let id_route = item.id;
            ApiRequest(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id_route}/guides?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6`, 2);
        });

    }
}

function theTotalCost() {

    hourChoiceConst = hourChoice.value;
    // console.log("длительность",hourChoiceConst);
    // console.log("сколько людей",numOfPerConst);
    // console.log("время начала",allowanceCertainHours);
    // console.log("интерактивная карта",allowanceInteractiveMap);
    // console.log("надбавка за трансфер",transferOptionConst);
    // console.log("надбавка за день недели", dateOfTourConst);
   
    //floor округляем в меньшую
    let totalCostHelp = Math.floor((pricePerHour * hourChoiceConst * dateOfTourConst + numOfPerConst + allowanceCertainHours) * allowanceInteractiveMap * transferOptionConst);

    totalCost.innerHTML = totalCostHelp;
}

function forBlockOfGuide() {
    guideTable.innerHTML = '';

    let choiceLang = document.createElement('option');
    choiceLang.value = "Не выбрано";
    choiceLang.text = "Не выбрано";
    listLang.innerHTML = '';
    listLang.appendChild(choiceLang);

    let unicLanguageMassive = new Set(); //уникальные языки


    otvetGuide.forEach(function(item) {

        let row = guideTable.insertRow();
 
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
            pricePerHour = item.pricePerHour;
            totalCost.innerHTML = pricePerHour;
            theTotalCost();
        });

    });

    unicLanguageMassive.forEach(function(language) {
        let choiceLang = document.createElement('option');
        choiceLang.value = language;
        choiceLang.text = language;
        listLang.appendChild(choiceLang);
    });
}

function ApiRequest(url, flag) {
    let listWalkingRoute = new XMLHttpRequest();
    
    listWalkingRoute.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            otvet = JSON.parse(this.responseText);
            if (flag === 1) {
                otvetRoute = otvet;
                blockOfWalkingRoutes(1);
            } else if (flag === 2) {
                otvetGuide = otvet;
                forBlockOfGuide();
            }
            
        } else if (this.readyState == 4 && this.status !== 200) {
            AlertInform.removeAttribute('hidden');
        }
    };
    
    listWalkingRoute.open('GET', url, true);
    listWalkingRoute.send();
}

mainObj.addEventListener('change', function() {
    let choiceMainObject = mainObj.value;

    if (choiceMainObject != 'Не выбрано') {
        routeTable.innerHTML = '';

        otvetRoute.forEach(function(item) {
            if (choiceMainObject == item.mainObject) {
                let row = routeTable.insertRow();

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
                    routeNamE.innerHTML = item.name;
                    marshrutChoiced.innerHTML = item.name;

                    let id_route = item.id;
                    ApiRequest(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${id_route}/guides?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6`, 2);
                });
            }
        });
    } else {
        blockOfWalkingRoutes(1);
    }
    
});


listLang.addEventListener('change', function() {
    let choiceUnicLanguage = listLang.value;

    if (choiceUnicLanguage != 'Не выбрано') {

        guideTable.innerHTML = '';

        otvetGuide.forEach(function(item) {
            if (choiceUnicLanguage == item.language) {
                let row = guideTable.insertRow();
 
                let col1 = row.insertCell(0);
                let col2 = row.insertCell(1);
                let col3 = row.insertCell(2);
                let col4 = row.insertCell(3);
                let col5 = row.insertCell(4);
                let col6 = row.insertCell(5);
         
                col1.innerHTML = '<img src="image/person.png" class="mx-auto d-block" width="30" height="30"></img>';
                col2.innerHTML = item.name;
                col3.innerHTML = item.language;
                col4.innerHTML = item.workExperience;
                col5.innerHTML = item.pricePerHour;
                
                let choiceBtnGuid = document.createElement('button');
                choiceBtnGuid.innerHTML = 'выбрать';
                choiceBtnGuid.className = 'btn btn-success align';
        
                col6.appendChild(choiceBtnGuid);
        
                choiceBtnGuid.addEventListener('click', function() {
                    fioGuide.innerHTML = item.name;
                    pricePerHour = item.pricePerHour;
                    totalCost.innerHTML = pricePerHour;
                    theTotalCost();
                });
            }
        });
    } else {
        forBlockOfGuide();
    } 
});


hourChoice.addEventListener('change', function() {
    hourChoiceConst = parseInt(hourChoice.value); // перевод в int
    theTotalCost();
});

function whatIsThisDay() {

    if (dateOfTour.value === '') {
        return null;
    } 
    
    //получаю полные данные в типе дата
    let allInfoData = new Date(dateOfTour.value); 
    let day = allInfoData.getDay();

    return day % 6 === 0;
}

dateOfTour.addEventListener('change', function() {

    transferOption.checked = false;
    transferOptionConst = 1;

    if (whatIsThisDay()) {
        dateOfTourConst = 1.5;
    } else {
        dateOfTourConst = 1;
    }
    theTotalCost();
});

numberOfPerson.addEventListener('input', function() {
    numOfPerConst = parseInt(numberOfPerson.value);
  
    let valueForPriece;
    if (numOfPerConst > 0 && numOfPerConst < 5) {
        valueForPriece = 0;
    } else if (numOfPerConst >= 5 && numOfPerConst < 10) {
        valueForPriece = 1000;
    } else if (numOfPerConst >= 10 && numOfPerConst <= 20) {
        valueForPriece = 1500;
    } else {
        valueForPriece = 0;
    }
    numOfPerConst = valueForPriece;
   
    theTotalCost();
});

borderTime.addEventListener('change', function() {

    let valueTime = borderTime.value;
    let masTime = valueTime.split(":");
    let hours = parseInt(masTime[0]);
    let minutes = parseInt(masTime[1]);


    if (minutes % 30 != 0 || (hours >= 0 && hours < 9) || (hours == 23 && minutes > 0)) {
        borderTime.value = '';
        alert("Недопустимое время. Выберите подходящее время из списка");
        allowanceCertainHours = 0;
    } else if (hours >= 12 && minutes == 30 && hours <= 19) {
        allowanceCertainHours = 0;
        theTotalCost();
    } else if (hours >= 9 && hours <= 12) {
        allowanceCertainHours = 400;
        theTotalCost();
    } else if (hours >= 20 && hours <= 23) {
        allowanceCertainHours = 1000;
        theTotalCost();
    } 
});

transferOption.addEventListener('change', function() {

    let isWeekend = whatIsThisDay();
   
    if (transferOption.checked && isWeekend === true) {
        transferOptionConst = 1.25;
    } else if (transferOption.checked && isWeekend === false) {
        transferOptionConst = 1.3;
    } else if (isWeekend === null) {
        alert("Пожалуйста, выберите дату!");
        transferOption.checked = false;
    } else {
        transferOptionConst = 1;
    }
    theTotalCost();
});

interactivMap.addEventListener('change', function() {

    if (this.checked) {
        allowanceInteractiveMap = 1.5;

    } else {
        allowanceInteractiveMap = 1;
    }
    theTotalCost();
});

alertButton.addEventListener('click', function() {
    AlertInform.setAttribute('hidden', 'true');
});

window.onload = function() {
    ApiRequest('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6', 1);
};