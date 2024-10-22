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
const searchBtn2 = document.querySelector('#search-btn-2');
const searchBtn3 = document.querySelector('#search-btn-3');
const searchBtn4 = document.querySelector('#search-btn-4');
const searchBtn5 = document.querySelector('#search-btn-5');
const searchBtn6 = document.querySelector('#search-btn-6');
const searchBtn7 = document.querySelector('#search-btn-7');
const searchBtn8 = document.querySelector('#search-btn-8');
const searchBtn9 = document.querySelector('#search-btn-9');
const searchBtn10 = document.querySelector('#search-btn-10');

searchBtn1.onclick = function() {
    const searchId= document.querySelector('#userid-search-input').value;

    fetch('http://localhost:5050/search/' + searchId)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

searchBtn3.onclick = function() {
    const searchName = document.querySelector('#name-search-input').value.trim();

    // Split the input into first and last names (if applicable)
    const nameParts = searchName.split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts[1] || '';

    // Create the URL with query parameters for first and last name
    const url = `http://localhost:5050/search?firstname=${firstname}&lastname=${lastname}`;

    fetch(url)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}


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
