<template>
    <div class="dashboard">
        <div class="dashboard__tool dashboard__tool--full">
            <h2>Workload and Team Summary</h2>
        </div>
        <!-- This will show the number of all projects, active projects, on hold projects, and a number of upcoming deadlines, upcoming employee PTO-->
        <div class="dashboard__tool">Team List</div> 
        <div class="dashboard__tool">Upcoming Deadlines</div>
        <div class="dashboard__tool">Placeholder</div>
    </div>
</template>

<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 1rem; 
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
}

.dashboard__tool {
    background: var(--tool-background-color);
    border: var(--tool-border);
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    color: var(--tool-label-color);
    font-size: 1.1rem;
    font-weight: bold;
}

.dashboard__tool--full {
    grid-column: 1 / -1;
}

.dashboard__tool:nth-child(3) {
    grid-column: span 2;
}
</style>