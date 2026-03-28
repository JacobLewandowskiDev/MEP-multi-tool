<script setup>
import { ref, computed } from 'vue';

const cfm = ref(1000);
const maxFriction = ref(0.1);
const maxVelocity = ref(1500);

// 1. Round Diameter - Forced to Even Increments
const roundDiameter = computed(() => {
  if (cfm.value <= 0) return 0;
  
  // Solve for Friction
  const dByFriction = 0.1091 * Math.pow(cfm.value, 0.4) / Math.pow(maxFriction.value, 0.19);
  // Solve for Velocity
  const areaReq = cfm.value / maxVelocity.value;
  const dByVelocity = Math.sqrt((areaReq * 144 * 4) / Math.PI);

  const targetD = Math.max(dByFriction, dByVelocity);
  
  // MATCHING THE SITE: Round UP to the next EVEN inch (e.g., 11.06 -> 12)
  // Most professional tools jump by 2s once you pass 10"
  return Math.ceil(targetD / 2) * 2;
});

// 2. Rectangular Equivalents
const rectangularOptions = computed(() => {
  const dr = roundDiameter.value;
  if (dr <= 0) return [];

  // The heights used in your example
  const testHeights = [12, 10, 8]; 
  
  return testHeights.map(h => {
    // Solve Huebscher for Width
    const rawW = Math.pow(dr, 1.25) / (Math.pow(1.3, 1.25) * Math.pow(h, 0.25));
    
    // MATCHING THE SITE: Round width to the nearest EVEN inch
    const w = Math.ceil(rawW / 2) * 2;
    
    // Performance based on the FIXED size (e.g. 14x12)
    const areaSqFt = (w * h) / 144;
    const velocity = Math.round(cfm.value / areaSqFt);
    
    // Equivalent Diameter (De) for the final friction calculation
    const de = 1.30 * Math.pow((w * h), 0.625) / Math.pow((w + h), 0.25);
    const friction = Math.pow(0.1091 * Math.pow(cfm.value, 0.4) / de, 1 / 0.19);

    return {
      size: `${w}" x ${h}"`,
      velocity,
      friction: friction.toFixed(3)
    };
  });
});
</script>

<template>
  <div class="hvac-calculator">
    <div class="input-section">
      <div class="field">
        <label>CFM</label>
        <input type="number" v-model.number="cfm" />
      </div>
      <div class="field">
        <label>Max Friction</label>
        <input type="number" step="0.01" v-model.number="maxFriction" />
      </div>
      <div class="field">
        <label>Max Velocity</label>
        <input type="number" step="100" v-model.number="maxVelocity" />
      </div>
    </div>

    <div class="results" v-if="roundDiameter > 0">
      <div class="round-card">
        <span>Round: <strong>{{ roundDiameter }}"</strong></span>
      </div>
      
      <table class="rect-table">
        <thead>
          <tr>
            <th>Rectangular</th>
            <th>Velocity</th>
            <th>Friction</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="opt in rectangularOptions" :key="opt.size">
            <td><strong>{{ opt.size }}</strong></td>
            <td>{{ opt.velocity }} FPM</td>
            <td>{{ opt.friction }} inWg</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.hvac-calculator {
  background: var(--tool-background-color);
  padding: 20px;
  border: var(--tool-border);
  border-radius: 8px;
  color: #fff;
}
.input-section { display: flex; gap: 10px; margin-bottom: 20px; }
.field label { display: block; font-size: 10px; color: var(--primary-color); }
.field input { width: 100%; background: var(--tool-inner-container-color); border: var(--tool-border); color: #fff; padding: 8px; }
.round-card { background: var(--tool-inner-container-color); padding: 15px; margin-bottom: 15px; border-radius: 4px; text-align: center; border-left: 4px solid var(--primary-color); }
.rect-table { width: 100%; border-collapse: collapse; }
.rect-table th { text-align: left; color: var(--primary-color); font-size: 12px; padding: 8px; border-bottom: var(--tool-border); }
.rect-table td { padding: 10px 8px; border-bottom: var(--tool-border); font-size: 13px; }
</style>