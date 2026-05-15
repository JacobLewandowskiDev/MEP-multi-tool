<script setup>
import { computed } from 'vue';
import { truncateText } from '../data/constants';


// Temporary Hard coded data for testing
const employees = [
  { 
    id: 1, 
    name: 'John Doe', 
    pto: [
      { start: '2026-05-26', end: '2026-06-07' },
      { start: '2026-07-10', end: '2026-07-10' } 
    ] 
  },
  { 
    id: 2, 
    name: 'Cassie Jones', 
    pto: [
      { start: '2026-06-15', end: '2026-06-20' }
    ] 
  }
];

const formatPTODisplay = (startStr, endStr) => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const startMonth = monthNames[start.getMonth()];
  const startDay = start.getDate();

  if (startStr === endStr) {
    return `${startMonth} ${startDay}`;
  }

  const endMonth = monthNames[end.getMonth()];
  const endDay = end.getDate();

  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
  
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
};

const flattenedPTO = computed(() => {
  const today = new Date();
  const list = [];

  employees.forEach(emp => {
    emp.pto.forEach(period => {
      const ptoEnd = new Date(period.end);
      // Only include if the PTO hasn't finished yet
      if (ptoEnd >= today) {
        list.push({
          name: emp.name,
          start: period.start,
          end: period.end,
          sortDate: new Date(period.start)
        });
      }
    });
  });

  // Sort chronologically by start date
  return list.sort((a, b) => a.sortDate - b.sortDate);
});
</script>

<template>
  <div class="list">
    <div v-for="(item, index) in flattenedPTO" :key="index" class="list__employee">
      <p class="list__employee__name">{{ truncateText(item.name, 18) }}</p>
      <p class="list__employee__pto">
        {{ formatPTODisplay(item.start, item.end) }}
      </p>
    </div>
    
    <div v-if="flattenedPTO.length === 0" class="list__empty">
      No upcoming PTO
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
  overflow-x: visible;
  height: 90%;  
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) transparent;
}

.list__employee {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 0.5rem 1rem;
  width: 95%;
  font-weight: 100;
  font-size: 1rem;
  margin: 0.2rem auto;
  border: var(--tool-border);
  border-radius: .5rem;
  background: var(--tool-inner-container-color);
  position: relative; 
  z-index: 1; 
}

.list__employee__name {
  margin: 0;
  color: var(--text-color);
  cursor: default;
}

.list__employee__pto {
  margin: 0;
  color: var(--primary-color);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  cursor: default;
}

.list__empty {
  text-align: center;
  padding: 1rem;
  color: var(--text-color);
  opacity: 0.5;
}
</style>