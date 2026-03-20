<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isExpanded = ref(true); 

const isVisible = computed(() => !!route.meta.showSpecialNav);
// const title = computed(() => route.meta.showSpecialNav || 'Tools');

watch(
  () => route.path, 
  () => {
    isVisible.value = !!route.meta.showSpecialNav;    
    if (isVisible.value) isExpanded.value = true;
  }
);

const props = defineProps({
  title: String
});

const emit = defineEmits(['tool-selected']);

const selectTool = (toolName) => {
  emit('tool-selected', toolName);
};
</script>

<template>
  <div :class="['sidebar', { 'is-hidden': !isVisible, 'is-expanded': isExpanded }]">
    <button @click="isExpanded = !isExpanded" class="toggle-btn">
        <svg v-if="isExpanded" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/></svg>
    </button>

    <div class="content" >
      <div class="content__intro">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M240 120L240 160L400 160L400 120C400 115.6 396.4 112 392 112L248 112C243.6 112 240 115.6 240 120zM192 160L192 120C192 89.1 217.1 64 248 64L392 64C422.9 64 448 89.1 448 120L448 160L476.1 160C488.8 160 501 165.1 510 174.1L561.9 226C570.9 235 576 247.2 576 259.9L576 336L440 336L440 320C440 306.7 429.3 296 416 296C402.7 296 392 306.7 392 320L392 336L248 336L248 320C248 306.7 237.3 296 224 296C210.7 296 200 306.7 200 320L200 336L64 336L64 259.9C64 247.2 69.1 235 78.1 226L130 174.1C139 165.1 151.2 160 163.9 160L192 160zM64 480L64 384L200 384L200 400C200 413.3 210.7 424 224 424C237.3 424 248 413.3 248 400L248 384L392 384L392 400C392 413.3 402.7 424 416 424C429.3 424 440 413.3 440 400L440 384L576 384L576 480C576 515.3 547.3 544 512 544L128 544C92.7 544 64 515.3 64 480z"/></svg>
        <h3>{{ title }}</h3>
      </div>
      <hr>
        <div v-if="route.meta.showSpecialNav === 'HVAC'" class="content__toollist">
          <button @click="selectTool('LoadCalc')">Load Calculator</button>
          <button @click="selectTool('DuctSizer')">Duct Sizer</button>
          <button @click="selectTool('EspCalc')">ESP Calculator</button>
          <button @click="selectTool('RefrSizer')">Refrigerant Pipe Sizer</button>
        </div>

        <div v-else-if="route.meta.showSpecialNav === 'Plumbing'" class="content__toollist">
          <button @click="selectTool('PipeSPCalc')">Pipe SP Calculator</button>
          <button @click="selectTool('PipeSizer')">Pipe Sizer</button>
          <button @click="selectTool('DfuCalc')">WSFU/DFU Calculator</button>
          <button @click="selectTool('DwhSizer')">DHW Heater Sizer</button>
          <button @click="selectTool('RoofDrainSizer')">Roof Drain Sizer</button>
        </div>

        <div v-else-if="route.meta.showSpecialNav === 'Management'" class="content__toollist">
          <button>Project Summary</button>
          <button>Deadline Tracker</button>
          <button>Team Manager</button>
          <button>Dashboard</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  background: var(--sidebar-color);
  color: white;
  transition: width 0.3s ease, transform 0.3s ease;
  width: 60px;
  position: sticky;
  top: 0;
  left: 0;
  border-right: var(--tool-border);
}

.content {
  position: relative;
  height: calc(100% - 4rem);
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}

hr {
  height: 2px;
  border: none;
  background-color: #1e293b;
}

.content__intro {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #dddddd;
}

.content__intro svg {
  fill: #dddddd;
  width: 2.5rem;
  margin-right: 1rem;
}

.sidebar.is-expanded {
  width: 15vw;
}

.sidebar.is-hidden {
  transform: translateX(-100%);
  height: 0 !important;
  overflow: hidden;
}

.sidebar.is-expanded .content {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  transition: opacity 0.2s ease, transform 0.2s ease;
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
  transition: ease-in-out 0.2s;
}

.toggle-btn:hover {
  background: var(--primary-color-hover);
}

.toggle-btn svg {
    width: 2rem;
}

.content__toollist {
  display: flex;
  flex-direction: column;
}

.content__toollist button {
  flex: 1;
  padding: 0.75rem;
  margin: 0.5rem;
  background: var(--sidebar-button-color);
  color: #a9b6c9;
  cursor: pointer;
  font-size: 1rem;
  transition: ease-in-out 0.2s;
  border: var(--tool-border);
  border-radius: 4px;
  font-weight: bold;
}

.content__toollist button:hover {
  background: var(--primary-color-hover);
  border-radius: 4px;
  color: #000000;
  font-weight: bold;
}
</style>