<script setup lang="ts">
import { ref } from 'vue';

const nr = ref('');
const chips = ['zero', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 'Black', 'Red'];

const emit = defineEmits<{
  (e: 'select-entry', value: string): void
}>();

function getTileColor(chip: string | number) {
  if (chip === 'zero') return 'zero-green';
  if (chip === 'Red') return 'odd-red';
  if (chip === 'Black') return 'even-black';
  return Number(chip) % 2 === 0 ? 'even-black' : 'odd-red';
}

function handleBet() {
  if (!nr.value) {
    alert("Please select an entry to place your bet!");
    return;
  }
  emit('select-entry', nr.value);
}
</script>

<template>
  <div class="modal-card-container">
    <h1 class="title">What number do you want to bet?</h1>
    <div class="selection-grid">
      <button
          v-for="chip in chips"
          :key="chip"
          @click="nr = String(chip)"
          :class="[
            'chip-button',
            getTileColor(chip),
            {
              'zero-row': chip === 'zero',
              'half-row-black': chip === 'Black',
              'half-row-red': chip === 'Red',
              active: nr === String(chip)
            }
          ]"
      >
        {{ chip }}
      </button>
    </div>
    <h1 class="odds" id="odds">
      Payout: {{ nr === 'zero' ? '35:1' : nr === 'Black' || nr === 'Red' ? '1:1' : '35:1' }}
    </h1>
    <button @click="handleBet" class="bet-btn">Select</button>
  </div>
</template>

<style scoped>
.modal-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #9D6638;
  width: 600px;
  height: 800px;
  padding: 40px;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  border-radius: 22px;
  border: 2px solid #4E220F;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.title {
  color: white;
  margin-bottom: 10px;
  text-align: center;
}

.odds {
  color: #fff;
  font-size: 1.3rem;
  margin-top: 15px;
  margin-bottom: 0;
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.chip-button {
  width: 100%;
  padding: 15px 0;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  color: white;
  transition: all 0.2s ease;
}

.zero-row { grid-column: span 6; }
.half-row-black { grid-column: span 3; }
.half-row-red { grid-column: span 3; }

.zero-green { background: #2E7D32; }
.odd-red { background: #D32F2F; }
.even-black { background: #1A1A1A; }

.chip-button:hover {
  filter: brightness(1.2);
  transform: translateY(-1px);
}

.chip-button.active {
  outline: 3px solid #FFFFFF;
}

.bet-btn {
  margin-top: 20px;
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

.bet-btn:hover { background: #331508; }
</style>