let spisokMarshrytov = new XMLHttpRequest();
let otvet;

spisokMarshrytov.onreadystatechange = function() {
    if (spisokMarshrytov.readyState == 4 && spisokMarshrytov.status == 200) {
        otvet = JSON.parse(spisokMarshrytov.responseText);

        let tableMarshrutov = document.querySelector(".TableRoute tbody");
        tableMarshrutov.innerHTML = '';

        otvet.forEach(function(item) {
                let stroka = tableMarshrutov.insertRow();
    
                let cell1 = stroka.insertCell(0);
                let cell2 = stroka.insertCell(1);
                let cell3 = stroka.insertCell(2);
                let cell4 = stroka.insertCell(3);
        
                cell1.innerHTML = item.name;
                cell2.innerHTML = item.description;
                cell3.innerHTML = item.mainObject;
        
                let knopkaChoice = document.createElement('button');
                knopkaChoice.innerHTML = 'выбрать';
                knopkaChoice.className = 'btn btn-success align';
        
                cell4.appendChild(knopkaChoice);  
        });
    }
}

window.onload = function() {
    spisokMarshrytov.open('GET', 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=35408c80-2fa6-4a20-b84f-56be313ba8b6', true);
    spisokMarshrytov.send();
}