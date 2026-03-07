<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// State for units: false = Imperial (IP), true = Metric (SI)
const isMetric = ref(false);
</script>

<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <h1>MEP Multi-Tool</h1>
    </div>
    
    <div class="navbar__right">
      <div class="navbar__links">
        <RouterLink to="/">HOME</RouterLink>
        <RouterLink to="/management">MANAGEMENT</RouterLink>
        <RouterLink to="/hvac">HVAC</RouterLink>
        <RouterLink to="/plbg">PLBG</RouterLink>
      </div>

      <div class="unit-toggle" v-if="route.meta.showSpecialNav">
        <span :class="{ 'active-unit': !isMetric }">IP</span>
        
        <label class="switch">
          <input type="checkbox" v-model="isMetric">
          <span class="slider"></span>
        </label>
        
        <span :class="{ 'active-unit': isMetric }">SI</span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
  font-family: 'Electrolize', sans-serif;
}

.navbar__logo h1 {
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.navbar__links a {
  color: #fff;
  text-decoration: none;
  margin-left: 1.5rem;
  padding-bottom: 5px;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.navbar__links .router-link-active {
  border-bottom: 3px solid var(--primary-color);
  color: var(--primary-color);
}

.navbar__links a:hover {
  color: var(--primary-color);
}

.navbar__right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.unit-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Electrolize', sans-serif;
  font-size: 0.85rem;
  user-select: none;
}

.unit-toggle span {
  color: #777;
  transition: all 0.3s ease;
}

.unit-toggle span.active-unit {
  color: var(--primary-color) !important;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(236, 197, 22, 0.5);
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #555;
  transition: .4s;
  border-radius: 4px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 2px;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>