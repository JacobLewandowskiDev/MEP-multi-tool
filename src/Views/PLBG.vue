<script>
import Navbar from "@/Components/Navbar.vue";
import Sidebar from "@/Components/Sidebar.vue";
import PipeSizer from "@/Components/plbgTools/PipeSizer.vue";
import PipeSPCalc from "@/Components/plbgTools/PipeSPCalc.vue";
import DfuCalc from "@/Components/plbgTools/DfuCalc.vue";
import DwhSizer from "@/Components/plbgTools/DwhSizer.vue";
import RoofDrainSizer from "@/Components/plbgTools/RoofDrainSizer.vue";

export default {
    components: {
        Navbar,
        Sidebar,
        PipeSizer,
        PipeSPCalc,
        DfuCalc,
        DwhSizer,
        RoofDrainSizer
    },

    data() {
        return {
            activeTool: 'PipeSizer' 
        }
    },

    methods: {
    updateActiveTool(toolName) {
      this.activeTool = toolName;
    }
  }
}
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="container__menu">
            <Sidebar :key="$route.path" @tool-selected="updateActiveTool" :title="'PLBG Tools'"/>
        </div>
        <div class="container__app">
            <KeepAlive>
                <component :is="activeTool" />
            </KeepAlive>
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