const { BrowserWindow, app, ipcMain, nativeImage, Menu, dialog, session } = require('electron'); // init electron

const path = require('path');
const { updateUserStatus, updateTabInfo } = require('./RPC');

let mainWin; // window
let __tray; // why not
function createMainWIN() {
    mainWin = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: false, contextIsolation: true, // for ensuring security on plugins
            transparent: true, // for themes compatibility
            preload: path.join(__dirname, '_preload.js')
        }, frame: false,
        minHeight: 275, minWidth: 790,
        //maxHeight: 720, maxWidth: 1280    poop
    });

    mainWin.loadFile(path.join(__dirname, 'views', 'client.html'));
}

app.whenReady().then(() => {
    createMainWIN();
});

ipcMain.on('windowapi-minimize', async () => {
    if (mainWin) mainWin.minimize();
});

ipcMain.on('windowapi-maximize', () => {
    if (mainWin) {
        if (mainWin.isMaximized()) mainWin.unmaximize();
        else mainWin.maximize();
    }
});

ipcMain.on('windowapi-close', () => {
    if (mainWin) mainWin.close();
});

ipcMain.on('update-status', (event, { username, status }) => {
    updateUserStatus(username, status);
});

ipcMain.on('update-tab', (event, { website }) => {
    updateTabInfo(website);
});
