<script setup>
import { ref } from 'vue';
import { usStates, statusOptions, truncateText } from '../data/constants';
import EditableCell from '../tableTools/EditableCell.vue';

const projects = ref([
  {
    id: 1,
    status: 'ACTIVE LIGHT',
    name: 'Mahopac MEP Renovation testing long project name wrapping',
    notes: 'Verify pump head calcs',
    state: 'NY',
    client: 'Nexus Development',
    code: 'MEP-2026-001',
    type: 'REPORT',
    trades: 'M/E/P',
    pm: 'Sarah Jenkins',
    gec: 'NO',
    lead: 'John Doe',
    assist: 'Alex P.',
    qa: 'Kevin Smith',
    seal: 'Mark Thompson',
    budget: 120,
    deadlineName: '60% Submittal',
    deadlineDate: '2026-04-15',
    milestones: ['2026-03-01', '2026-03-10', '2026-03-12', '2026-03-25', '2026-04-15', '-', '-', '-', '-', '-', '-', '-', '-']
  }, 
    {
        id: 2,
        status: 'ACTIVE MEDIUM',
        name: 'White Plains Office Building',
        notes: 'Coordinate with structural team on beam calcs, also checking for how notes look when they are longer and wrap onto multiple lines',
        state: 'NY',
        client: 'Nexus Development',
        code: 'MEP-2026-002',
        type: 'DESIGN',
        trades: 'M/E/P',
        pm: 'Sarah Jenkins',
        gec: 'YES',
        lead: 'John Doe',
        assist: 'Alex P.',
        qa: 'Kevin Smith',
        seal: 'Anthony Lee',
        budget: 100,
        deadlineName: '90% Submittal',
        deadlineDate: '2026-05-20',
        milestones: ['2026-03-15', '2026-04-01', '2026-04-10', '2026-04-30', '2026-05-20', '-', '-', '-', '-', '-', '-', '-', '-']
    }
]);

const isNotesOpen = ref(false);
const activeProject = ref(null);
const notesBuffer = ref('');
const editingRowId = ref(null);

const openNotes = (project) => {
  activeProject.value = project;
  notesBuffer.value = project.notes; 
  isNotesOpen.value = true;
};

const saveNotes = () => {
  if (activeProject.value) {
    activeProject.value.notes = notesBuffer.value;
  }
  
  closeNotes();
};

const closeNotes = () => {
  isNotesOpen.value = false;
  activeProject.value = null;
  notesBuffer.value = '';
};

const getStatusClass = (status) => {
  if (!status) return 'status-active-light';
  return 'status-' + status.toLowerCase().replace(/\s+/g, '-');
};
</script>

