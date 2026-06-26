<script setup lang="ts">
//importing components
import { ref, computed, onMounted } from 'vue';

//vars and stuff and yeah, they work with const because apparently you check the variable.value and not the variable, fine i guess
const budget = ref(1000);
const coinflipBet = ref(0);
const coinflipResult = ref<string>('');
const coinflipSelection = ref<string>('')
const rouletteBet = ref(0);
const placeholderBet = ref(0);
const rouletteSelection = ref<string>('');

//modal related stuff
const showModal = ref(false);
const activeGame = ref<string | null>(null);
const modalStep = ref<number>(1);

const showResultModal = ref(false);
const modalBetSnapshot = ref(0);

const hotlineNr = ref('fetching hotline nr');
const country = ref('fetching country');



//the thing that opens the modal, self explanatory imo
function openBetModal(game: string) {
  activeGame.value = game;
  modalStep.value = 1;
  showModal.value = true;
}

//the thing that define how many modals we need to open before were done
function saveBet(amount: number) {
  if (activeGame.value === 'coinflip') {
    coinflipBet.value = amount;
    modalStep.value = 2; // Instead of closing, jump to the choice step!
  } else if (activeGame.value === 'roulette') {
    rouletteBet.value = amount;
    modalStep.value = 2;
  } else if (activeGame.value === 'placeholder') {
    placeholderBet.value = amount;
    showModal.value = false;
    activeGame.value = null;
  }
}

function saveCoinflipChoice(choice: string) {
  coinflipSelection.value = choice;

  // Clean up and close bet wizard setup
  showModal.value = false;
  activeGame.value = null;
  modalStep.value = 1;
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
  if (coinflipBet.value === 0) return 'Bet';
  const choiceText = coinflipSelection.value ? ` (${coinflipSelection.value})` : '';
  return '$' + coinflipBet.value + choiceText;
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
  } else if (budget.value < 0 && budget.value > -5000) {
    return '(!)';
  } else if (budget.value <= -5000) {
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

//Coinflip function
function handleCoinflipPlay() {
  if (coinflipBet.value === 0 || !coinflipSelection.value) {
    alert("Please place your bet and choose a side first!");
    return;
  }
  const result = flipCoin();
  coinflipResult.value = result;
  const userWon = result === coinflipSelection.value;
  if (userWon) {
    updateBudget(coinflipBet.value);
  } else {
    updateBudget(-coinflipBet.value);
  }
  modalBetSnapshot.value = coinflipBet.value;
  const previousSelection = coinflipSelection.value;
  showResultModal.value = true;
}

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
  rouletteSelection.value = '';
  rouletteBet.value = 0;
}

//Placeholder function
function handlePlaceholderPlay() {
  updateBudget(placeholderBet.value);
};

//END OF GAMBLING RELATED STUFF

//this thing prevents the user from accidentally closing/refreshing the page, by doing so you lose your progress
//also it's redundant if the budget is 1000 as it's the default value
const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (budget.value !== 1000) {
    event.preventDefault();
    event.returnValue = ''; // Essential for Chrome / modern browsers
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
})
//end of accident prevention

//this will fetch user's country and pick a relevant hotline nr
const DEFAULT_PHONE = 'local emergency or health services or https://www.gamblingtherapy.org/';
const DEFAULT_TEXT = "sorry, your country isn't on the list";

const HotlineMap: Record<string, { name: string; phone: string }> = {
  US: { name: 'United States', phone: '1-800-GAMBLER' },
  GB: { name: 'United Kingdom', phone: '0808 8020 133' },
  CA: { name: 'Canada', phone: '1-866-531-2600' }, // Ontario / National routing
  AU: { name: 'Australia', phone: '1800 858 858' },
  NZ: { name: 'New Zealand', phone: '0800 654 655' },
  IE: { name: 'Ireland', phone: '1800 753 753' },
  ZA: { name: 'South Africa', phone: '0800 006 008' },
  DE: { name: 'Germany', phone: '0800 1 372700' },
  FR: { name: 'France', phone: '09 74 75 13 13' },
  ES: { name: 'Spain', phone: '900 200 225' },
  IT: { name: 'Italy', phone: '800 558822' },
  NL: { name: 'Netherlands', phone: '0800 024 0002' },
  BE: { name: 'Belgium', phone: '0800 35 777' },
  AT: { name: 'Austria', phone: '0800 205 242' },
  CH: { name: 'Switzerland', phone: '0800 801 381' },
  DK: { name: 'Denmark', phone: '70 11 18 10' },
  SE: { name: 'Sweden', phone: '020 81 91 00' },
  NO: { name: 'Norway', phone: '800 800 40' },
  FI: { name: 'Finland', phone: '0800 100 101' },
  SG: { name: 'Singapore', phone: '1800 6 668 668' },
  HK: { name: 'Hong Kong', phone: '1834 633' },
  BR: { name: 'Brazil', phone: '141' }, // General mental health/support line
};

onMounted(async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    const countryCode = data.country_code;

    if (countryCode && HotlineMap[countryCode]) {
      country.value = `if you are from ${HotlineMap[countryCode].name}`;
      hotlineNr.value = HotlineMap[countryCode].phone;
    } else if (data.country_name) {
      // If we know the country name but don't have their specific phone number mapped
      country.value = `if you are from ${data.country_name}`;
      hotlineNr.value = DEFAULT_PHONE;
    } else {
      country.value = DEFAULT_TEXT;
      hotlineNr.value = DEFAULT_PHONE;
    }
  } catch (error) {
    console.error('Error fetching country:', error);
    country.value = DEFAULT_TEXT;
    hotlineNr.value = DEFAULT_PHONE;
  }
})

</script>

<template>
  <div class="main" id="main">
    <DynTitle v-tilting-kickflip />
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
          <button @click="openBetModal('placeholder')" v-tilt class="bet btn" id="placeholder-bet">
            {{ placeholderBetDisplay }}
          </button>
          <button @click="handlePlaceholderPlay()" v-tilt class="play btn" id="placeholder-play">
            Play
          </button>
        </div>
      </div>
    </div>
    <div class="disclaimer-container">
      <p class="disclaimer">
        *to start from scratch, refresh the page.
      </p>
      <p class="disclaimer">
        *gambling is bad, if you have addiction problems call {{hotlineNr}} ({{country}})
      </p>
    </div>


    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <BetAmountModal v-if="modalStep === 1" @submit-bet="saveBet" />

      <template v-else-if="modalStep === 2">
        <CoinflipBetHeadsOrTails
            v-if="activeGame === 'coinflip'"
            @select-choice="saveCoinflipChoice"
        />
        <RouletteBetNrModal
            v-else-if="activeGame === 'roulette'"
            @select-entry="saveRouletteChoice"
        />
      </template>
    </div>

    <div v-if="showResultModal" class="modal-overlay" @click.self="showResultModal = false">
      <CoinflipGameAction
          :coin-side="coinflipResult"
          :bet-amount="modalBetSnapshot"
          :is-win="coinflipResult === coinflipSelection"
          @close="showResultModal = false; coinflipBet = 0; coinflipSelection = '';"
      />
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
  background: rgba(0, 0, 0, 0.5);
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
  background: #B331F1;
}
.play {
  background: #9FA1FF;
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

.disclaimer {
  font-size: 0.8rem;
  font-weight: 400;
  font-family: "Roboto Mono", monospace;
}

.disclaimer-container {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
</style>