const electron = require('electron');
const { app, ipcMain, BrowserWindow } = electron;

const path = require('path');

require('electron-debug')({ showDevTools: true });
const logger = require('electron-log');


let win;
logger.transports.file.level = 'info';
logger.transports.file.file = './pacc-desktop.log';

function createWindow() {

    logger.info('Iniciando aplicacion Electron', new Date());

    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        icon: path.join(__dirname, '/dist/assets/logo.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    win.maximize();
    win.show();

    win.loadURL(`file://${__dirname}/dist/index.html`);

    // Event when the window is closed.
    win.on('closed', function() {
        win = null;
    });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // macOS specific close process
    if (win === null) {
        createWindow();
    }
});


ipcMain.on('inicio', (event, data) => {
    console.log("NOS VAMOS AL INICIO");
    createWindow();
});

function createWindowInicio() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
    });

    win.maximize();
    win.show();

    win.loadURL(`file://${__dirname}/dist/inicio`)

    // Event when the window is closed.
    win.on('closed', function() {
        win = null;
    });
}