<!-- src/components/ChatBot.vue -->
<template>
  <div class="chatbot">
    <div class="chat-messages">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
        <strong>{{ msg.role === 'user' ? 'Tú' : 'Bot' }}:</strong> {{ msg.text }}
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="chat-input">
      <input v-model="input" type="text" placeholder="Escribe tu pregunta..." required />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  data() {
    return {
      input: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage() {
      const userMessage = this.input.trim();
      if (!userMessage) return;

      // Agregar mensaje del usuario
      this.messages.push({ role: "user", text: userMessage });

      // Limpiar input
      this.input = "";

      try {
        // Llamada al backend
        const res = await fetch("http://localhost:3000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await res.json();

        // Agregar respuesta del bot
        this.messages.push({ role: "bot", text: data.answer || "Sin respuesta" });
      } catch (err) {
        console.error("Error en chatbot:", err);
        this.messages.push({
          role: "bot",
          text: "❌ Error al conectar con el servidor.",
        });
      }
    },
  },
};
</script>

<style scoped>
.chatbot {
  border: 1px solid #ccc;
  padding: 10px;
  max-width: 500px;
}

.chat-messages {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 5px;
}

.message.user {
  text-align: right;
  color: blue;
}

.message.bot {
  text-align: left;
  color: green;
}

.chat-input {
  display: flex;
  gap: 5px;
}

.chat-input input {
  flex: 1;
  padding: 5px;
}
</style>