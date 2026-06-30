<script setup lang="ts">

</script>

<template>
  <div class="arr-cont">

  </div>
</template>

<style scoped>
body {
  height: 500px;
  width: 300px
}

.arr-cont {
  width: 200px; height: 420px;
  background-color: mediumorchid;
}

.arr-cont:hover {
  animation: flex 3s ease-in-out infinite;
}

@keyframes flex {
  0% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(-30deg);
  }
}
</style>