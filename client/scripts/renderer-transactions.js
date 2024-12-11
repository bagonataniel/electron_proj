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

document.getElementById("submitTransaction").addEventListener('click', async ()=>{
    var accountList = document.getElementById("accountList")
    var amount = document.getElementById("amount").value
    if (amount >= 0) {
        var type = "Income"
    }
    else{
        var type = "Expense"
    }
    var date = document.getElementById("date").value
    var description = document.getElementById("description").value
    const data = await window.addTransactionApi.post(token, accountList.options[accountList.selectedIndex].value, amount, type, date, description)
    console.log(data);
    
})


async function getAccountList(){
    const data = await window.getAccountApi.get(token)
    data.forEach(element => {
        var option = document.createElement("option")
        option.value = element.id
        option.innerText = element.name

        document.getElementById("accountList").appendChild(option)
    });
}

getAccountList()

