# Knowit kodekalender

Velkommen til repoet for Knowits kodekalender! Her kan du følge utviklingen til kodekalenderen vår. Tech-stacken er ikke det mest spenstige, men det er teknologier vi er kjente og er effektive med.

Vi er åpne for både issues og pull requests!

---

### Lokal utvikling

Frontenden er en Vite app. `yarn install` og `yarn run serve` for å beskue underverket. API-et og backenden ønsker vi å holde skjult enn så lenge, men det er bare å prøve å kjøre appen lokalt mens kalenderen kjører i desember.

---

### Tailwind

Forandringer fra default for å samsvare med design tema:

- Vi har custom farger: black, gray, white, purple, red, yellow, green, pink, orange, turqoise.
- Spacing er halvparten så stor by default, så utilities som styrer rem-size er delt inn i 8 per rem heller enn 4. F.eks. w-8 blir til w-16 hos oss.
- Tekststørrelser er egendefinerte men bruker samme navn som default.
- Vi bruker dark mode by default (motsatt fra Tailwind), sett light styling med `light:` varianten.
- tailwindcss/typography styrer styling i oppgavene og kommentarer.
- tailwind-children åpner for styling av children eller descendants.
- tailwind-easing gir easing til animasjoner.
- tailwindcss/forms styler form elementer med egne klasser.

---

For Knowitere: Nødvendige secrets for development finnes i 1Password (spør om tilgang).
