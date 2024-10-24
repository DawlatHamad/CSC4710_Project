document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5050/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
});


const searchBtn1 = document.querySelector('#search-btn-1');
searchBtn1.onclick = function() {
    const searchId= document.querySelector('#userid-search-input').value;

    fetch('http://localhost:5050/search/' + searchId)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

const searchBtn2 = document.querySelector('#search-btn-2');
searchBtn2.onclick = function() {
    const firstname = document.querySelector('#firstname-search-input').value.trim();
    const lastname = document.querySelector('#lastname-search-input').value.trim();

    const url = `http://localhost:5050/search?firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

const searchBtn3 = document.querySelector('#search-btn-3');
searchBtn3.onclick = function() {
    const minSalary = document.querySelector('#minSalary-search-input').value;
    const maxSalary = document.querySelector('#maxSalary-search-input').value;

    const url = `http://localhost:5050/salary?minSalary=${encodeURIComponent(minSalary)}&maxSalary=${encodeURIComponent(maxSalary)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}


const searchBtn4 = document.querySelector('#search-btn-4');
searchBtn4.onclick = function() {
    const minAge = document.querySelector('#minAge-search-input').value;
    const maxAge = document.querySelector('#maxAge-search-input').value;

    const url = `http://localhost:5050/age?minAge=${encodeURIComponent(minAge)}&maxAge=${encodeURIComponent(maxAge)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

const searchBtn5 = document.querySelector('#search-btn-5');
searchBtn5.onclick = function() {
    const after = document.querySelector('#after-search-input').value;

    const url = `http://localhost:5050/after?after=${encodeURIComponent(after)}}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

const searchBtn6 = document.querySelector('#search-btn-6'); 
searchBtn6.onclick = function() {
    const same = document.querySelector('#same-search-input').value;

    const url = `http://localhost:5050/same?same=${encodeURIComponent(same)}}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

const searchBtn7 = document.querySelector('#search-btn-7');
searchBtn7.onclick = function() {
    const today = new Date().toISOString().split('T')[0];

    const url = `http://localhost:5050/today?today=${encodeURIComponent(today)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}

const searchBtn8 = document.querySelector('#search-btn-8');


function deleteRowById(userid) {
    fetch('http://localhost:5050/delete/' + userid, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

const userBtn = document.querySelector('#add-user-btn');

userBtn.onclick = function () {
    const usernameInput = document.querySelector('#username-input');
    const username = usernameInput.value;
    usernameInput.value = "";

    const passwordInput = document.querySelector('#password-input');
    const password = passwordInput.value;
    passwordInput.value = "";

    const firstnameInput = document.querySelector('#firstname-input');
    const firstname = firstnameInput.value;
    firstnameInput.value = "";

    const lastnameInput = document.querySelector('#lastname-input');
    const lastname = lastnameInput.value;
    lastnameInput.value = "";

    const salaryInput = document.querySelector('#salary-input');
    const salary = salaryInput.value;
    salaryInput.value = "";

    const ageInput = document.querySelector('#age-input');
    const age = ageInput.value;
    ageInput.value = "";

    fetch('http://localhost:5050/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username : username, password : password, firstname : firstname, lastname : lastname, salary : salary, age : age})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
};

function insertRowIntoTable(data) {
    const table = documment.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'signin_time') {
                data[key] = new Date(data[key]).toLocaleDateString();
            }
            tableHtml += `<td>${data[key]}</td>`; 
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.userid}>Delete</button></td>`;

    tableHtml += "<tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    }
    else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='10'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({userid, username, password, firstname, lastname, salary, age, registerday, signintime}){
        tableHtml += "<tr>";
        tableHtml += `<td>${userid}</td>`;
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td>${password}</td>`;
        tableHtml += `<td>${firstname}</td>`;
        tableHtml += `<td>${lastname}</td>`;
        tableHtml += `<td>${salary}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${new Date(registerday).toLocaleDateString()}</td>`;
        tableHtml += `<td>${new Date(signintime).toLocaleString()}</td>`; 
        tableHtml += `<td><button class="delete-row-btn" data-id=${userid}>Delete</button></td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
