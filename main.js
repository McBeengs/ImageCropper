const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

//live-reload
const electron = require('electron');

let win
let serve;
const args = process.argv.slice(1);

function createWindow() {
  win = new BrowserWindow({
    width: 1120,
    height: 720,
    webPreferences: { webSecurity: false },
    minHeight: 720,
    minWidth: 1120
  })

  serve = args.some(val => val === '--serve');

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    // load the dist folder from Angular
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }


  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})