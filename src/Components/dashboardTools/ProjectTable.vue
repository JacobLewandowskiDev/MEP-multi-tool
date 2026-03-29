<script setup>
</script>

<template>
    <table class="summary">
        <thead>
            <tr>
                <th rowspan="2">#</th>
                <th rowspan="2">PROJECT STATUS</th>
                <th rowspan="2">PROJECT NAME</th>
                <th class="important-group" rowspan="2">NOTES</th>
                <th rowspan="2">US STATE</th>
                <th rowspan="2">CLIENT NAME</th>
                <th rowspan="2">RESOURCE CODE</th>
                <th rowspan="2">PROJECT TYPE</th>
                <th rowspan="2">TRADES</th>
                <th rowspan="2">PM</th>
                <th rowspan="2">GEC ALLOWED?</th>
                <th rowspan="2">LEAD ENGINEER</th>
                <th rowspan="2">ASSISTING ENGINEERS</th>
                <th rowspan="2">QA/QC ENGINEER</th>
                <th rowspan="2">PE SIGN/SEAL</th>
                <th rowspan="2">BUDGET HOURS</th>
                
                <th colspan="2" class="important-group">NEAREST DEADLINE</th>
                <th rowspan="2">BODR</th>
                <th rowspan="2">30% ID</th>
                <th rowspan="2">30% ED</th>
                <th rowspan="2">60% ID</th>
                <th rowspan="2">60% ED</th>
                <th rowspan="2">90% ID</th>
                <th rowspan="2">90% ED</th>
                <th rowspan="2">100% ID</th>
                <th rowspan="2">100% ED</th>
                <th rowspan="2">BID READY ID</th>
                <th rowspan="2">BID READY ED</th>
                <th rowspan="2">REPORT DRAFT</th>
                <th rowspan="2">REPORT FINAL</th>
            </tr>

            <tr>
                <th class="important-group">DEADLINE NAME</th>
                <th class="important-group">DEADLINE DATE</th>
            </tr>
        </thead>
    </table>
</template>


<style scoped>
.summary {
    font-size: 1rem;
    color: #fff;
    background: var(--tool-inner-container-color);
    width: 100%;
}

.summary th {
    border: var(--tool-border);
    padding: 0 .5rem;
    background: var(--tool-background-color);
    color: var(--tool-label-color);
    text-transform: uppercase;
    white-space: nowrap;
    position: sticky;
    top: 0;
    z-index: 10;
}

.important-group {
    background: var(--primary-color-hover) !important;
    letter-spacing: 1px;
    color: #000 !important;
}

.summary td {
    border: var(--tool-border);
    padding: 10px 5px;
    text-align: center;
    white-space: nowrap;
}
</style>