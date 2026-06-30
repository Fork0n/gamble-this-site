<p align="center">
  <g-emoji class="g-emoji" alias="game_die" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3b2.png">🎲</g-emoji>
  <h1 align="center">Gamble This Website!</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/fork0n/gamble-this-site" alt="Last Commit" />
  <img src="https://img.shields.io/badge/V1.1--dev-alpha-blueviolet?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/Bugs_Created-Yes-red?style=flat-square" alt="Bugs" />
  <img src="https://img.shields.io/badge/Maintained%3F-Maybe-emerald?style=flat-square" alt="Maintained" />
</p>

### 🛠 Built With

[![Nuxt](https://img.shields.io/badge/Nuxt_4-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Art & Workflow

[![Krita](https://img.shields.io/badge/Krita_Sprites-A1519C?style=for-the-badge&logo=krita&logoColor=white)](https://krita.org/)
[![WebStorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=webstorm&logoColor=white)](https://www.jetbrains.com/webstorm/)
---
## Why a site about gabmling?
It was a really old idea of mine: making a site where your actions impact the website's look; apparently it's harder than i thought to make a fully dynamic website and it's way way way harder than i thought to draw good sprites for this website

## How did I make this? (AKA this project's retrospective)
### CH I: The Idea
At first i had to come up with the idea. As i mentioned before, i was already thinking about an interactive website on the UI/UX scale and even did a prototype for a computer class but it was far from what i initially wanted. It was really bad, all the "sprites" were made out of HTML and CSS and it was mostly ai generated, defenethly not something to write home about. Then i remembered about **Hack Club** and that's when it clicked: "Wouldn't it be a great idea to make a project with my initial idea for **Hack Club** so that more people could see it and interact!". Besides more people interacting with my project, that was a great opportunity to win something like the Pinecil (since i started actively playing with my esp this summer)

The initial idea was to make a site where you can gamble away it's budget and the site's design would change depending if you're winning or not. There would be 5 stages:
1) [ ] **bankrupt** : budget < -$2500: you get a "CSS past due" invoice and the website becomes just plain HTML (well maybe not plain but you get the idea)
2) [ ] **poor** : -$2500 < budget < $0: the sprites are drawn in paint, the website's structure && layout starts shattering, some textures dissapear, the background becomes plain white and... i guess that's it
3) [x] **normal** : $0 < budget < $2500: the website is as it is when you first enter, krita drawn sprites and a cream background
4) [ ] **rich** : $2500 < budget < $5000: some sprites change to a "*fancier*" variant,
5) [ ] **filthy rich** : budget > $5000: everything becomes *fancy*, you now have classical music on the background, the logo is styled as a casino logo, animations become better, the site feels more refined, the background is now a fancy casino.

**Note:** the website is still in development, everything that is ticked means it's done or at least in active development

### CH II: The Tech Stack
Since i had experience using Nuxt 3 before, i decided that it would be a great opportunity to learn Nuxt 4 and refresh the memory. 
On the first days i focused on the overall look and the layout of the website, designing placeholders as colored rectangles and circeles (as seen on devlogs)

Then i started implementing modals, gambling functions, communication between elemnts and animations that (probably) sync with the actual game's outcome.

near the end of everything that i thought i had to code, i decided that QoL stuff must be added:
1) added a foot note disclaimer that tells how to reset the progress
2) added a reset warning when closing or refreshing the page
3) added contact info to the footer and my portfolio that i will make in the future (probably on this Hack Club event)
4) added a personalized gambling warning with hotline numbers auto parsing depending on the user's country.

I used [Krita](https://krita.org/) to draw sprites, [WebStorm](https://www.jetbrains.com/webstorm/) as tge IDE.

## How to develop?

clone the repo, run `bun install`, then `bun run dev`.
The website will be available at `http://localhost:3000/`

Also in /app/pages/sandbox/index.vue you can display any element that you're working on for development. (available @ `localhost:3000/sandbox` )

---

## AI declaration:
I used mostly Gemini for tips, i almost never asked it to do full features, only help me realize what i didn't know, for example, i asked it to explain how to make complex animations that i wanted, i asked it about stuff in vue/nuxt that i either forgot how to do or just didn't know in the first place (like onMount() or ref)

I proudly declare that the shitty design was done 101% by me, not one model could come close to this level of bad UX/UI but it's mine. Most functions were suggested to be "improved" but no, *I did it myyyyyyyyy waaaaaaayyyy*

---
> [!WARNING]  
> Gambling is bad!

## Contact me:

Feel free to reach out via Telegram for questions, suggestions, or just to say hi. Estimated response time is about 10-15 minutes.

Also you can check out my portfolio as soon ai it's done! there will be more contact info and more of my projects!

[![Portfolio](https://img.shields.io/badge/Portfolio-0052FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://large-type.com/#coming%20some%20time...)
[![Telegram](https://img.shields.io/badge/Telegram-26A69A?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/bavisimo)