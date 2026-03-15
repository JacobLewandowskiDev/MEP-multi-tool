<script setup>
import { ref, reactive } from 'vue';

const occupants = ref(4);
const bathrooms = ref(2);
const fuelType = ref('gas');
const usagePattern = ref('heavy');
const hasCalculated = ref(false);

const recommendations = reactive({
  tankSize: 0,
  targetFHR: 0,
  tanklessGPM: 0,
  peakGPM: 0,
  peakHourGal: 0,
  loadCategory: ''
});

const calculateSize = () => {
  // 1. Calculate Peak Hour Gallons
  // Basic rule: ~12 gal per person + usage intensity factor
  let baseDemand = occupants.value * 12;
  let intensityMult = usagePattern.value === 'heavy' ? 1.5 : 1.0;
  recommendations.peakHourGal = Math.round(baseDemand * intensityMult);

  // 2. Determine Tank Size & FHR
  // Electric recovery is slower (~20GPH) vs Gas (~40GPH)
  if (fuelType.value === 'electric' || fuelType.value === 'heatpump') {
    recommendations.tankSize = occupants.value <= 2 ? 40 : occupants.value <= 4 ? 55 : 80;
    recommendations.targetFHR = Math.round(recommendations.peakHourGal * 1.1);
  } else {
    recommendations.tankSize = occupants.value <= 3 ? 40 : 50;
    recommendations.targetFHR = recommendations.peakHourGal;
  }

  // 3. Tankless GPM (Simultaneous flow)
  // 1.5 - 2.5 GPM per bathroom + 1.5 for kitchen/laundry
  let bathFlow = bathrooms.value * 2.0;
  recommendations.peakGPM = (bathFlow + 1.5).toFixed(1);
  recommendations.tanklessGPM = (bathFlow * (usagePattern.value === 'heavy' ? 1 : 0.7) + 1.5).toFixed(1);

  recommendations.loadCategory = recommendations.peakHourGal > 60 ? 'High Demand' : 'Standard Demand';
  hasCalculated.value = true;
};
</script>

<template>
  <div class="mep-heater-container">
    <div class="header-section">
      <h2>Water Heater Sizer</h2>
      <p>Estimate Tank Capacity, FHR, and Tankless GPM</p>
    </div>

    <div class="calculator-grid">
      <div class="inputs-column">
        <div class="sidebar-card">
          <span class="label-mono">HOUSEHOLD PARAMETERS</span>
          
          <div class="input-field">
            <label>Occupants</label>
            <div class="input-wrapper">
              <input type="number" v-model.number="occupants" min="1" class="styled-input" />
              <span class="unit-tag">people</span>
            </div>
          </div>

          <div class="input-field">
            <label>Bathrooms</label>
            <div class="input-wrapper">
              <input type="number" v-model.number="bathrooms" min="1" class="styled-input" />
              <span class="unit-tag">baths</span>
            </div>
          </div>

          <div class="input-field">
            <label>Fuel / Heater Type</label>
            <select v-model="fuelType" class="styled-select">
              <option value="gas">Natural Gas / Propane</option>
              <option value="electric">Electric (Standard)</option>
              <option value="heatpump">Electric (Heat Pump/Hybrid)</option>
            </select>
          </div>

          <div class="input-field">
            <label>Usage Intensity</label>
            <select v-model="usagePattern" class="styled-select">
              <option value="staggered">Staggered (Spread out)</option>
              <option value="heavy">Simultaneous (Morning Rush)</option>
            </select>
          </div>

          <button @click="calculateSize" class="btn-calculate">
            Calculate
          </button>
        </div>
      </div>

      <div class="results-column">
        <div class="results-header">
          <span class="label-mono">RECOMMENDED SPECIFICATIONS</span>
        </div>

        <div v-if="!hasCalculated" class="empty-state">
          <div class="icon-circle">💧</div>
          <p>Enter household data to see sizing recommendations</p>
        </div>

        <div v-else class="recommendations-grid">
          <div class="result-card tank">
            <h3>Storage Tank System</h3>
            <div class="stat-main">
              <span class="val">{{ recommendations.tankSize }}</span>
              <span class="unit">Gallons</span>
            </div>
            <div class="detail-row">
              <span>Target FHR:</span>
              <strong>{{ recommendations.targetFHR }} Gal/Hr</strong>
            </div>
            <p class="hint">FHR (First Hour Rating) is critical for {{ fuelType }} recovery.</p>
          </div>

          <div class="result-card tankless">
            <h3>Tankless (On-Demand)</h3>
            <div class="stat-main">
              <span class="val">{{ recommendations.tanklessGPM }}</span>
              <span class="unit">GPM</span>
            </div>
            <div class="detail-row">
              <span>Peak Demand:</span>
              <strong>{{ recommendations.peakGPM }} GPM</strong>
            </div>
            <p class="hint">Assumes a 70°F temperature rise.</p>
          </div>
        </div>

        <div class="usage-footer" v-if="hasCalculated">
          <div class="footer-stat">Peak Hour Demand: <strong>{{ recommendations.peakHourGal }} gal</strong></div>
          <div class="footer-stat">Estimated Load: <strong>{{ recommendations.loadCategory }}</strong></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mep-heater-container {
  background-color: var(--tool-background-color);
  color: var(--primary-color);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: var(--tool-border);
}

