<template>
  <div v-if="hasRole(CHATBOT_ROLES)" class="col col-h">
    <router-link :to="{ name: 'chatbot-conversaciones' }">
      <div class="d-flex flex-column justify-content-between rounded-top bg-white">
        <div class="column d-flex flex-row justify-content-between p-3 text-secondary link-success">
          <div class="d-flex justify-content-center align-items-center shrink-0 icon rounded overflow-hidden">
            <!-- <i class="pi pi-comments text-white fs-2" aria-hidden="true"></i> -->
            <img src="../assets/bot.png" alt="Chatbot Icon" class="w-100 rounded" />
          </div>
          <div class="title-column">
            <p>Conservaciones del chatbot</p>
          </div>
        </div>
      </div>
      <!-- <div class="column-question text-end px-4 bg-white text-secondary">Conversaciones del chatbot</div> -->
      <div class="column-question text-center h-10 d-flex justify-content-between align-items-center px-4 bg-white">
        <span class="fs-6 text-secondary"></span>
        <span class="fs-6 text-secondary">
          <div id="tooltip" data-toggle="tooltip" data-placement="right"
            title="Aquí podrás ver todas las conversaciones que han tenido los usuarios con el chatbot.">
            <i class="pi pi-question-circle" aria-hidden="true"></i>
          </div>
        </span>
      </div>
      <div
        class="column-bottom text-center h-10 d-flex justify-content-between align-items-center rounded-bottom px-4 bg-light">
        <span class="fs-6 text-secondary">1.0.0</span>
        <span class="fs-6 text-secondary">CCHT</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { hasRole } from '@/services/roles';
import { CHATBOT_ROLES } from '@/utils/chatbotHistory';
</script>
