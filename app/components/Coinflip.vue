<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const coin = ref("heads");
const state = ref("normal");
const isFlipping = ref(false);

const rotationX = ref(0);
const heightZ = ref(0);
const scale = ref(1);

const flipCoin = (): string => {
  return Math.random() < 0.5 ? "heads" : "tails";
};

function handleDecoCoinflip() {
  coin.value = flipCoin();
}

// Accept the forced result from the parent
function handleCoinflip(finalResult: string) {
  if (isFlipping.value) return;
  isFlipping.value = true;

  const duration = 1200;
  const baseFlips = 5;
  const totalRotation = baseFlips * 360;
  const startTime = performance.now();

  function animate(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);

    rotationX.value = totalRotation * ease;
    heightZ.value = Math.sin(progress * Math.PI) * 150;
    scale.value = 1 + Math.sin(progress * Math.PI) * 0.2;

    // Mid-way through the flip, force the image to reflect the actual game outcome
    if (progress >= 0.5 && coin.value !== finalResult) {
      coin.value = finalResult;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rotationX.value = 0;
      heightZ.value = 0;
      scale.value = 1;
      isFlipping.value = false;
    }
  }

  requestAnimationFrame(animate);
}

const coinImagePath = computed(() => {
  return `/coins/${state.value}/${coin.value}.png`;
});

onMounted(() => {
  handleDecoCoinflip();
});

// EXPOSE this function so the modal can call it
defineExpose({
  handleCoinflip
});
</script>

<template>
  <div class="coinflip-wrapper">
    <div
        class="coinflip-container"
        id="coinflip-container"
        :style="{
          transform: `translateZ(${heightZ}px) rotateX(${rotationX}deg) scale(${scale})`
        }"
    >
      <img :src="coinImagePath" alt="coinflip" class="coin" id="coin">
    </div>
  </div>
</template>

<style scoped>
.coinflip-wrapper {
  perspective: 1000px;
  width: 300px;
  height: 300px;
}

.coinflip-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;

  transform-style: preserve-3d;
  will-change: transform;
}

.coin {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-drag: none;

  //filter: drop-shadow(0 10px 15px rgba(0,0,0,0.15));
}

.coinflip-wrapper { perspective: 1000px; width: 300px; height: 300px; }
.coinflip-container { width: 100%; height: 100%; border-radius: 50%; transform-style: preserve-3d; will-change: transform; }
.coin { width: 100%; height: 100%; user-select: none; -webkit-user-drag: none; }
</style>