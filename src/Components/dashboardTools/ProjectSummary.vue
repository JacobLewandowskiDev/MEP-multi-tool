<script setup>
import { ref } from 'vue';
import ProjectTable from '../dashboardTools/ProjectTable.vue';

const tabs = ref([
  'PROJECT SUMMARY', 
  'UPCOMING DEADLINES', 
  'GEC PROJECTS', 
  'NON-GEC PROJECTS', 
  'PROPOSALS' 
]);

// Track the index of the active tab
const activeTabIndex = ref(0); 

const setActive = (index) => {
  activeTabIndex.value = index;
};
</script>

<template>
    <div class="summary">
        <div class="summary__controls" v-if="activeTabIndex === 0">
            <div class="spacer"></div> 
            
            <h3>Project Summary</h3>
            
            <div class="summary__button-wrapper">
                <button class="summary__add">ADD PROJECT</button>
            </div>
        </div>
        <div class="summary__table">
            <ProjectTable v-if="activeTabIndex === 0" />
            </div>
        <div class="summary__tabs">
            <button 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="summary__tabs__button"
                :class="{ 'active': activeTabIndex === index }"
                @click="setActive(index)"
            >
                {{ tab }}
            </button>
            <button class="summary__tabs__button" :class="{ 'active': activeTabIndex === 5 }" @click="setActive(5)">EMPLOYEE WORKLOAD</button>
        </div>
    </div>
</template>

<style scoped>
.summary {
    background: var(--tool-background-color);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.summary__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
}

.spacer, .summary__button-wrapper {
    flex: 1; 
}

.summary__button-wrapper {
    display: flex;
    justify-content: flex-end;
}

.summary__controls h3 {
    flex: 2;
    text-align: center;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.75rem;
    margin: 0;
}

.summary__table {
    width: 100%;
    height: 100%;
    border: var(--tool-border);
    border-left: none;
    overflow: auto;
    display: block;
}

.summary__tabs {
    display: flex;
    width: 100%;
    height: 4rem;
    padding: 0 0.3rem;
    border-right: var(--tool-border);
}

.summary__tabs__button, .summary__add {
    flex: 1; 
    min-width: 0;
    
    background-color: var(--tool-inner-container-color);
    color: #fff;
    border: var(--tool-border);
    border-radius: .35rem;
    padding: .5rem;
    margin: .3rem;
    transition: all .2s ease;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.85rem;
    font-weight: bold;
}

.summary__add {
    background-color: var(--primary-color);
    color: #000;
    font-weight: bold;
    font-size: 1rem;
    flex: 0 1 auto;
    padding: 0.75rem 1rem;
}

.summary__tabs__button:hover, .summary__add:hover {
    background-color: var(--primary-color-hover);
    cursor: pointer;
}

.summary__tabs__button.active {
    background-color: var(--primary-color);
    color: #fff;
}

.summary__table::-webkit-scrollbar,
*::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
}

.summary__table::-webkit-scrollbar-track,
*::-webkit-scrollbar-track {
    background: transparent; 
}

.summary__table::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-thumb {
    background-color: var(--primary-color); 
    border-radius: 10px;
}

.summary__table {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) transparent;
}
</style>