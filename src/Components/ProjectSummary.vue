<script setup>
</script>

<template>
    <div class="project-summary">
        <h3>Project Summary</h3>
        <p><strong>Project Name:</strong> <span>Project Alpha</span></p>
        <p><strong>Status:</strong> <span>Active</span></p>
        <p><strong>Deadline:</strong> <span>2024-12-31</span></p>
        <div class="team-section">
            <strong>Team Members:</strong>
            <p>John Doe, Jane Smith, Bob Johnson</p>
        </div>
    </div>
</template>

<style scoped>
.project-summary {
    background: var(--tool-background-color);
    border: var(--tool-border);
    padding: 1.25rem;
    border-radius: 0.5rem;
    color: var(--tool-label-color);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header Styling */
.project-summary h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
    color: #fff;
    letter-spacing: 0.02rem;
}

/* The Data Rows */
.project-summary p {
    margin: 0;
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.4;
}

/* Bold Labels for an Engineering "Spec Sheet" Look */
.project-summary p::before {
    content: attr(data-label); /* Optional: if you move labels to attributes */
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.75rem;
    opacity: 0.7;
    margin-right: 1rem;
}

/* Team Members Section (Handling longer text) */
.project-summary p:last-of-type {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

/* Specific highlight for Status */
.project-summary p:nth-of-type(2) {
    color: #2ecc71; /* Success Green for "Active" */
    font-weight: bold;
}
</style>