<script setup>
const projects = [
  {
    id: 1,
    status: 'ACTIVE',
    name: 'Mahopac MEP Renovation testing long project name wrapping',
    notes: 'Verify pump head calcs',
    state: 'NY',
    client: 'Nexus Development',
    code: 'MEP-2026-001',
    type: 'Commercial',
    trades: 'M/E/P',
    pm: 'Sarah Jenkins',
    gec: 'Yes',
    lead: 'John Doe',
    assist: 'Alex P.',
    qa: 'Kevin Smith',
    seal: 'Required',
    budget: 120,
    deadlineName: '60% Submittal',
    deadlineDate: '2026-04-15',
    milestones: ['2026-03-01', '2026-03-10', '2026-03-12', '2026-03-25', '2026-04-15', '-', '-', '-', '-', '-', '-', '-', '-']
  }, 
    {
        id: 2,
        status: 'ACTIVE',
        name: 'White Plains Office Building',
        notes: 'Coordinate with structural team on beam calcs, also checking for how notes look when they are longer and wrap onto multiple lines',
        state: 'NY',
        client: 'Nexus Development',
        code: 'MEP-2026-002',
        type: 'Commercial',
        trades: 'M/E/P',
        pm: 'Sarah Jenkins',
        gec: 'Yes',
        lead: 'John Doe',
        assist: 'Alex P.',
        qa: 'Kevin Smith',
        seal: 'Required',
        budget: 150,
        deadlineName: '90% Submittal',
        deadlineDate: '2026-05-20',
        milestones: ['2026-03-15', '2026-04-01', '2026-04-10', '2026-04-30', '2026-05-20', '-', '-', '-', '-', '-', '-', '-', '-']
    }
];

const truncateText = (text, limit = 60) => {
  if (!text) return '-';
  const str = String(text);
  return str.length > limit ? str.substring(0, limit) + '...' : str;
};
</script>

<template>
  <div class="table-container">
    <table class="summary">
      <colgroup>
        <col style="width: 1rem;"> 
        <col style="width: 12rem;"> 
        <col style="width: 14rem;"> 
        <col style="width: 30rem;"> 
        <col v-for="n in 12" :key="'base-' + n" style="width: 14rem;"> 
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

          <th class="important-group">DEADLINE NAME</th>
          <th class="important-group">DEADLINE DATE</th>

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
        <tr v-for="project in projects" :key="project.id">
            <td class="sticky-id">{{ project.id }}</td>
            <td class="sticky-status"><span class="status-tag" :title="project.status">{{ project.status }}</span></td>

            <td class="sticky-name text-left" :title="project.name">
                {{ truncateText(project.name, 60) }}
            </td>
            <td class="important-group text-left" :title="project.notes">
                {{ truncateText(project.notes, 60) }}
            </td>

            <td :title="project.state">{{ project.state }}</td>
            <td :title="project.client">{{ truncateText(project.client, 60) }}</td>
            <td :title="project.code">{{ project.code }}</td>
            <td :title="project.type">{{ project.type }}</td>
            <td :title="project.trades">{{ project.trades }}</td>
            <td :title="project.pm">{{ project.pm }}</td>
            <td :title="project.gec">{{ project.gec }}</td>
            <td :title="project.lead">{{ project.lead }}</td>
            <td :title="project.assist">{{ truncateText(project.assist, 60) }}</td>
            <td :title="project.qa">{{ project.qa }}</td>
            <td :title="project.seal">{{ project.seal }}</td>
            <td>{{ project.budget }}</td>

            <td class="important-group" :title="project.deadlineName">
                {{ truncateText(project.deadlineName, 60) }}
            </td>
            <td class="important-group" :title="project.deadlineDate">
                {{ project.deadlineDate }}
            </td>

            <td v-for="(date, index) in project.milestones" :key="index" :title="date">
                {{ date }}
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

.summary {
  font-size: 0.85rem;
  color: #fff;
  background: var(--tool-inner-container-color);
  border-collapse: collapse;
  table-layout: fixed;
  width: max-content;
  min-width: 100%;
}

.summary th {
  border-right: var(--tool-border);
  border-bottom: var(--tool-border);
  padding: 12px 12px;
  background: var(--tool-background-color);
  color: #fff;
  text-transform: uppercase;
  white-space: normal;
  position: sticky;
  top: 0;
  z-index: 10;
  height: 3rem;
  vertical-align: middle;
  font-size: .95rem;
}

.important-group {
  background: var(--primary-color-hover) !important;
  color: #000 !important;
}

.summary thead th {
  z-index: 20;
}

.summary td {
  border: var(--tool-border);
  padding: .5rem .2rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--tool-label-color);
}

.text-left {
  text-align: left !important;
  padding-left: 15px !important;
}

.status-tag {
  background: #2add6f;
  padding: .25rem .75rem;
  border-radius: .25rem;
  font-weight: bold;
  font-size: 0.75rem;
  color: #000;
}

.sticky-id, 
.sticky-status, 
.sticky-name {
  position: sticky !important;
  background-color: var(--tool-inner-container-color) !important; 
  z-index: 5;
}

.sticky-id     { left: -0.05rem; }
.sticky-status { left: 2rem; }
.sticky-name   { left: 13.8rem; }

thead th.sticky-id, 
thead th.sticky-status, 
thead th.sticky-name {
  z-index: 50;
  background-color: var(--tool-background-color) !important;
  top: 0;
}

.summary tr:nth-child(even) td.sticky-id,
.summary tr:nth-child(even) td.sticky-status,
.summary tr:nth-child(even) td.sticky-name {
    background-color: var(--tool-background-color) !important;
}

.sticky-name {
  border-right: 2px solid rgba(255, 255, 255, 0.1) !important;
}
</style>