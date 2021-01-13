const { app, BrowserWindow, Notification } = require('electron')
var request = require('request');
var fs = require('fs');
var downloadjs = require("./scripts/download.js");
var myNotification;
require('update-electron-app')({notifyUser: true})
if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '\\assets\\img\\Logo.png'
  })

  win.loadFile('app/index.html')
}

app.whenReady().then(createWindow)

app.on('ready', () => {
    myNotification = new Notification('Melodic Mod Installer', {
        body: 'Questing Update Done Installing'
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})