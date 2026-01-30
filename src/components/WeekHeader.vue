<template>
    <div class="week-header">
        <div class="week-title">{{ params.displayName }}</div>
        <Divider style="margin-top: 0.5rem; margin-bottom: 0.5rem;" />
        <div class="week-range">{{ toDMY(params.rangeFrom) }} a {{ toDMY(params.rangeTo) }}</div>
    </div>
</template>

<script setup>
import Divider from 'primevue/divider';
defineProps({ params: Object });
const toDMY = (v) => {
    if (!v) return null;
    // si ya viene "YYYY-MM-DD", lo convertimos sin timezone
    const s = String(v).slice(0, 10); // "2026-01-25"
    const [yyyy, mm, dd] = s.split("-");
    return `${dd}/${mm}/${yyyy}`;
};
</script>

<style scoped>
.week-header {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    padding: 2px 0;
}

.week-title {
    font-weight: 600;
    font-size: 12px;
    text-align: center;
}

.week-range {
    font-size: 11px;
    opacity: .75;
    white-space: nowrap;
    text-align: center;
}
</style>