<template>
  <div class="table-container">
    <table class="summary">
      <colgroup>
        <col style="width: var(--project-id-col-width);"> 
        <col style="width: var(--status-col-width);"> 
        <col style="width: var(--project-name-col-width);"> 
        <col style="width: var(--project-notes-col-width);"> 
        <col v-for="n in 12" :key="'base-' + n" style="width: 6rem;"> 
        <col v-for="n in 2" :key="'deadline-' + n" style="width: 12rem;"> 
        <col v-for="n in 13" :key="'milestone-' + n" style="width: 10rem;"> 
      </colgroup>

      <thead>
        <tr>
          <th class="sticky-id">#</th>
          <th class="sticky-status">PROJECT STATUS</th>
          <th class="sticky-name">PROJECT NAME</th>
          <th class="important-group">NOTES</th>
          <th>US STATE</th>
          <th>CLIENT NAME</th>
          <th>RESOURCE CODE</th>
          <th>PROJECT TYPE</th>
          <th>TRADES</th>
          <th>PROJECT MANAGER</th>
          <th>GEC ALLOWED?</th>
          <th>LEAD ENGINEER</th>
          <th>ASSISTING ENGINEERS</th>
          <th>QA/QC ENGINEER</th>
          <th>PE SIGN/SEAL</th>
          <th>BUDGET HOURS</th>

          <th class="important-group">NEAREST DEADLINE NAME</th>
          <th class="important-group">NEAREST DEADLINE DATE</th>

          <th>BODR</th>
          <th>30% ID</th>
          <th>30% ED</th>
          <th>60% ID</th>
          <th>60% ED</th>
          <th>90% ID</th>
          <th>90% ED</th>
          <th>100% ID</th>
          <th>100% ED</th>
          <th>BID READY ID</th>
          <th>BID READY ED</th>
          <th>REPORT DRAFT</th>
          <th>REPORT FINAL</th>
        </tr>
      </thead>

      <tbody>
         <tr 
          v-for="(project, index) in projects" 
          :key="project.id"
          :style="{ zIndex: 10000 - index }"
          :class="{ 'is-editing-row': editingRowId === project.id }"
        >
            <td class="sticky-id">
              {{ project.id }}
            </td>

            <EditableCell 
              v-model="project.status"
              type="select" 
              :options="statusOptions"
              class="sticky-status"
              @start-edit="editingRowId = project.id"
              @stop-edit="editingRowId = null"
            >
              <template #view> 
                <span class="status-tag" :class="getStatusClass(project.status)">
                  {{ project.status }}
                </span>
              </template>
            </EditableCell>
            
            <EditableCell v-model="project.name" class="sticky-name text-left" />

            <td class="important-group text-left summary__notes" 
                :title="project.notes" 
                @click="openNotes(project)">
                {{ truncateText(project.notes, 90) }}
            </td>

            <EditableCell 
              v-model="project.state" 
              type="select" 
              :options="usStates.map(s => ({ label: s.name, value: s.abbreviation }))" 
            />

            <!-- <td :title="project.client">{{ project.client }}</td>
            <td :title="project.code">{{ project.code }}</td>
             <td @click="startEdit(project.id, 'type')">
              <select
                v-if="editingCell.id === project.id && editingCell.field === 'type'"
                v-model="project.type"
                @blur="stopEdit"
                @change="stopEdit" 
                v-focus
                class="edit-select"
                placeholder="project.type"
              >
                <option value="-">-</option>
                <option value="DESIGN">DESIGN</option>
                <option value="REPORT">REPORT</option>
                <option value="QA/QC REVIEW">QAQC REVIEW</option>
                <option value="CONSTRUCTION">CONSTRUCTION</option>
              </select>

              <span 
                v-else 
                :title="project.type"
              >
                {{ project.type }}
              </span>
            </td>
            <td :title="project.trades">{{ project.trades }}</td>
            <td :title="project.pm">{{ project.pm }}</td>
            <td @click="startEdit(project.id, 'gec')">
              <select
                v-if="editingCell.id === project.id && editingCell.field === 'gec'"
                v-model="project.gec"
                @blur="stopEdit"
                @change="stopEdit" 
                v-focus
                class="edit-select"
              >
                <option value="-">-</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>

              <span 
                v-else 
                :title="project.gec"
              >
                {{ project.gec }}
              </span>
            </td>
            <td :title="project.lead">{{ project.lead }}</td>
            <td :title="project.assist">{{ project.assist}}</td>
            <td :title="project.qa">{{ project.qa }}</td>
            <td :title="project.seal">{{ project.seal }}</td>
            <td>{{ project.budget }}</td>

            <td class="important-group" :title="project.deadlineName">
                {{ project.deadlineName }}
            </td>
            <td class="important-group" :title="project.deadlineDate">
                {{ project.deadlineDate }}
            </td>

            <td v-for="(date, index) in project.milestones" :key="index" :title="date">
                {{ date }}
            </td> -->
        </tr>
      </tbody>
    </table>
    <div v-if="isNotesOpen" class="notes-overlay" @click.self="isNotesOpen = false">
  <div class="notes-modal">
    <div class="modal-header">
      <h3>Project Notes For: {{ activeProject.name }}</h3>
      <button @click="isNotesOpen = false" class="close-btn">        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
      </button>
    </div>
    
    <textarea 
      v-model="notesBuffer" 
      class="notes-textarea"
      placeholder="Enter detailed coordination notes..."
    ></textarea>

    <div class="modal-actions">
      <button @click="closeNotes" class="btn-cancel">Cancel</button>
      <button @click="saveNotes" class="btn-save">Save Changes</button>
    </div>
  </div>