.header-section h2 { margin: 0 0 0.25rem 0; font-size: 1.5rem; color: var(--primary-color); font-family:'Electrolize', Tahoma, Geneva, Verdana, sans-serif; }
.header-section p { color: var(--tool-label-color); margin: 0 0 2rem 0; font-size: 0.9rem; }

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}


@media (min-width: 1024px) {
  .calculator-grid { grid-template-columns: 2fr 3fr; }
}

/* Sidebar Inputs */
.sidebar-card {
  background-color: var(--tool-inner-container-color);
  border: var(--tool-border);
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.input-field { margin-bottom: 1.25rem; }
.input-field label { display: block; font-size: 0.8rem; color: var(--tool-label-color); margin-bottom: 0.5rem; }

.input-wrapper { position: relative; }
.unit-tag { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 0.75rem; color: var(--tool-label-color); }

.styled-input, .styled-select {
  width: 100%;
  background-color: var(--tool-input-color);
  border: var(--tool-border);
  color: white;
  height: 42px;
  padding: 0 0.75rem;
  border-radius: 6px;
  box-sizing: border-box;
}

.btn-calculate {
  width: 100%;
  background-color: var(--primary-color);
  color: #000;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
}
.btn-calculate:hover { background-color: var(--primary-color-hover); }

.results-column { display: flex; flex-direction: column; }
.label-mono { font-size: 0.75rem; color: var(--primary-color); letter-spacing: 0.05em; }

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: var(--tool-border);
  border-radius: 0.75rem;
  margin-top: 1rem;
  padding: 3rem;
  color: var(--tool-label-color);
}
.icon-circle { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.3; }

.recommendations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .recommendations-grid { grid-template-columns: 1fr 1fr; }
}

.result-card {
  background:var(--tool-inner-container-color);
  border: var(--tool-border);
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.result-card h3 { font-size: 0.9rem; margin: 0 0 1rem 0; color: var(--tool-label-color); }

.stat-main { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1rem; }
.stat-main .val { font-size: 2.5rem; font-weight: 800; color: var(--primary-color); }
.stat-main .unit { font-size: 1rem; color: var(--tool-label-color); }

.detail-row { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.5rem; }
.hint { font-size: 0.75rem; color: var(--tool-label-color); margin-top: 1rem; line-height: 1.4; }

.usage-footer {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--tool-inner-container-color);
  border: var(--tool-border);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-around;
  font-size: 0.8rem;
}
</style>