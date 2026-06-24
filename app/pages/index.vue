<script setup lang="ts">
//importing components
import { ref, computed } from 'vue';

//vars and stuff and yeah, they work with const because apparently you check the variable.value and not the variable, fine i guess
const budget = ref(1000);
const coinflipBet = ref(0);
const rouletteBet = ref(0);
const placeholderBet = ref(0);
const rouletteSelection = ref<string>('');

//modal related stuff
const showModal = ref(false);
const activeGame = ref<string | null>(null);
const modalStep = ref<number>(1);

//the thing that opens the modal, self explanatory imo
function openBetModal(game: string) {
  activeGame.value = game;
  modalStep.value = 1;
  showModal.value = true;
}

//again i don't really know what this does but it works so i guess it's fine
function saveBet(amount: number) {
  if (activeGame.value === 'coinflip') {
    coinflipBet.value = amount;
    showModal.value = false;
    activeGame.value = null;
  } else if (activeGame.value === 'roulette') {
    rouletteBet.value = amount;
    modalStep.value = 2;
  } else if (activeGame.value === 'placeholder') {
    placeholderBet.value = amount;
    showModal.value = false;
    activeGame.value = null;
  }
}

//idk really, must check later
function saveRouletteChoice(choice: string) {
  rouletteSelection.value = choice;

  showModal.value = false;
  activeGame.value = null;
  modalStep.value = 1;
}

//Display bets on buttons or stuff
const coinflipBetDisplay = computed(() => {
  if (coinflipBet.value === 0) { return 'Bet'}
  else { return '$' + coinflipBet.value}
});

const rouletteBetDisplay = computed(() => {
  if (rouletteBet.value === 0) return 'Bet';
  const entryText = rouletteSelection.value ? ` (${rouletteSelection.value})` : '';
  return '$' + rouletteBet.value + entryText;
});

const placeholderBetDisplay = computed(() => {
  if (placeholderBet.value === 0) { return 'Bet'}
  else { return '$' + placeholderBet.value}
})

//Displays the suffix for the budget, o guess it has potential but as of now it just displays a ! if the budget is negative and a !!! if the budget is below -2500
const suffix = computed(() => {
  if (budget.value > 0) {
    return '';
  } else if (budget.value < 0 && budget.value > -2500) {
    return '(!)';
  } else if (budget.value <= -2500) {
    return '(!!!)';
  }
  return '';
});

function updateBudget(amount: number) {budget.value += amount;}


//   ________              ___.   .__  .__                 /\         /\
//  /  _____/_____    _____\_ |__ |  | |__| ____    ____   \ \       / /
// /   \  ___\__  \  /     \| __ \|  | |  |/    \  / ___\   \ \     / /
// \    \_\  \/ __ \|  Y Y  \ \_\ \  |_|  |   |  \/ /_/  >   \ \   / /
//  \______  (____  /__|_|  /___  /____/__|___|  /\___  /     \ \ / /
//         \/     \/      \/    \/             \//_____/       \/ \/


//coinflip related thing
const flipCoin = (): string => {
  return Math.random() < 0.5 ? "Heads" : "Tails";
};

//Roulete related thing
const rouletteResult = (): string => {
  const resultNum = Math.floor(Math.random() * 37);
  return String(resultNum);
};

//Roulete related thing
const selectedResult = computed(() => {
  if (rouletteSelection.value === 'zero') return '0';
  if (rouletteSelection.value === 'Red') return 'Red';
  if (rouletteSelection.value === 'Black') return 'Black';
  return rouletteSelection.value;
});
//Coinflip function
function handleCoinflipPlay() {
  if (flipCoin() === "Heads") {
    updateBudget(coinflipBet.value);
  } else {
    updateBudget(-coinflipBet.value);
  }
}

//Roulete function
function handleRoulettePlay() {
  const rolledString = rouletteResult();
  const rolledNum = Number(rolledString);

  if (selectedResult.value === 'Black') {
    //Must be even AND cannot be 0
    if (rolledNum !== 0 && rolledNum % 2 === 0) {
      updateBudget(rouletteBet.value);
    } else {
      updateBudget(-rouletteBet.value);
    }
  } else if (selectedResult.value === 'Red') {
    // Must be odd
    if (rolledNum % 2 === 1) {
      updateBudget(rouletteBet.value);
    } else {
      updateBudget(-rouletteBet.value);
    }
  } else {
    if (rolledString === selectedResult.value) {
      updateBudget(rouletteBet.value * 35);
    } else {
      updateBudget(-rouletteBet.value);
    }
  }

  rouletteBet.value = 0;
  rouletteSelection.value = '';
}

//Placeholder function
function handlePlaceholderPlay() {
  updateBudget(-100)
};

</script>

<template>
  <div class="main" id="main">
    <DynTitle v-tilt />
    <div class="budget-container" id="budget-container">
      <h1 class="budget" id="budget">Budget: ${{budget}}{{suffix}}</h1>
    </div>
    <div class="games" id="games">
      <div class="game-cont" id="coinflip-game-cont">
        <Coinflip />
        <div class="btn-cont" id="coinflip-btn-cont">
          <button v-tilt @click="openBetModal('coinflip')" class="bet btn" id="coinflip-bet">
            {{ coinflipBetDisplay }}
          </button>
          <button v-tilt @click="handleCoinflipPlay()" class="play btn" id="coinflip-play">
            Flip
          </button>
        </div>
      </div>
      <div class="game-cont" id="roulette-game-cont">
        <Roulette />
        <div class="btn-cont" id="roulette-btn-cont">
          <button v-tilt @click="openBetModal('roulette')" class="bet btn" id="roulette-bet">
            {{ rouletteBetDisplay }}
          </button>
          <button v-tilt @click="handleRoulettePlay()" class="play btn" id="roulette-play">
            Roll
          </button>
        </div>
      </div>
      <div class="game-cont" id="Placeholder-game-cont">
        <Placeholder />
        <div class="btn-cont" id="placeholder-btn-cont">
          <button @click="openBetModal('placeholder')" v-tilt class="bet btn" id="Placeholder-bet">
            {{ placeholderBetDisplay }}
          </button>
          <button @click="handlePlaceholderPlay()" v-tilt class="play btn" id="Placeholder-play">
            Play
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <BetAmountModal v-if="modalStep === 1" @submit-bet="saveBet" />
      <RouletteBetNrModal v-else-if="modalStep === 2" @select-entry="saveRouletteChoice" />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  width: 100vw; height: 100vh;
  background: #F7F1DE;
  overflow: hidden;
  gap: 20px;
  position: relative;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
  font-family: 'Roboto', sans-serif;
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