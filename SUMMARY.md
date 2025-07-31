# Virtual Gamepad Emulator - Summary

## Project Overview

This Chrome extension allows you to emulate a gamepad using your keyboard. It's particularly useful for playing browser-based games that support the Gamepad API, such as Xbox Remote Play, without needing a physical gamepad.

## Features Implemented

1. **Gamepad API Simulation**: The extension overrides the browser's `navigator.getGamepads()` function to provide a virtual gamepad.
2. **Keyboard-to-Gamepad Mapping**: Maps keyboard keys to gamepad buttons and axes.
3. **Full Gamepad Support**: Supports all 17 standard gamepad buttons and 6 axes (2 analog sticks, 2 triggers).
4. **Easy Toggle**: Simple on/off switch through the extension popup.
5. **Visual Feedback**: Real-time visualization of button presses and axis movements in the test page.

## Technical Implementation

### Components

1. **manifest.json**: Defines the extension structure and permissions.
2. **popup.html/popup.js**: Provides the user interface for activating/deactivating the gamepad.
3. **content.js**: Content script that injects the gamepad simulator into web pages.
4. **gamepad-simulator.js**: Core simulation logic that overrides the Gamepad API.
5. **test.html**: Test page to verify the extension functionality.

### How It Works

1. When activated, the extension injects `gamepad-simulator.js` into the current page.
2. This script overrides `navigator.getGamepads()` to return a virtual gamepad object.
3. Keyboard events are captured and mapped to gamepad button presses/axis movements.
4. The virtual gamepad state is updated in real-time.
5. Web applications that use the Gamepad API will detect and interact with the virtual gamepad.

## Key Mappings

### Buttons
| Keyboard Key | Gamepad Button |
|-------------|----------------|
| Arrow Keys  | D-Pad          |
| Z           | A Button       |
| X           | B Button       |
| C           | X Button       |
| V           | Y Button       |
| Q           | Left Bumper    |
| E           | Right Bumper   |
| 3           | Start          |
| 4           | Back/Select    |
| Space       | Home           |

### Axes (Analog Sticks and Triggers)
| Keyboard Keys | Gamepad Axis      |
|--------------|-------------------|
| W, A, S, D   | Left Stick        |
| I, J, K, L   | Right Stick       |
| 1, 2         | Left/Right Trigger|

## Installation and Usage

1. Load the extension in Chrome (Developer mode > Load unpacked)
2. Navigate to a game that supports the Gamepad API
3. Click the extension icon and press "Activate Gamepad"
4. Use the keyboard mappings to control the game

## Future Improvements

1. Add a configuration UI to customize key mappings
2. Support for multiple gamepads
3. Improved axis handling with simultaneous key presses
4. Trigger button support (LT/RT as axes)

## Testing

A test page is included to verify the extension works correctly. It displays real-time feedback for all buttons and axes.
