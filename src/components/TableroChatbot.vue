<template>
  <div class="container-page-chatbot">
    <div class="page-content">
      <div class="container-fluid px-4 text-center">
        <h3 class="text-white">Chatbot NIMAT</h3>
        <div class="row row-cols-lg-5 gy-5 mt-2">
          <chatbot-history-card />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatbotHistoryCard from '@/components/ChatbotHistoryCard.vue'
</script>

<style scope>
a {
  text-decoration: none !important;
}

.container-page-chatbot {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: currentColor;
  padding-bottom: 100px;
}

.page-content {
  width: 100%;
  height: auto;
  margin: 50px 0px;
}

.column {
  width: auto;
  height: 100px;
}

.col-h {
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0rem);
}

.col-h:hover {
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
  ;
  transform: translateY(-0.75rem)
}

.title-column {
  color: black;
}

.icon {
  width: 30%;
  background: #007c3b;
}

.icon svg {
  width: 40%;
}

#tooltip {
  cursor: help;
  pointer-events: help;
}

.column-question {
  padding-bottom: 10px
}

.column-bottom {
  height: 40px;
}

@media (max-width: 1366px) {
  .title-column {
    font-size: 14px;
    text-align: right;
  }

  #tooltip svg {
    width: 15px;
    height: 15px;
  }
}
</style>