<script setup>
</script>

<template>
    <div class="list">
        <div class="list__employee">
            <p class="list__employee__name">John Doe</p>
            <span class="list__employee__status">&#x1F7E2</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Pork</p>
            <span class="list__employee__status">&#x1F7E1</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status">&#x1F534</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Doe</p>
            <span class="list__employee__status">&#x1F7E2</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">John Pork</p>
            <span class="list__employee__status">&#x1F7E1</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status">&#x1F534</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
        <div class="list__employee">
            <p class="list__employee__name">Bob Burger</p>
            <span class="list__employee__status">&#x1F534</span> <!-- &#x1F7E2 - Green circle (light), &#x1F7E1 - yellow circle (moderate), &#x1F534 - red circle (high) -->
        </div>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    overflow-y: auto; 
    height: 90%; 
    font-size: 1rem;
    scrollbar-width: thin;
    scrollbar-color: var(--tool-label-color) transparent;
}

.list::-webkit-scrollbar {
    width: .5rem;
}

.list::-webkit-scrollbar-track {
    background: transparent; 
}

.list::-webkit-scrollbar-thumb {
    background-color: var(--tool-label-color); 
    border-radius: 10px;
    border: 2px solid var(--tool-background-color); 
}

.list::-webkit-scrollbar-thumb:hover {
    filter: brightness(0.8);
}

.list__employee {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 0.5rem;
    width: 90%;
    margin: 0.2rem auto;
    border: var(--tool-border);
    border-radius: 8px;
}

.list__employee p {
    flex-grow: 1;
    text-align: left;
    margin-left: 0.5rem;
    font-weight: 500;
}

.list__employee span {
    margin-right: 1rem;
}
</style>