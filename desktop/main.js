const { app, BrowserWindow } = require('electron');
const path = require('path');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 760, minWidth: 900, minHeight: 540,
    autoHideMenuBar: true, backgroundColor: '#2b1068', title: 'Puyo Party',
    webPreferences: { contextIsolation: true }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
