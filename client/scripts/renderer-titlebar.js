const ipcRenderer = window.electron.ipcRenderer;

document.getElementById('min-button').addEventListener("click", event =>{
    ipcRenderer.send('TITLE_BAR_ACTION',"MINIMIZE_WINDOW")
    });

document.getElementById('max-button').addEventListener("click", event =>{
    ipcRenderer.send('TITLE_BAR_ACTION',"MAXIMIZE_WINDOW")
    });

// document.getElementById('restore-button').addEventListener("click", event => {
//     ipcRenderer.send('TITLE_BAR_ACTION',"MAXIMIZE_WINDOW")
//     });

document.getElementById('close-button').addEventListener("click", event => {
    console.log("asd");
    ipcRenderer.send('TITLE_BAR_ACTION',"CLOSE_APP")
    });