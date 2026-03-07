<template>
  <div :class="['sidebar', { 'is-hidden': !isVisible, 'is-expanded': isExpanded }]">
    <button @click="isExpanded = !isExpanded" class="toggle-btn">
        <svg v-if="isExpanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
        <svg v-else="isExpanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
    </button>

    <div class="content" v-show="isExpanded">
      <h3>{{ title }} Tools</h3>
      <hr />
      <slot></slot> 
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isExpanded = ref(false);

const isVisible = computed(() => !!route.meta.showSpecialNav);
const title = computed(() => {
  return route.name.toString();
});
</script>

<style scoped>
.sidebar {
  height: 100%;
  background: var(--navbar-color);
  color: white;
  transition: width 0.3s ease, transform 0.3s ease;
  width: 60px;
  position: sticky;
  top: 0;
  left: 0;
  border-right: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
}

.content h3{
  text-align: center;
}

.sidebar.is-expanded {
  width: 15vw;
}

.sidebar.is-hidden {
  transform: translateX(-100%);
  width: 0;
}

.toggle-btn {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background: var(--primary-color);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  fill: #ffffff;
}

.toggle-btn svg {
    width: 2rem;
}
</style>