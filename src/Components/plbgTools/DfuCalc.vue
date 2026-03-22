<template>
  <div class="mep-calculator-container">
    <div class="header-section">
      <h2>Fixture Unit Calculator</h2>
      <p>IPC-compliant WSFU and DFU system sizing</p>
    </div>

    <div class="calculator-grid">
      <div class="inputs-column">
        <div class="toolbar">
          <span class="label-mono">SELECTED FIXTURES</span>
          <button @click="addFixture" class="btn-primary">
            + Add Fixture
          </button>
        </div>

        <div class="fixtures-list scrollable">
          <div 
            v-for="(item, index) in selectedFixtures" 
            :key="index"
            class="fixture-card"
          >
            <div class="card-top">
              <div class="input-group">
                <label>Fixture Type</label>
                <select 
                  v-model="item.type" 
                  @change="updateFixtureData(index)"
                  class="styled-select"
                >
                  <option v-for="fix in fixtureCatalog" :key="fix.name" :value="fix.name">
                    {{ fix.name }}
                  </option>
                </select>
              </div>
              
              <div class="input-group qty-group">
                <label>Qty</label>
                <input 
                  type="number" 
                  v-model.number="item.qty" 
                  min="1"
                  class="styled-input"
                />
              </div>

              <button @click="removeFixture(index)" class="btn-delete" title="Remove">
                &times;
              </button>
            </div>
            
            <div class="card-footer">
              <span class="fu-supply">Supply: {{ item.wsfu }} × {{ item.qty }} = <strong>{{ (item.wsfu * item.qty).toFixed(1) }}</strong></span>
              <span class="fu-drain">Drain: {{ item.dfu }} × {{ item.qty }} = <strong>{{ (item.dfu * item.qty).toFixed(1) }}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div class="results-column">
        <div class="sidebar-card">
          <span class="label-mono">SYSTEM TOTALS</span>
          
          <div class="stat-row">
            <span class="stat-label">Total WSFU</span>
            <span class="stat-value supply-text">{{ totalWSFU.toFixed(1) }}</span>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Total DFU</span>
            <span class="stat-value drain-text">{{ totalDFU.toFixed(1) }}</span>
          </div>

          <div class="requirements-section">
            <div class="requirement-box">
              <span class="box-label">EST. SUPPLY MAIN</span>
              <span class="box-value">{{ pipeSizes.supply }}" Copper/PEX</span>
            </div>
            <div class="requirement-box">
              <span class="box-label">MIN. BUILDING DRAIN</span>
              <span class="box-value">{{ pipeSizes.drain }}" PVC/CI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const fixtureCatalog = [
  { name: "Water Closet (Tank)", wsfu: 3.0, dfu: 4.0 },
  { name: "Water Closet (Flush Valve)", wsfu: 5.0, dfu: 6.0 },
  { name: "Lavatory Sink", wsfu: 1.0, dfu: 1.0 },
  { name: "Kitchen Sink", wsfu: 1.5, dfu: 2.0 },
  { name: "Shower", wsfu: 2.0, dfu: 2.0 },
  { name: "Bathtub", wsfu: 2.0, dfu: 2.0 },
  { name: "Washing Machine", wsfu: 3.0, dfu: 3.0 },
  { name: "Hose Bib", wsfu: 2.5, dfu: 0.0 }
];

const selectedFixtures = ref([
  { type: "Water Closet (Tank)", qty: 1, wsfu: 3.0, dfu: 4.0 }
]);

const addFixture = () => {
  selectedFixtures.value.push({ type: "Lavatory Sink", qty: 1, wsfu: 1.0, dfu: 1.0 });
};

const removeFixture = (index) => {
  selectedFixtures.value.splice(index, 1);
};

const updateFixtureData = (index) => {
  const selected = fixtureCatalog.find(f => f.name === selectedFixtures.value[index].type);
  if (selected) {
    selectedFixtures.value[index].wsfu = selected.wsfu;
    selectedFixtures.value[index].dfu = selected.dfu;
  }
};

const totalWSFU = computed(() => {
  return selectedFixtures.value.reduce((acc, item) => acc + (item.wsfu * item.qty), 0);
});

const totalDFU = computed(() => {
  return selectedFixtures.value.reduce((acc, item) => acc + (item.dfu * item.qty), 0);
});

const pipeSizes = computed(() => {
  let supply = '3/4';
  if (totalWSFU.value > 6) supply = '1';
  if (totalWSFU.value > 12) supply = '1 1/4';
  if (totalWSFU.value > 25) supply = '1 1/2';

  let drain = '2';
  if (totalDFU.value > 6) drain = '3';
  if (totalDFU.value > 20) drain = '4';

  return { supply, drain };
});
</script>

<style scoped>
.mep-calculator-container {
  background-color: var(--tool-background-color);
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: var(--tool-border);
}

.header-section h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.header-section p {
  color: var(--tool-label-color);
  margin: 0 0 2rem 0;
  font-size: 0.9rem;
}

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .calculator-grid {
    grid-template-columns: 3fr 2fr;
  }
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.label-mono {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--primary-color);
}

.scrollable {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.fixture-card {
  background-color: var(--tool-inner-container-color);
  border: var(--tool-border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
}

.card-top {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.qty-group {
  flex: 0 0 80px;
}

.input-group label {
  font-size: 0.7rem;
  color: var(--tool-label-color);
  margin-bottom: 0.4rem;
}

.styled-select, .styled-input {
  background-color: var(--tool-input-color);
  border: var(--tool-border);
  color: white;
  height: 38px;
  padding: 0 0.75rem;
  border-radius: 4px;
}

.card-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;
}

.fu-supply { color: var(--primary-color); }
.fu-drain { color: var(--primary-color); }

.sidebar-card {
  background-color: var(--tool-inner-container-color);
  border: var(--tool-border);
  padding: 1.5rem;
  border-radius: 0.75rem;
  position: sticky;
  top: 1.5rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.supply-text { color: var(--primary-color); }
.drain-text { color: var(--primary-color); }

.requirements-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.requirement-box {
  background-color: var(--tool-input-color);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.box-label {
  display: block;
  font-size: 0.65rem;
  color: var(--tool-label-color);
  margin-bottom: 0.25rem;
}

.box-value {
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-delete {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 2rem;
  cursor: pointer;
  padding-bottom: 4px;
}

.btn-primary:hover { background-color: var(--primary-color-hover); }
</style>