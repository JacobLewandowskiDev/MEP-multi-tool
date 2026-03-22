<script setup>
import { ref, computed } from 'vue';

// Configuration data for pipe materials (Hazen-Williams C-factors and ID offsets)
const materials = {
  copper: { name: 'Copper (Type L)', cFactor: 140, idAdjustment: 0.95 },
  pex: { name: 'PEX', cFactor: 150, idAdjustment: 0.85 },
  pvc: { name: 'PVC/CPVC', cFactor: 150, idAdjustment: 0.98 },
  steel: { name: 'Galvanized Steel', cFactor: 100, idAdjustment: 1.02 }
};

const nominalSizes = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4];

// State
const appType = ref('supply');
const flowRate = ref(10);
const material = ref('copper');
const results = ref(null);

const calculateSize = () => {
  const gpm = parseFloat(flowRate.value);
  if (!gpm || gpm <= 0) return;

  const mat = materials[material.value];
  const targetVelocity = appType.value === 'supply' ? 5 : 3; // fps (typical design targets)

  // 1. Calculate required Area (A = Q/V) and then Diameter
  // Velocity (ft/s) = (0.408 * GPM) / ID^2
  const requiredID = Math.sqrt((0.408 * gpm) / targetVelocity);

  // 2. Find closest nominal size that meets or exceeds ID
  const recommendedNominal = nominalSizes.find(s => s * mat.idAdjustment >= requiredID) || 4;
  const actualID = recommendedNominal * mat.idAdjustment;

  // 3. Calculate Results
  const velocity = (0.408 * gpm) / Math.pow(actualID, 2);
  
  // Hazen-Williams Friction Loss (PSI per 100ft)
  const frictionLoss = 0.2083 * Math.pow(100 / mat.cFactor, 1.852) * (Math.pow(gpm, 1.852) / Math.pow(actualID, 4.8655));

  results.value = {
    nominalSize: recommendedNominal,
    velocity: velocity.toFixed(2),
    frictionLoss: frictionLoss.toFixed(2),
    status: (velocity > 8) ? 'High Velocity' : (velocity < 2) ? 'Low Velocity' : 'Optimal'
  };
};
</script>

<template>
  <div class="sizer-container">
    <div class="grid-layout">
      <div class="card input-card">
        <div class="section-header">
          <h2>Pipe Sizer</h2>
        </div>

        <div class="form-group">
          <label>Application Type</label>
          <select v-model="appType" class="custom-select">
            <option value="supply">Water Supply (Pressurized)</option>
            <option value="drain">Drainage / DWV (Gravity)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Flow Rate (GPM)</label>
          <div class="input-wrapper">
            <input v-model.number="flowRate" type="number" placeholder="10" />
            <span class="unit">GPM</span>
          </div>
        </div>

        <div class="form-group">
          <label>Pipe Material</label>
          <select v-model="material" class="custom-select">
            <option v-for="(data, key) in materials" :key="key" :value="key">
              {{ data.name }}
            </option>
          </select>
        </div>

        <button @click="calculateSize" class="calc-btn">
          Calculate Size
        </button>
      </div>

      <div class="card results-card">
        <div class="section-header">
          <span class="label">Sizing Results</span>
        </div>

        <div v-if="!results" class="empty-state">
          <div class="icon-circle">🔧</div>
          <p>No calculation yet</p>
          <small>Enter flow rate and click Calculate Size</small>
        </div>

        <div v-else class="results-display">
          <div class="result-item main">
            <span class="res-label">Recommended Size</span>
            <span class="res-value text-violet">{{ results.nominalSize }}"</span>
          </div>
          <div class="result-grid">
            <div class="result-sub">
              <span class="res-label">Velocity</span>
              <span class="res-value">{{ results.velocity }} ft/s</span>
            </div>
            <div class="result-sub">
              <span class="res-label">Head Loss</span>
              <span class="res-value">{{ results.frictionLoss }} psi/100ft</span>
            </div>
          </div>
          <div :class="['status-badge', results.status.toLowerCase().replace(' ', '-')]">
            {{ results.status }}
          </div>
        </div>
      </div>
    </div>

    <div class="quick-ref">
      <span class="ref-title">Typical Fixture GPM:</span>
      <span>Sink: 2-3</span>
      <span>Shower: 5-8</span>
      <span>Toilet: 3-5</span>
      <span class="limits">Supply: 2-8 ft/s | Drain: 2-4 ft/s</span>
    </div>
  </div>
</template>

<style scoped>
.sizer-container {
  max-width: 1000px;
  width: 90%;
  color: var(--primary-color);
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;
}

.card {
  background: var(--tool-background-color);
  border: var(--tool-border);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--primary-color);
}

.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; font-size: 0.875rem; color: var(--tool-label-color); margin-bottom: 0.5rem; }

.custom-select, input {
  width: 100%;
  height: 48px;
  background: var(--tool-input-color);
  border: var(--tool-border);
  border-radius: 6px;
  color: white;
  padding: 0 1rem;
}

.input-wrapper { position: relative; }
.unit { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--tool-label-color); font-size: 0.875rem; }

.calc-btn {
  width: 100%;
  height: 48px;
  background: var(--primary-color);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.calc-btn:hover { background: var(--primary-color-hover); }

/* Results Styling */
.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: var(--tool-label-color);
}

.icon-circle {
  width: 3rem;
  height: 3rem;
  background: var(--tool-input-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
}

.results-display { text-align: center; }
.res-label { display: block; color: var(--tool-label-color); font-size: 0.875rem; }
.res-value { font-size: 2rem; font-weight: bold; }
.text-violet { color: var(--primary-color); }

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  border-top: var(--tool-border);
  padding-top: 1.5rem;
}

.status-badge {
  margin-top: 1.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.optimal { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
.high-velocity { background: rgba(239, 68, 68, 0.2); color: #f87171; }

.quick-ref {
  margin-top: 1.5rem;
  background: var(--tool-inner-container-color);
  border: var(--tool-border);
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  display: flex;
  gap: 1.5rem;
  color: var(--tool-label-color);
}

.limits { margin-left: auto; color: var(--primary-color); }
</style>