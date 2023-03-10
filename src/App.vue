<!--
 * @description: 
 * @author: lijingru
 * @Date: 2023-03-01 10:40:07
 * @lastEditors: lijingru
 * @LastEditTime: 2023-03-02 16:30:50
-->


<template>
  <div>
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>

  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
