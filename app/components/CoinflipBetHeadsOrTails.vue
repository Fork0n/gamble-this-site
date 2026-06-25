<template>
  <div class="modal-card-container">
    <h1 class="title">
      Heads or Tails?
    </h1>
    <div class="btn-row">
      <button @click="selectSide('Heads')" class="heads button">
        Heads
      </button>
      <button @click="selectSide('Tails')" class="tails button">
        Tails
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'select-choice', choice: string): void
}>();

function selectSide(choice: string) {
  emit('select-choice', choice);
}

</script>

<style scoped>
.title {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: Roboto, sans-serif;
}
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

.btn-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
}

.heads {
  background: #B5BAFF;
  color: #4E220F;
}

.tails {
  background: #D9F9DF;
  color: #4E220F;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.title { color: #fff; font-size: 2rem; margin-bottom: 20px; font-weight: bold; font-family: Roboto, sans-serif; }
.modal-card-container { display: flex; flex-direction: column; align-items: center; justify-content: center; background: #9D6638; width: 600px; padding: 40px; box-sizing: border-box; font-family: sans-serif; border-radius: 22px; border: 2px solid #4E220F; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); flex-shrink: 0; }
.btn-row { display: flex; flex-direction: row; gap: 10px; width: 100%; }
.heads { background: #B5BAFF; color: #4E220F; }
.tails { background: #D9F9DF; color: #4E220F; }
.button { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease; width: 100%; }

</style>