<script setup>
import { nextTick, ref } from 'vue';
import { truncateText } from '../data/constants';

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  options: { type: Array, default: () => [] },
  title: String,
  truncate: { type: Number, default: 60 }
});

const emit = defineEmits(['update:modelValue', 'open-popup']);

const isEditing = ref(false);
const inputRef = ref(null);

const startEdit = async () => {
  if (props.type === 'popup') {
    emit('open-popup');
    return;
  }
  isEditing.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const handleSave = (val) => {
  if (!isEditing.value) return;
  emit('update:modelValue', val);
  isEditing.value = false;
};

const handleSelectChange = (e) => {
  const newValue = e.target.value;
  emit('update:modelValue', newValue);
  nextTick(() => {
    isEditing.value = false;
  });
};

const onBlurOrEnter = (e) => {
  handleSave(e.target.value);
};

const handleBlur = (e) => {
  handleSave(e.target.value);
};
</script>

<template>
  <td 
    ref="cellRef"
    :title="title || modelValue" 
    @click="startEdit"
    :class="{ 'is-editing': isEditing }"
  >
    <div v-if="isEditing && type === 'select'" class="custom-select-container">
      <div class="dropdown-list">
        <div 
          v-for="opt in options" 
          :key="opt.value" 
          class="dropdown-item"
          :class="{ 'selected': opt.value === modelValue }"
          @click.stop="handleSave(opt.value)"
        >
          {{ opt.label }}
        </div>
      </div>
    </div>

    <input
      v-else-if="isEditing && type === 'text'"
      ref="inputRef"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" 
      @blur="isEditing = false"
      @keyup.enter="handleSave($event.target.value)"
      @click.stop 
      class="edit-input"
    />

    <slot v-else name="view">
      <div class="view-wrapper">
        {{ truncateText(modelValue, truncate) }}
      </div>
    </slot>
  </td>
</template>

<style scoped>
td {
  padding: 0 !important;
  position: relative;
  height: 100%;
}

.view-wrapper {
  padding: 0.5rem 0.75rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.edit-input {
  width: 100%;
  height: 100%;
  background: #2a2a2a;
  color: #fff;
  border: 1px solid var(--primary-color);
  padding: 0.5rem 0.75rem;
  outline: none;
  box-sizing: border-box;
}

.custom-select-container {
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  min-width: 100%;
  z-index: calc(var(--base-index) + 10);
  background: #2a2a2a;
  border: 1px solid var(--primary-color);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.dropdown-list {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-list::-webkit-scrollbar {
  width: 6px;
}
.dropdown-list::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.dropdown-list::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;
}
.dropdown-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

.dropdown-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  color: #ccc;
  text-align: left;
  transition:  0.1s;
}

.dropdown-item:hover {
  background-color: var(--primary-color);
  color: #000;
}

.dropdown-item.selected {
  background-color: #333;
  color: var(--primary-color);
}
</style>