<script setup lang="ts">
import { ref } from 'vue';

const isSpinning = ref<boolean>(false);

function handleWheelSpin() {
  // here uhm we need the same things that make the coin flip but this tine to rol lthe wheel
  //also like we need to import the data: winning number, bet amount and bet nr/color

  //then we need to output the thing with like emit and stuff? or do we
  //ig yes because we will need to display the stuff like "you won/lost $amount" and stuff like that

  //after this is done i might need to make the website get worse if i'm not lazy
}

</script>

<template>
<div class="roulette-container" id="roulette-container">
  <img src="/public/roulette/normal/roulette.png" alt="the wheel" class="wheel" id="wheel"></img>
</div>
</template>

<style scoped>
.roulette-container {
  width: 300px; height: 300px;
  background-color: red;
  border-radius: 50%;
}
</style>