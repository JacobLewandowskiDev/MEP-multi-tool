<template>
  <div class="mep-drain-container">
    <div class="header-section">
      <h2>Roof Drain Calculator</h2>
      <p>Sizing based on 100-year hourly rainfall rate</p>
    </div>

    <div class="calculator-grid">
      <div class="inputs-column">
        <div class="sidebar-card">
          <span class="label-mono">PROJECT SPECIFICATIONS</span>
          
          <div class="input-field">
            <label>Roof Area (Square Feet)</label>
            <div class="input-wrapper">
              <input 
                type="number" 
                v-model.number="roofSize" 
                placeholder="e.g. 10000" 
                class="styled-input" 
              />
              <span class="unit-tag">sq ft</span>
            </div>
          </div>

          <div class="input-field">
            <label>State / Region</label>
            <select v-model="selectedState" class="styled-select" @change="selectedCity = ''">
              <option value="">Select State</option>
              <option v-for="(cities, state) in rainfallData" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
          </div>

          <div class="input-field" v-if="selectedState">
            <label>City (Rainfall Intensity)</label>
            <select v-model="selectedCity" class="styled-select">
              <option value="">Select City</option>
              <option v-for="(intensity, city) in rainfallData[selectedState]" :key="city" :value="city">
                {{ city }} ({{ intensity }} in/hr)
              </option>
            </select>
          </div>

          <div class="info-box">
            <i class="bi bi-info-circle"></i>
            <p>Code requires a minimum of two drains per roof area.</p>
          </div>
        </div>
      </div>

      <div class="results-column">
        <div v-if="!resultsReady" class="empty-state">
          <div class="icon-circle">🏗️</div>
          <p>Enter roof area and location to calculate drain quantities</p>
        </div>

        <div v-else class="results-content">
          <div class="intensity-banner">
            <span>Design Intensity: <strong>{{ currentIntensity }}" / hr</strong></span>
          </div>

          <table class="drain-table">
            <thead>
              <tr>
                <th>Drain Diameter</th>
                <th>Flow Capacity</th>
                <th>Req. Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="drain in calculatedDrains" :key="drain.size">
                <td class="size-col">{{ drain.size }}"</td>
                <td>{{ drain.gpm }} GPM</td>
                <td class="qty-col" :class="{ 'warning': drain.qty < 2 }">
                  {{ drain.qty }}
                  <span v-if="drain.qty < 2" class="min-note">(Min. 2 req.)</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="pro-note">
            <strong>Note:</strong> Horizontal piping must be sized separately according to IPC Table 1106.2.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const roofSize = ref(null);
const selectedState = ref('');
const selectedCity = ref('');

// Simplified rainfall intensity data (Inches per Hour)
const rainfallData = {
  "New York": { "New York City": 3.0, "Albany": 2.5, "Buffalo": 2.2 },
  "New Jersey": { "Newark": 3.1, "Atlantic City": 3.4, "Trenton": 3.2 },
  "Texas": { "Houston": 4.6, "Dallas": 4.0, "Austin": 3.8 },
  "California": { "Los Angeles": 2.0, "San Francisco": 1.5, "Sacramento": 1.8 },
  "Florida": { "Miami": 4.7, "Orlando": 4.2, "Tampa": 4.5 }
};

// Drain capacities based on standard vertical leader tables (GPM)
// Values are approximate for sizing guidance
const drainCapacities = [
  { size: 2, gpm: 23 },
  { size: 3, gpm: 67 },
  { size: 4, gpm: 144 },
  { size: 5, gpm: 261 },
  { size: 6, gpm: 424 }
];

const currentIntensity = computed(() => {
  if (!selectedState.value || !selectedCity.value) return 0;
  return rainfallData[selectedState.value][selectedCity.value];
});

const resultsReady = computed(() => {
  return roofSize.value > 0 && currentIntensity.value > 0;
});

const calculatedDrains = computed(() => {
  if (!resultsReady.value) return [];

  // Formula: GPM = (Area * Intensity) / 96.23
  const totalGpmReq = (roofSize.value * currentIntensity.value) / 96.23;

  return drainCapacities.map(drain => {
    const rawQty = totalGpmReq / drain.gpm;
    return {
      size: drain.size,
      gpm: drain.gpm,
      qty: Math.max(Math.ceil(rawQty), 1) // Logic allows 1, CSS highlights if < 2
    };
  });
});
</script>

<style scoped>
.mep-drain-container {
  background-color: #020617;
  color: #f8fafc;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
  font-family: sans-serif;
}

.header-section h2 { margin: 0 0 0.25rem 0; font-size: 1.5rem; color: #707373; }
.header-section p { color: #94a3b8; margin: 0 0 2rem 0; font-size: 0.9rem; }

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .calculator-grid { grid-template-columns: 2fr 3fr; }
}

/* Sidebar */
.sidebar-card {
  background-color: #0f172a;
  border: 1px solid #1e293b;
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.input-field { margin-bottom: 1.25rem; }
.input-field label { display: block; font-size: 0.8rem; color: #94a3b8; margin-bottom: 0.5rem; }

.input-wrapper { position: relative; }
.unit-tag { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 0.75rem; color: #64748b; }

.styled-input, .styled-select {
  width: 100%;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: white;
  height: 42px;
  padding: 0 0.75rem;
  border-radius: 6px;
  box-sizing: border-box;
}

.info-box {
  background-color: rgba(112, 115, 115, 0.1);
  border-left: 3px solid #707373;
  padding: 0.75rem;
  margin-top: 1rem;
}
.info-box p { margin: 0; font-size: 0.75rem; color: #94a3b8; line-height: 1.4; }

/* Results */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #1e293b;
  border-radius: 0.75rem;
  padding: 3rem;
  color: #475569;
  text-align: center;
}
.icon-circle { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; }

.intensity-banner {
  background-color: #1e293b;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.drain-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #0f172a;
  border-radius: 0.5rem;
  overflow: hidden;
}

.drain-table th {
  background-color: #1e293b;
  text-align: left;
  padding: 1rem;
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
}

.drain-table td {
  padding: 1rem;
  border-bottom: 1px solid #1e293b;
  font-size: 1rem;
}

.size-col { font-weight: bold; color: #707373; }
.qty-col { font-weight: bold; color: #10b981; }
.qty-col.warning { color: #f97316; }

.min-note {
  display: block;
  font-size: 0.65rem;
  font-weight: normal;
}

.pro-note {
  margin-top: 1.5rem;
  font-size: 0.75rem;
  color: #475569;
  font-style: italic;
}
</style>