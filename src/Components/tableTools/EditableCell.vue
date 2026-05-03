<script setup>
import { nextTick, ref, watch } from 'vue';
import { truncateText, vClickOutside } from '../data/constants';

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text'},
  options: { type: Array, default: () => [] },
  title: String,
  truncate: { type: Number, default: 60 },
  justify: { type: String, default: 'left' },
  max: { type: [Number, String], default: null },
  numeric: { type: Boolean, default: false },
  multi: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'open-popup', 'start-edit', 'stop-edit']);

const isEditing = ref(false);
const inputRef = ref(null);

const startEdit = async () => {
  if (props.type === 'popup') {
    emit('open-popup');
    return;
  }
  isEditing.value = true;
  emit('start-edit');
  await nextTick();
  inputRef.value?.focus();
};

const handleInput = (event) => {
  let val = event.target.value;

  if (props.numeric) {
    val = val.replace(/\D/g, '');
    event.target.value = val;
  }
  emit('update:modelValue', val);
};

const handleSave = (val) => {
  if (!isEditing.value) return;
  emit('update:modelValue', val);
  isEditing.value = false;
  emit('stop-edit');
};

const handleClickOutside = () => {
  if (isEditing.value) {
    isEditing.value = false;
    emit('stop-edit');
  }
};

const handleSelect = (val) => {
  if (props.multi) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValues.indexOf(val);
    
    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(val);
    }
    emit('update:modelValue', currentValues);
  } else {
    handleSave(val); 
  }
};

watch(isEditing, async (newValue) => {
  if (newValue) {
    await nextTick();
    inputRef.value?.focus();
    if (props.type === 'date' && inputRef.value?.showPicker) {
      inputRef.value.showPicker();
    }
  }
});
</script>

<template>
  <td 
  ref="cellRef"
  v-click-outside="handleClickOutside"
  :title="title || modelValue" 
  @click.stop="startEdit"  :class="{ 'is-editing': isEditing }"
>
    <div v-if="isEditing && type === 'select'" class="custom-select-container">
      <div class="dropdown-list">
        <div 
          v-for="opt in options" 
          :key="opt.value" 
          class="dropdown-item"
          :class="{ 'selected': props.multi 
            ? (Array.isArray(modelValue) && modelValue.includes(opt.value))
            : opt.value === modelValue 
          }"
          @click.stop="handleSelect(opt.value)"
        >
          <input 
            v-if="multi" 
            type="checkbox" 
            :checked="Array.isArray(modelValue) && modelValue.includes(opt.value)" 
            @click.stop 
            style="margin-right: 8px;"
          />
          {{ opt.label }}
        </div>
      </div>
    </div>

    <input
      v-else-if="isEditing && type === 'text'"
      ref="inputRef"
      type="text"
      :maxlength="max"
      :value="modelValue"
      @input="handleInput"  @blur="isEditing = false"
      @keyup.enter="handleSave($event.target.value)"
      @click.stop 
      class="edit-input"
    />

    <input
        v-if="type === 'date'"
        ref="inputRef"
        type="date"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="isEditing = false"
        @keyup.enter="isEditing = false"
        class="edit-input date-input"
    />

    <slot v-else name="view">
      <div 
        class="view-wrapper" 
        :style="{ justifyContent: justify === 'center' ? 'center' : 'flex-start' }"
      >
        {{ 
          Array.isArray(modelValue) 
            ? truncateText(modelValue.join(', '), truncate) 
            : truncateText(modelValue, truncate) 
        }}
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
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.date-input {
  background: none;
  color: var(--tool-label);
  border: none;
  width: 100%;
  font-size: .9rem;
  text-align: center;
  cursor: pointer;
  color-scheme: dark;
}

.date-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
  display: none;
}

.date-input:focus {
  border: 1px solid var(--primary-color);
}
</style>