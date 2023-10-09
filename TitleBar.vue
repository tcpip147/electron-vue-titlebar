<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  logo: String,
  title: String,
  closeBehavior: String,
});

const minimizeImg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 8v1H3V8h11z"/></svg>';
const maximizeImg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 3v10h10V3H3zm9 9H4V4h8v8z"/></svg>';
const restoreImg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 5v9h9V5H3zm8 8H4V6h7v7z"/><path fill-rule="evenodd" d="M5 5h1V4h7v7h-1v1h2V3H5v2z"></svg>';
const closeImg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"/></svg>';

const toggle = ref(maximizeImg);

const onMaximized = () => {
  toggle.value = restoreImg;
};

const onUnmaximized = () => {
  toggle.value = maximizeImg;
};

const onClickMinimize = () => {
  window["electron-vue-titlebar"].minimize();
};

const onClickToggle = () => {
  window["electron-vue-titlebar"].toggle((res) => {
    if (res == "maximized") {
      onMaximized();
    } else {
      onUnmaximized();
    }
  });
};

const onClickClose = () => {
  if (props.closeBehavior == "hide") {
    window["electron-vue-titlebar"].hide();
  } else {
    window["electron-vue-titlebar"].close();
  }
};

onMounted(() => {
  window["electron-vue-titlebar"].addMaximizeListener(() => {
    onMaximized();
  });
  window["electron-vue-titlebar"].addUnmaximizeListener(() => {
    onUnmaximized();
  });
});

onUnmounted(() => {
  window["electron-vue-titlebar"].removeMaximizeListener();
  window["electron-vue-titlebar"].removeUnmaximizeListener();
});
</script>

<template>
  <div class="electron-vue-titlebar-container">
    <img class="electron-vue-titlebar-logo" :src="props.logo" v-if="props.logo" />
    <span class="electron-vue-titlebar-title">{{ props.title }}</span>
    <div class="electron-vue-titlebar-btnbox">
      <div class="electron-vue-titlebar-btn" v-html="minimizeImg" @click="onClickMinimize"></div>
      <div class="electron-vue-titlebar-btn" v-html="toggle" @click="onClickToggle"></div>
      <div class="electron-vue-titlebar-btn electron-vue-titlebar-btn-close" v-html="closeImg" @click="onClickClose"></div>
    </div>
  </div>
</template>

<style scoped>
.electron-vue-titlebar-container {
  background-color: #bbb;
  height: 30px;
  width: 100%;
  user-select: none;
  -webkit-app-region: drag;
}
.electron-vue-titlebar-title {
  display: inline-block;
  margin-top: 4px;
  margin-left: 10px;
}
.electron-vue-titlebar-btnbox {
  float: right;
  height: 100%;
  .electron-vue-titlebar-btn {
    width: 45px;
    height: calc(100% - 6px);
    text-align: center;
    display: inline-block;
    padding-top: 6px;
    -webkit-app-region: no-drag;
    &:hover {
      backdrop-filter: brightness(90%);
    }
    &.electron-vue-titlebar-btn-close:hover {
      background-color: #e81123;
      color: #fff;
    }
  }
}
</style>
