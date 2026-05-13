# FITBUDDY Mobile

A production-oriented Expo React Native app for the FITBUDDY fitness tracking platform. The app is mobile-first, TypeScript-based, and organized around a scalable feature structure for future auth, charts, plans, AI coaching, PR tracking, notifications, and richer rest timers.

## Tech stack

- Expo + React Native
- React Navigation native stack
- Axios API client
- Zustand theme store
- AsyncStorage theme persistence
- React Native Reanimated + Gesture Handler
- Expo Vector Icons
- TypeScript

## API

The mobile client uses the existing backend at:

```txt
http://localhost:8080
```

The current app intentionally skips authentication and uses `userId = 1` for template/session flows.

## Project structure

```txt
src/
  api/          axios client and FITBUDDY endpoint wrappers
  components/   reusable cards, accordions, buttons, forms, modal, toast, video
  hooks/        theme hooks
  navigation/   native stack navigation
  screens/      dashboard, catalog, template creation, workouts, history
  store/        persisted lightweight state
  theme/        centralized design tokens and palettes
  types/        shared API/domain types
  utils/        formatting and parsing helpers
```

## Run locally

```bash
npm install
npm start
```

Then launch the app in Expo Go, an iOS simulator, or an Android emulator.

> Note: the backend URL is `localhost`. On a physical device, update `src/api/client.ts` to point to your machine's LAN IP or a deployed backend URL.

## PR compatibility note

This branch intentionally avoids adding placeholder binary image assets to keep web-based PR creation tools happy. Add final Expo app icons and splash assets later through the normal design asset workflow.
