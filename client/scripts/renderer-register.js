document.getElementById('regBtn').addEventListener('click', async ()=>{
  const data = await window.registerApi.post(document.getElementById('first-name').value, document.getElementById('last-name').value, document.getElementById('username').value, document.getElementById('password').value); // Use the exposed API
  console.log(data)
})