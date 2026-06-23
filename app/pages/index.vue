<script setup lang="ts">

</script>

<template>
  <div class="main" id="main">
    <DynTitle />
    <div class="budget-container" id="budget-container">
      <h1 class="budget" id="budget">Budget: init-failed!</h1>
    </div>
    <div class="games" id="games">
      <div class="game-cont" id="coinflip-game-cont">
        <Coinflip />
        <div class="btn-cont" id="coinflip-btn-cont">
          <button class="bet btn" id="coinflip-bet">
            Bet
          </button>
          <button class="play btn" id="coinflip-play">
            Roll
          </button>
        </div>
      </div>
      <div class="game-cont" id="roulette-game-cont">
        <Roulette />
        <div class="btn-cont" id="roulette-btn-cont">
          <button class="bet btn" id="roulette-bet">
            Bet
          </button>
          <button class="play btn" id="roulette-play">
            Roll
          </button>
        </div>
      </div>
      <div class="game-cont" id="Placeholder-game-cont">
        <Placeholder />
        <div class="btn-cont" id="placeholder-btn-cont">
          <button class="bet btn" id="Placeholder-bet">
            Bet
          </button>
          <button class="play btn" id="Placeholder-play">
            Roll
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  //border: 1px solid black;
}
.main {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  width: 100vw; height: 100vh;
  background: #F7F1DE;
  overflow: hidden;
  gap: 20px;
}

.games {
  display: flex; flex-direction: row; justify-content: center; align-items: center;
  gap: 100px;
}

.game-cont {
  display: flex; flex-direction: column; justify-content: space-around; align-items: center;
  gap: 20px;
}

.btn-cont {
  display: flex; flex-direction: row; justify-content: center; align-items: center;
  width: 100%;
  gap: 20px;
}

.bet {
  background: #FF97D0;
}
.play {
  background: #4274D9;
}

.btn {
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  width: 130px; height: 50px;
  cursor: pointer;
  border: none;
}

.budget-container {
  display: flex; flex-direction: row; justify-content: center; align-items: center;
  gap: 10px;
}

.budget {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}
</style>