<script setup>
</script>

<template>
    <div class="teamOverview">
        <div class="teamOverview__overview">
            <h3>Project Overview</h3>
            <div class="teamOverview__overview__container">
                <div class="teamOverview__overview__container__tool">
                    <h4>Total Projects:</h4>
                    <p>12</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>Upcoming Deadlines:</h4>
                    <p>3</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>Active Projects:</h4>
                    <p>8</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>On Hold Projects:</h4>
                    <p>2</p>
                </div>
            </div>
        </div>
         <div class="teamOverview__overview">
              <h3>Team Overview</h3>
            <div class="teamOverview__overview__container">
                <div class="teamOverview__overview__container__tool">
                    <h4>Average Workload:</h4>
                    <p data-tip="Light Workload">&#x1F7E2</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>Team Members:</h4>
                    <p>10</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>Employees on PTO:</h4>
                    <p>3</p>
                </div>
                <div class="teamOverview__overview__container__tool">
                    <h4>On Hold Projects:</h4>
                    <p>2</p>
                </div>
            </div>

            
        </div>
    </div>
</template>

<style scoped>
.teamOverview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    height: 100%;
    color: var(--tool-label-color);
}

.teamOverview__overview {
    display: grid;
    gap: 0.5rem;
    font-size: 1rem;
    padding: 1rem;
    background: var(--tool-background-color);
    border-radius: .5rem;
    border: var(--tool-border);
    margin: 0;
}

.teamOverview__overview__container {
    display: grid;
    grid-template-columns: repeat(2, auto); 
    grid-template-rows: repeat(2, auto);
    justify-content: center; 
    align-content: center;
    height: 100%;
    gap: 1rem;
}

.teamOverview__overview__container__tool {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 11rem;
    height: 7rem;
    background: var(--tool-inner-container-color);
    border-radius: .5rem;
    border: var(--tool-border);
}

.teamOverview__overview__container__tool h4 {
    font-size: 1rem;
    height: 30%;
}

.teamOverview__overview__container__tool p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    font-size: 2rem;
    color: var(--primary-color-hover);
}

h3 {
    color: var(--primary-color);
}

</style>