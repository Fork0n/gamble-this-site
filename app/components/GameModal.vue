<template>
  <div class="modal-card-container">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.modal-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #9D6638;
  width: 600px;
  padding: 40px;
  box-sizing: border-box;

  font-family: sans-serif;

  border-radius: 22px;
  border: 2px solid #4E220F;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  flex-shrink: 0;
}


</style>