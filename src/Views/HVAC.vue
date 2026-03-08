<script>
import DuctSizer from "@/Components/DuctSizer.vue";
import Navbar from "@/Components/Navbar.vue";
import Sidebar from "@/Components/Sidebar.vue";

export default {
    components: {
        Navbar,
        Sidebar,
        DuctSizer
    }
}
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="container__menu">
            <Sidebar />
        </div>
        <div class="container__app">
            <DuctSizer />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: calc(100vh - var(--navbar-height));
    margin-top: var(--navbar-height);
    display: flex;
    
}

.container__menu {
    height: 100%;
    position: sticky;
}

.container__app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>