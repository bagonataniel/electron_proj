const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async () =>{
    const data = await window.protected.post(token);
    if (data.error) {
        console.log(data);
        window.location.href = "login.html" 
    }
    console.log(data);
    document.getElementById("username").innerText = data.user.username
})

document.getElementById("logout-btn").addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = "login.html"
})

document.getElementById("createAccountBtn").addEventListener('click', async ()=>{
    // accountName, accountType, balance
    var account_name = document.getElementById("accName").value
    var accountTypeDiv = document.getElementById("accountType")
    var accountBalance = document.getElementById("balance").value
    
    const data = await window.createAccountApi.post(token, account_name, accountTypeDiv.options[accountTypeDiv.selectedIndex].text, accountBalance);
    console.log(data);

    document.querySelector(".account-list").innerHTML = "";
    getAccountList()
    
})

document.getElementById("getAccounts").addEventListener('click', async () =>{
    getAccountList()
})

async function getAccountList(){
    const data = await window.getAccountApi.get(token)
    console.log(data)
    data.forEach(element => {
        var container = document.createElement("div");
        container.classList.add('account')

        var name = document.createElement("p")
        name.classList.add("acc-name")

        var value = document.createElement("p")
        value.classList.add("acc-value")

        var type = document.createElement("p")
        type.classList.add("acc-type")

        var createdAt = document.createElement("p")
        createdAt.classList.add("acc-createdAt")

        var menuBar = document.createElement("div")
        menuBar.classList.add("acc-menu")
        menuBar.setAttribute("id", "asd")

        name.innerText = element.name
        value.innerText = element.balance
        type.innerText = element.type
        createdAt.innerText = "Created at: "+element.created_at.split("T")[0]
        menuBar.innerHTML = '<i class="fa-solid fa-pencil"></i><i onclick="removeAccount('+ element.id +')" class="fa-solid fa-trash"></i>'

        container.appendChild(name)
        container.appendChild(value)
        container.appendChild(type)
        container.appendChild(createdAt)
        container.appendChild(menuBar)
        document.querySelector(".account-list").appendChild(container);
    });
}

async function removeAccount(id) {
    const data = await window.removeAccountApi.post(token, id)
    console.log(data);
    if (data.message = "Account deleted successfully") {
        document.querySelector(".account-list").innerHTML = "";
        getAccountList()
    }
}