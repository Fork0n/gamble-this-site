<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isSpinning = ref<boolean>(false);
const rotationZ = ref<number>(0);

const TOTAL_SLICES = 13;
const SLICE_ANGLE = 360 / TOTAL_SLICES;

function handleDecoWheelSpin() {
  rotationZ.value = 0;
}

function handleWheelSpin(winningNumber: string) {
  // here uhm we need the same things that make the coin flip but this tine to rol lthe wheel
  //also like we need to import the data: winning number, bet amount and bet nr/color

  //then we need to output the thing with like emit and stuff? or do we
  //ig yes because we will need to display the stuff like "you won/lost $amount" and stuff like that

  //after this is done i might need to make the website get worse if i'm not lazy

  if (isSpinning.value) return;
  isSpinning.value = true;

  const num = Number(winningNumber);
  let targetSlice = 0;

  if (num === 0) {
    targetSlice = 0;
    //and ofc since the top of the sprite is zero we need to make sure that slice 0 is zero, quite a coincidence
  } else if (num % 2 !== 0) {
    // Red numbers are odd 1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35
    // that gives us 6 nr groups of 3 nrs each
    // (slices/sections: 1, 3, 5, 7, 9, 11)
    if (num <= 6) targetSlice = 1;       // 1, 3, 5
    else if (num <= 12) targetSlice = 3;  // 7, 9, 11
    else if (num <= 18) targetSlice = 5;  // 13, 15, 17
    else if (num <= 24) targetSlice = 7;  // 19, 21, 23
    else if (num <= 30) targetSlice = 9;  // 25, 27, 29
    else targetSlice = 11;                // 31, 33, 35
  } else {
    // Black numbers are even 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36
    // that gives us 6 nr groups of 3 nrs each
    // (slices/sectiopns: 2, 4, 6, 8, 10, 12)
    if (num <= 6) targetSlice = 2;       // 2, 4, 6
    else if (num <= 12) targetSlice = 4;  // 8, 10, 12
    else if (num <= 18) targetSlice = 6;  // 14, 16, 18
    else if (num <= 24) targetSlice = 8;  // 20, 22, 24
    else if (num <= 30) targetSlice = 10; // 26, 28, 30
    else targetSlice = 12;                // 32, 34, 36
  }
  //i'm not entirely sure if ^^^ will work, i guess it's better than nothing, right?
  //also it's a really intresting coincidence that red (odd ones) take the odd slices and black (even ones) take the even slices and zero takes the 0 (first slice) *ba dum tsss*

  const targetAngleOffset = 360 - (targetSlice * SLICE_ANGLE) + 90;

  const duration = 4000;
  const baseSpins = 13;
  const currentRotation = rotationZ.value % 360;

  const totalRotation = (360 * baseSpins) + targetAngleOffset - currentRotation;

  const startRotation = rotationZ.value;
  const startTime = performance.now();

  function animate(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);

    rotationZ.value = startRotation + (totalRotation * ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning.value = false;
    }
  }

  requestAnimationFrame(animate);
}

onMounted(() => {
  handleDecoWheelSpin();
})

defineExpose({
  handleWheelSpin
})
</script>

<template>
  <div class="roulette-wrapper">
    <div
        class="roulette-container"
        id="roulette-container"
        :style="{ transform: `rotateZ(${rotationZ}deg)` }"
    >
      <img src="/TheFallenAngel.jpg" alt="the wheel" class="wheel" id="wheel">
    </div>
  </div>
</template>

<style scoped>
.roulette-wrapper {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.roulette-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-style: preserve-3d;
  will-change: transform;
}

.wheel {
  width: 100%;
  height: 100%;
  -webkit-user-drag: none;
}
</style>