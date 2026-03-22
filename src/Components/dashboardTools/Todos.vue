<script setup>
</script>

<template>
<div class="todos">
    <h3>Todos</h3>
</div>
</template>

<style scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    height: 100%;
    color: var(--tool-label-color);
}

.todos__overview {
    display: grid;
    gap: 0.5rem;
    font-size: 1rem;
    padding: 1rem;
    background: var(--tool-background-color);
    border-radius: .5rem;
    border: var(--tool-border);
    margin: 0;
}
</style>