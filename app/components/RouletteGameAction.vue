<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Roulette from './Roulette.vue';

const props = withDefaults(
    defineProps<{
      winningNumber?: string;
      betAmount?: number;
      isWin?: boolean;
      multiplier?: number;
    }>(),
    {
      winningNumber: '0',
      betAmount: 0,
      isWin: false,
      multiplier: 1
    }
);

const emit = defineEmits(['close']);
const rouletteRef = ref<InstanceType<typeof Roulette> | null>(null);

const amount = computed(() => {
  const total = props.isWin ? (props.betAmount * props.multiplier) : props.betAmount;
  return `$${total}`;
});

const status = computed(() => {
  return props.isWin ? "won" : "lost";
});

function handleClose() {
  emit('close', {
    isWin: props.isWin,
    betAmount: props.betAmount,
    multiplier: props.multiplier
  });
}

onMounted(() => {
  if (rouletteRef.value) {
    rouletteRef.value.handleWheelSpin(props.winningNumber);
  }
});
</script>

<template>
  <GameModal>
    <div class="rl-anim-wrapper">

      <div class="roulette-modal-visual-box">
        <Roulette ref="rouletteRef" class="rl-anim" id="rl-anim" />
      </div>

      <h1 class="data">
        Rolled: {{ winningNumber }} — You've {{ status }} {{ amount }}
      </h1>

      <p class="disclaimer">
        *the wheel might not be accurate at all, the code is (i hope)
      </p>

      <button class="continue" @click="handleClose">
        Continue
      </button>
    </div>
  </GameModal>
</template>

<style scoped>
.rl-anim-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.roulette-modal-visual-box {
  position: relative;
  width: 300px;
  height: 300px;
}

.roulette-modal-visual-box::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);

  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 25px solid #E11D48; /* Red/Rose indicator color */

  z-index: 10;
  filter: drop-shadow(-2px 2px 4px rgba(0,0,0,0.2));
}

.data {
  font-family: 'Roboto', sans-serif;
}

.disclaimer {
  font-size: 0.8rem;
  font-weight: 400;
  font-family: "Roboto Mono", monospace;
}

button {
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
</style>