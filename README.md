# Virtual Gamepad Emulator

A Chrome extension that emulates a gamepad using keyboard inputs. This extension allows you to play browser-based games that support the Gamepad API, such as Xbox Remote Play, without a physical gamepad.

## Features

- Emulates a standard gamepad using keyboard inputs
- Works with any web application that uses the Gamepad API
- Customizable key mappings
- Easy toggle on/off from the extension popup

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Default Key Mapping

| Keyboard Key | Gamepad Button/Axis |
|-------------|----------------|
| Arrow Keys  | D-Pad          |
| Z           | A Button       |
| X           | B Button       |
| C           | X Button       |
| V           | Y Button       |
| Q           | Left Bumper    |
| E           | Right Bumper   |
| 1           | Left Trigger   |
| 2           | Right Trigger  |
| 3           | Start          |
| 4           | Back/Select    |
| Space       | Home           |
| W/A/S/D     | Left Stick     |
| I/J/K/L     | Right Stick    |

## Mouse Control

| Mouse Action | Gamepad Function |
|-------------|----------------|
| Mouse Movement | Right Stick Movement |

The mouse-to-right-stick mapping allows you to control the right stick by simply moving the mouse. The right stick will automatically return to center when the mouse stops moving, with a smooth decay effect.

## How It Works

The extension works by injecting a script into web pages that overrides the `navigator.getGamepads()` function to return a virtual gamepad. When you press keys on your keyboard, the extension maps those key presses to gamepad button presses.

## Usage

1. Click the extension icon in the Chrome toolbar
2. Click "Activate Gamepad" to enable the virtual gamepad
3. Use your keyboard or mouse to control the gamepad
4. Click "Deactivate Gamepad" when you're done

## Testing Mouse Control

To test the new mouse-to-right-stick feature:

1. Open `mouse-test.html` in your browser
2. Activate the extension
3. Click and drag in the test area to control the right stick
4. See `TESTING_MOUSE.md` for detailed instructions

## Compatibility

This extension works with any web application that uses the standard Gamepad API, including:

- Xbox Remote Play
- Google Stadia
- GeForce Now
- Any web-based game that supports gamepads

## Customization

To customize the key mappings, modify the `keyMappings` object in `gamepad-simulator.js`.

## Limitations

- Only simulates one gamepad at a time
