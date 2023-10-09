const { ipcMain } = require("electron");

const loadTitleBar = (win) => {
  ipcMain.handle("electron-vue-titlebar.minimize", (event, args) => {
    win.minimize();
  });
  ipcMain.handle("electron-vue-titlebar.toggle", (event, args) => {
    if (win.isMaximized()) {
      win.restore();
      return "unmaximized";
    } else {
      win.maximize();
      return "maximized";
    }
  });
  ipcMain.handle("electron-vue-titlebar.hide", (event, args) => {
    win.hide();
  });
  ipcMain.handle("electron-vue-titlebar.close", (event, args) => {
    win.close();
  });

  win.on("maximize", () => {
    win.webContents.send("electron-vue-titlebar.onMaximize");
  });

  win.on("unmaximize", () => {
    win.webContents.send("electron-vue-titlebar.onUnmaximize");
  });
};
module.exports = { loadTitleBar };
