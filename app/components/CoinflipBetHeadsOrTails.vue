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
  color: white;
  margin-bottom: 60px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  //font-family: 'Roboto', monospace;
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
  padding-bottom: 40px;
}

.button {
  padding: 20px 10px;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  height: 100px;
  color: #4E220F;
}

.heads { background: #FFD400; }
.tails { background: #FF0052; }

</style>