</div>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-behavior: auto !important;
  -webkit-overflow-scrolling: auto;
}

.summary {
  font-size: 0.85rem;
  color: var(--tool-label-color);
  background: var(--tool-inner-container-color);
  border-collapse: separate; 
  border-spacing: 0; 
  table-layout: fixed;
  width: max-content;
  min-width: 100%;
  text-align: center;
}

.summary th, 
.summary td {
  border-right: var(--tool-border);
  border-bottom: var(--tool-border);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary td {
  cursor: pointer;
}

.summary td:hover {
  color: #fff;
}

.summary td:hover:first-child {
  color: var(--tool-label-color);
}

.summary__notes {
  padding: 0 0.5rem;
}

.summary th {
  background: var(--tool-background-color);
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 20;
  height: 3rem;
  vertical-align: middle;
  font-size: 0.95rem;
  color: #cecece;
}

.summary tr:nth-child(even) {
  background-color: var(--table-row-color);
}

.sticky-id, 
.sticky-status, 
.sticky-name {
  position: sticky !important;
  z-index: inherit;
  background-color: var(--tool-inner-container-color);
}

.sticky-name {
  width: 30rem;
}

.sticky-id     { left: 0; }
.sticky-status { left: 2rem; }
.sticky-name   { left: 14rem; }

thead th.sticky-id     { left: 0; }
thead th.sticky-status { left: 2rem; }
thead th.sticky-name   { left: 14rem; }

.summary tr:nth-child(even) :is(.sticky-id, .sticky-status, .sticky-name) {
    background-color: var(--table-row-color) !important;
}

thead th:is(.sticky-id, .sticky-status, .sticky-name) {
  z-index: 50;
  background-color: var(--tool-background-color) !important;
}

.important-group {
  background: var(--important-color) !important;
  color: #000 !important;
}

.text-left {
  text-align: left !important;
}

.status-tag {
  display: inline-block;
  min-width: 95%;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
}

.sticky-name {
  border-right: var(--tool-border) !important;
}

.edit-select {
  width: 100%;
  height: 100%;
  background: #2a2a2a;
  color: #fff;
  border: 1px solid var(--tool-border);
  border-radius: 4px;
  padding: 0.2rem 0;
  font-size: 0.8rem;
  outline: none;
}

.edit-select::-webkit-scrollbar {
    width: .5rem;
}

.edit-select::-webkit-scrollbar-track {
    background: transparent; 
}

.edit-select::-webkit-scrollbar-thumb {
    background-color: var(--primary-color); 
    border-radius: 10px;
    border: 2px solid var(--tool-background-color); 
}

.edit-select::-webkit-scrollbar-thumb:hover {
    filter: brightness(0.8);
}

.status-active-light          { background-color: #5fa359; color: #000; }
.status-active-medium         { background-color: #218018; color: #fff; }
.status-active-heavy          { background-color: #0b5305; color: #fff; }
.status-on-hold               { background-color: #a57e0b; color: #fff; }
.status-in-construction       { background-color: #93549b; color: #fff; }
.status-bidding               { background-color: #1c76ad; color: #000; }
.status-completed             { background-color: #5a5a5a; }


.notes-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Dims the table */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}

.notes-modal {
  background: var(--tool-background-color);
  border: var(--tool-border);
  width: 60vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.notes-textarea {
  flex: 1;
  background: var(--tool-inner-container-color);
  color: var(--tool-label-color);
  border: 1px solid var(--tool-border);
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  margin: 1rem 0;
  line-height: 1.5;
}

.notes-textarea:focus {
  border-color: #be7237;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.btn-save {
  background: var(--primary-color);
  color: #000;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: .2s ease;
}

.btn-cancel {
  background: var(--tool-label-color);
  color: #000;
  border: 1px solid #444;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn {
  width: 2rem;
  fill: var(--primary-color);
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.close-btn:hover {
  fill: var(--primary-color-hover);
}

.btn-save:hover {
  background: var(--primary-color-hover);
}
</style>