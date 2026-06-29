<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Coinflip from './Coinflip.vue';

const props = withDefaults(
    defineProps<{
      coinSide?: string;
      betAmount?: number;
      isWin?: boolean;
    }>(),
    {
      coinSide: 'Heads',
      betAmount: 0,
      isWin: false
    }
);

const emit = defineEmits(['close']);
const coinflipRef = ref<InstanceType<typeof Coinflip> | null>(null);

const amount = computed(() => `$${props.betAmount ?? 0}`);

const status = computed(() => {
  return props.isWin ? "won" : "lost";
});

onMounted(() => {
  if (coinflipRef.value) {
    const sideToken = (props.coinSide || 'Heads').toLowerCase();
    coinflipRef.value.handleCoinflip(sideToken);
  }
});
</script>

<template>
  <GameModal>
    <div class="cf-anim-wrapper">
      <Coinflip ref="coinflipRef" class="cf-anim" id="cf-anim" />

      <h1 class="data">
        You've {{ status }} {{ amount }}
      </h1>
      <p class="disclaimer">
        *the coin might not be accurate your first roll, it will probably correct if you wait a bit
      </p>
      <button class="continue" @click="emit('close')">
        Continue
      </button>
    </div>
  </GameModal>
</template>

<style scoped>

.cf-anim-wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
button { padding: 20px 10px; font-size: 1.1rem; font-weight: bold; border: none; border-radius: 8px; background: #B0BA99; color: #4E220F; cursor: pointer; transition: all 0.2s ease; }
</style>