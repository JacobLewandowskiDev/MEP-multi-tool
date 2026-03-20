<script>
import Navbar from "@/Components/Navbar.vue";
import Tile from "@/Components/Tile.vue";
import imgPlumb from "@/assets/images/plbg.jpg";
import imgHvac from "@/assets/images/hvac.jpg";
import imgManagement from "@/assets/images/management.jpg";

export default {
    components: {
        Navbar,
        Tile,
    },

    data() {
        return {
            modules: [
                 { 
                    cardTitle: "Management Tool", 
                    cardDescription: "Manage all of your teams projects.", 
                    linkPath: "/login", 
                    cardImage: imgManagement 
                },
                { 
                    cardTitle: "HVAC Tools", 
                    cardDescription: "HVAC Design and Sizing tools.", 
                    linkPath: "/HVAC", 
                    cardImage: imgHvac 
                },
                { 
                    cardTitle: "Plumbing Tools", 
                    cardDescription: "Plumbing Design and Sizing tools.", 
                    linkPath: "/plbg", 
                    cardImage: imgPlumb 
                }
            ]
        }
    }
}
</script>

<template>
    <Navbar />
    <div class="tiles--container">
        <div class="tiles--container__intro">
            <h1>Welcome to the MEP Engineering Multi-Tool</h1>
        </div>
        
        <div class="tiles--container__tiles">
            <Tile v-for="module in modules" :key="module.cardTitle" v-bind="module" />
        </div>
    </div>
</template>

<style scoped>
.tiles--container {
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}

.tiles--container__intro {
    text-align: center;
    padding-bottom: 1rem;
}

.tiles--container__tiles {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
}
</style>