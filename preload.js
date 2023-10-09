import { ipcRenderer } from "electron";

const loadPreload = (contextBridge) => {
  contextBridge.exposeInMainWorld("electron-vue-titlebar", {
    minimize: () => {
      ipcRenderer.invoke("electron-vue-titlebar.minimize");
    },
    toggle: (callback) => {
      ipcRenderer.invoke("electron-vue-titlebar.toggle");
    },
    close: () => {
      ipcRenderer.invoke("electron-vue-titlebar.close");
    },
    hide: () => {
      ipcRenderer.invoke("electron-vue-titlebar.hide");
    },
    addMaximizeListener: (callback) => {
      ipcRenderer.on("electron-vue-titlebar.onMaximize", () => callback());
    },
    addUnmaximizeListener: (callback) => {
      ipcRenderer.on("electron-vue-titlebar.onUnmaximize", () => callback());
    },
    removeMaximizeListener: () => {
      ipcRenderer.removeAllListeners("electron-vue-titlebar.onMaximize");
    },
    removeUnmaximizeListener: () => {
      ipcRenderer.removeAllListeners("electron-vue-titlebar.onUnmaximize");
    },
  });
};
export { loadPreload };
