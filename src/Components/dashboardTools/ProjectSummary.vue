<script setup>
import { ref } from 'vue';
import ProjectTable from '../dashboardTools/ProjectTable.vue';
import AddProject from './AddProject.vue';

const tabs = ref([
  'PROJECT SUMMARY', 
  'UPCOMING 4 MONTH DEADLINES', 
  'PROPOSALS', 
  'COMPLETED PROJECTS'
]);

// Track the index of the active tab
const activeTabIndex = ref(0); 

const setActive = (index) => {
  activeTabIndex.value = index;
};

const showAddModal = ref(false);

const handleProjectAdded = (newProject) => {
  showAddModal.value = false;
  console.log('Project received:', newProject);
};
</script>

<template>
    <div class="summary">
        <div class="summary__controls" v-if="activeTabIndex === 0">
            <div class="spacer"></div> 
            
            <h3>Project Summary</h3>
            
            <div class="summary__button-wrapper">
                <button @click="showAddModal = true" class="summary__add"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/>
                </svg>
                    ADD PROJECT</button>
                <button class="summary__save">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z"/>
                    </svg> SAVE CHANGES</button>
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
    <AddProject v-if="showAddModal" @project-added="handleProjectAdded" @close="showAddModal = false" />
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

.summary__tabs__button, .summary__add, .summary__save {
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

.summary__add, .summary__save {
    background-color: var(--primary-color);
    color: #000;
    font-weight: bold;
    font-size: 1rem;
    flex: 0 1 auto;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.summary__save {
    background-color: var(--button-secondary-color);
    cursor: pointer;
}

.summary__add svg, .summary__save svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
    text-align: center;
}

.summary__tabs__button:hover, .summary__add:hover, .summary__save:hover {
    background-color: var(--primary-color-hover);
    cursor: pointer;
}

.summary__tabs__button.active {
    background-color: var(--primary-color);
    color: #000;
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