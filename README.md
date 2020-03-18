# Expo Uni Starter

> An Expo starter kit for your native and web applications

Expo Uni Starter leverages the awesomeness of Expo and the genius of Tailwind to enable you
to target mobile devices as well as web browsers, while keeping the same code base.

Available targets with no code changes:

- [x] iOS Native app
- [x] Android Native app
- [x] Web for mobile
- [x] Web for desktop computer

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [External Libraries](#external-libraries)
5. [Project Structure](#project-structure)
6. [Documentation](#documentation)

## Prerequisites

### Web

A browser

### iOS

1. An Apple computer (or anything running macOS)
2. XCode from [the Mac App Store](https://apps.apple.com/fr/app/xcode/id497799835?l=en&mt=12)

### Android

1. [Android Studio](https://developer.android.com/studio)
2. Follow installation instructions, and download an SDK
3. Create an AVD (emulator)

## Installation

1. Install `expo-cli` globally
1. Clone this repository
1. Remove the origin: `git remote rm origin`
1. Add your own remote: `git remote add origin $YOUR_REMOTE`
1. Push to your remote
1. Install dependencies (`yarn`, `npm install`, or your favorite package manager)

## Usage

```sh
yarn start
```

Then press either:

- `w`: to start web development in the browser
- `i`: to start iOS development in a simulator
- `a`: to start Android development in an emulator (you might need to have it started)

## External Libraries

- [Expo](https://docs.expo.io/versions/latest/) Web and Native tooling
- [React Native](https://reactnative.dev/docs/getting-started)
- [react-native-tailwindcss](https://tvke.github.io/react-native-tailwindcss/) Easy styling
- [react-navigation](https://reactnavigation.org/docs/getting-started) Web/Native navigation
- [zustand (with immer)](https://github.com/react-spring/zustand) Application state management
- [react-hook-form](https://github.com/react-spring/zustand) Form management for Web and Native

## Project Structure

Code that might change depending of the application business or brand goes in `src`.

TODO: GraphQL/Rest layer ?

```
.
├── history                 -- web address bar and history management
├── src                     -- actual app code goes here
│   ├── components
│   │   ├── form            -- Form related components (inputs, checkboxes, buttons, etc)
│   │   ├── layout          -- Layout related components (stack)
│   │   ├── portal          -- Portal (see doc), no reason to touch this
│   │   └── typography      -- Typography related components
│   ├── navigators          -- Navigation, see react-navigation documentation
│   └── stores              -- application state management
├── state                   -- core state management
└── tw                      -- tw styling lib
```

## Documentation

- [Components](https://github.com/wearedevx/expo-uni-starter/tree/master/src/components)
- [Styling with `tw`](https://github.com/wearedevx/expo-uni-starter/tree/master/tw)
- [State Management](https://github.com/wearedevx/expo-uni-starter/tree/master/state)
