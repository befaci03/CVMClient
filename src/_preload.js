const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bvmAPI', {
    window: {
        minimize: () => ipcRenderer.send('windowapi-minimize'),
        maximize: () => ipcRenderer.send('windowapi-maximize'),
        close: () => ipcRenderer.send('windowapi-close')
    }
});
