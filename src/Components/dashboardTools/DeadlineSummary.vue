<script setup>
</script>

<template>
    <div class="list">
        <div class="list__employee">
            <p class="list__employee__name">John Doe</p>
        </div>    
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    overflow-y: auto; 
    overflow-x: visible;
    height: 90%;  
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) transparent;
}

.list__employee {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 0.5rem;
    width: 95%;
    font-weight: 100;
    font-size: 1rem;
    margin: 0.2rem auto;
    border: var(--tool-border);
    border-radius: .5rem;
    background: var(--tool-inner-container-color);
    position: relative; 
    z-index: 1; 
}

.list__employee:hover {
    z-index: 100; 
}


</style>