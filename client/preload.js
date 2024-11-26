const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  get: async (url) => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
});

contextBridge.exposeInMainWorld('loginApi', {
  post: async (user, pwd) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: user,
          password: pwd,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Error in login API:', error);
      throw error; // Propagate the error to the renderer
    }
  },
});

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (...args) => ipcRenderer.send(...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    once: (channel, listener) => ipcRenderer.once(channel, listener),
  }
});