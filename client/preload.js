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

contextBridge.exposeInMainWorld('registerApi', {
  post: async (first_name, last_name, username, password) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({
          first_name : first_name,
          last_name : last_name,
          username : username,
          password: password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error in register API:', error);
      throw error; // Propagate the error to the renderer
    }
  }
})

contextBridge.exposeInMainWorld('protected', {
  post: async (token) => {
    try {
      const response = await fetch('http://localhost:3000/protected', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
      // Parse and return the JSON response
      return response.json();
    } catch (error) {
      console.error('Error in login API:', error);
      throw error; // Propagate the error to the renderer
    }
  },
});

contextBridge.exposeInMainWorld('createAccountApi', {
  post: async (token, accountName, accountType, balance) => {
    try {
      const response = await fetch("http://localhost:3000/createAccount", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          accountName: accountName,
          accountType: accountType,
          balance: balance
        }),

      });

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Error in login API:', error);
      throw error; // Propagate the error to the renderer
    }
  }
})

contextBridge.exposeInMainWorld('getAccountApi', {
  get: async (token) => {
    try {
      const response = await fetch("http://localhost:3000/getAllAccounts", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8"
        },
      });

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Error in login API:', error);
      throw error; // Propagate the error to the renderer
    }
  }
})

contextBridge.exposeInMainWorld('removeAccountApi', {
  post: async (token, accountId) => {
    try {
      const response = await fetch("http://localhost:3000/removeAccount", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          accId : accountId
        }),
      });

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Error in login API:', error);
      throw error; // Propagate the error to the renderer
    }
  }
})

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (...args) => ipcRenderer.send(...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    once: (channel, listener) => ipcRenderer.once(channel, listener),
  }
});