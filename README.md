## Example

main.js
```
const { loadTitleBar } = require("@tcpip147/electron-vue-titlebar")

loadTitleBar(mainWindow)
```

preload.js
```
const { loadPreload } = require("@tcpip147/electron-vue-titlebar/preload")

loadPreload(contextBridge)
```

Example.vue
```
<script setup>
import TitleBar from '@tcpip147/electron-vue-titlebar/vue'
</script>

<template>
  <TitleBar title="hello" close-behavior="close" />
</template>

<style scoped></style>
```
