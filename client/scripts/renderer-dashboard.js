const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async () =>{
    const data = await window.protected.post(token);
    if (data.error) {
        console.log(data);
        window.location.href = "login.html" 
    }
    console.log(data);
    document.getElementById("greet").innerText = "Hello " + data.user.username
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
    
})

document.getElementById("getAccounts").addEventListener('click', async () =>{
    const data = await window.getAccountApi.get(token)
    console.log(data)
    data.forEach(element => {
        var container = document.createElement("div");
        container.classList.add('account')

        var name = document.createElement("p")
        name.classList.add("acc-name")

        var type = document.createElement("p")
        type.classList.add("acc-type")

        var value = document.createElement("p")
        value.classList.add("acc-value")

        name.innerText = element.name
        type.innerText = element.type
        value.innerText = element.balance

        container.appendChild(name)
        container.appendChild(type)
        container.appendChild(value)
        document.querySelector(".account-list").appendChild(container);
    });
})