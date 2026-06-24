<script setup lang="ts">
import { ref } from 'vue';

const amount = ref(0);
const chips = [50, 100, 150, 200, 250, 300, 500, 750, 1000];

const emit = defineEmits<{
  (e: 'submit-bet', value: number): void
}>();

function handleBet() {
  if (amount.value <= 0) {
    alert("Please enter a valid bet amount!");
    return;
  }
  emit('submit-bet', amount.value);
}
</script>

<template>
  <div class="modal-card-container">
    <h1 class="title">What amount do you want to bet?</h1>
    <div class="selection-grid">
      <button
          v-for="chip in chips"
          :key="chip"
          @click="amount = chip"
          :class="['chip-button', { active: amount === chip }]"
      >
        {{ chip }}
      </button>
    </div>

    <input type="number" v-model.number="amount" class="amount-input" placeholder="eg: 67">

    <button @click="handleBet" class="bet-btn">Bet</button>
  </div>
</template>

<style scoped>
.modal-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
  background: #9D6638;
  width: 600px;
  padding: 40px;
  box-sizing: border-box;
  font-family: sans-serif;
  border-radius: 22px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid #4E220F;
  flex-shrink: 0;
}

.title {
  color: white;
  margin-bottom: 30px;
  text-align: center;
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  margin-bottom: 30px;
}

.chip-button {
  padding: 20px 10px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background: #B0BA99;
  color: #4E220F;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-button:hover {
  background: #88BDA4;
  transform: translateY(-2px);
}

.chip-button.active {
  background: #fff;
  color: #9D6638;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.amount-input {
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  border: 2px solid #fff;
  border-radius: 8px;
  text-align: center;
  outline: none;
  box-sizing: border-box;
}

.bet-btn {
  margin-top: 35px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background: #4E220F;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.bet-btn:hover {
  background: #331508;
}
</style>