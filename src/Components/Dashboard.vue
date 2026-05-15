<script setup>
import TeamList from './dashboardTools/TeamList.vue';
import TeamOverview from './dashboardTools/TeamOverview.vue';
import TeamPTO from './dashboardTools/TeamPTO.vue';

</script>

<template>
    <div class="dashboard">
        <div class="dashboard__tool dashboard__tool--full">
            <h2>Workload and Team Summary</h2>
            <br>
            <TeamOverview />
        </div>
        <!-- This will show the number of all projects, active projects, on hold projects, and a number of upcoming deadlines, upcoming employee PTO-->
        <div class="dashboard__tool"><h3>Team Workload</h3>
            <div class="teamList__labels">
                <span>Name</span>
                <span>Workload</span>
            </div>
            <TeamList />
        </div> 
        <div class="dashboard__tool"><h3>Upcoming Deadlines</h3></div>
        <div class="dashboard__tool">
            <h3>Upcoming Employee PTO</h3>
            <div class="teamList__labels">
                <span>Name</span>
                <span>PTO</span>
            </div>
            <TeamPTO />
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    grid-template-rows: auto minmax(0, 40vh); 
    gap: 1rem; 
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
}

.dashboard__tool {
    background: var(--tool-background-color);
    border: var(--tool-border);
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--tool-label-color);
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.dashboard__tool h3 {
    color:var(--primary-color);
    margin-bottom: .5rem;
}

.dashboard__tool--full {
    grid-column: 1 / -1;
}

.dashboard__tool--full h2 {
    color: var(--primary-color);
}

.dashboard__tool:nth-child(3) {
    grid-column: span 2;
}

.teamList__labels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0 0 .25rem 0;
    width: 85%;
    margin: 0 auto;
    font-size: 0.9rem;
}

.teamList__labels span:first-child {
    justify-self: start;
    margin-left: 1.5rem;
}

.teamList__labels span:last-child {
    justify-self: end;
    margin-right: .5rem;
}
</style>