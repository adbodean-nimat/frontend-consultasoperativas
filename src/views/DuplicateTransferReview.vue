<template>
  <div class="review-page">
    <div class="container-fluid d-flex flex-column min-vh-100">
      <div class="encabezado-titulo">
        <div style="margin-left: 5px; color: white;" class="icon-title">
          <i class="pi pi-search text-white" style="font-size: 1rem"></i>
          <span class="ms-2 text-white">Consulta de transferencias duplicadas</span>
        </div>
      </div>
      <Toast position="bottom-right" />
      <div>
        <DuplicateTransferReviewPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import Toast from "primevue/toast";
import DuplicateTransferReviewPanel from "@/components/DuplicateTransferReviewPanel.vue";
</script>

<style scoped>
.review-page {
  min-height: 100vh;
  background-color: currentColor;
}
</style>
