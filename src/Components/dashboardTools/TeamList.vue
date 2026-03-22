<script setup>
</script>

<template>
    <div class="list">
        <div class="list__employee">
            <p class="list__employee__name">John Doe</p>
            <span class="list__employee__status" data-tip="Light Workload">&#x1F7E2</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Pork</p>
            <span class="list__employee__status" data-tip="Light Workload">&#x1F7E2</span>
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status" data-tip="Light Workload">&#x1F7E2</span> 
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Doe</p>
            <span class="list__employee__status" data-tip="Moderate Workload">&#x1F7E1</span> 
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Pork</p>
            <span class="list__employee__status" data-tip="Moderate Workload">&#x1F7E1</span> 
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status" data-tip="High Workload">&#x1F534</span> 
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status" data-tip="High Workload">&#x1F534</span> 
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