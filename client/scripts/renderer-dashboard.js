const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', async () =>{
    const data = await window.protected.post(token);
    if (data.error) {
        console.log(data);
        window.location.href = "login.html" 
    }
    console.log(data);
})

document.getElementById("logout-btn").addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = "login.html"
})



async function init() {
    const data = await window.getAccountApi.get(token)
    console.log(data);

    accountNames = [];
    accountBalances = [];
    balanceSum = 0
    data.forEach(element => {
        accountNames.push(element.name)
        accountBalances.push(element.balance)
        balanceSum += parseInt(element.balance)
    });
    data.forEach(element => {
        createAccountDiv(element.name, element.balance, balanceSum);
    });


    document.getElementById("accSum").innerText = balanceSum;
    
    createChart(accountNames, accountBalances);
    
}

function createChart(names, balances) {
    colors = ["#FFB1E9", "#EFE8F7", "#8E4FF4", "#240046",   "#A1C4FD", "#F3C4D9", "#D5A6F2", "#A9D0F5", "#D8E5D4", "#E2C0F8"]
    const ctx = document.getElementById('BalanceChart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: names,
        datasets: [{
            label: 'Balance: ',
            data: balances,
            backgroundColor: colors,
            borderWidth: 1
        }]
        },
        options: {
        plugins: {
            legend: {
                display: false // Hides the legend
            },
            tooltip: {
                enabled: true // Keeps tooltips visible on hover
            }
        },
        scales: {
            x: {
                display: false // Remove x-axis
            },
            y: {
                display: false // Remove y-axis
            }
        }
        }
    });
}

function createAccountDiv(name, balance, sum) {
    var percentage = Math.round(parseInt(balance)/sum*100)

    document.querySelector(".accountList").insertAdjacentHTML('beforeend', `
        <div class="account">
        <p class="name">${name}</p>
        <p class="balance">${balance}</p>

        <div class="bar-container">
            <p class="percentage">${percentage}%</p>
            <div class="bar">
                <div class="bar-reserved" style="width: ${percentage}%;"></div>
            </div>
        </div>
        </div>
    `);
}

init()