# OSC-P5 Integration with Electron and Vite.js

Desktop application built with Electron and Vite.js. 
It provides a way to make p5.js sketches communicate over OSC without the need for a local web server.

## Features

- Real-time communication of p5.js sketches via OSC.
- In-app code editor with ECMAScript 6 support powered by Ace.
- Load scripts directly from HTML `script` tags.
- Keyboard shortcuts for triggering save operations and running code.

## Prerequisites

Your system needs to have Node.js installed to develop this app.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/gregberger/electron-osc-p5.git
    ```

2. Navigate into the project directory and install dependencies:

    ```bash
    cd javascript-osc-p5
    npm install
    ```

3. Start the application:

    ```bash
    npm run start
    ```

## Usage

1. Write your p5.js code or load it from a `script` tag (by default, it loads the `src/p5/sketch.js` file).
2. Press `Ctrl-Enter` (or `Cmd-Enter` on macOS) to run your sketch. Any errors will be logged in the console.
3. The sketch results will be displayed in the sketch preview pane.
4. [In Progress] To save your changes, press `Ctrl-s` (or `Cmd-s` on macOS) .

## Technology Stack

- [Electron](https://www.electronjs.org/): A framework for building cross-platform desktop applications with JavaScript, HTML, and CSS.
- [Vite.js](https://vitejs.dev/): A new generation build tool that dramatically improves the front-end development experience.
- [p5.js](https://p5js.org/): A JS library for creative coding, with a focus on making coding accessible and inclusive.
- [Ace](https://ace.c9.io/): An embeddable code editor written in JavaScript.
- [OSC](http://opensoundcontrol.org/): A protocol for networking sound synthesizers, computers, and other multimedia devices.
