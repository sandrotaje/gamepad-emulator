# Installation and Testing Instructions

## Installing the Extension

1. Open Google Chrome
2. Navigate to `chrome://extensions`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click the "Load unpacked" button
5. Select the `gamepad-emulator` folder
6. The extension should now appear in your extensions list

## Testing the Extension

1. Start the local test server:
   ```
   cd /Users/sandrotaje/Projects/gamepad-emulator
   python3 -m http.server 8000
   ```

2. Open `http://localhost:8000/test.html` in Chrome

3. Click on the Virtual Gamepad Emulator extension icon in the toolbar

4. Click "Activate Gamepad" in the popup

5. Press keys on your keyboard to test the gamepad simulation:
   - Arrow keys for D-pad
   - Z, X, C, V for face buttons
   - Q, E for bumpers
   - 1, 2 for triggers
   - 3 for Start
   - 4 for Back/Select
   - W, A, S, D for left stick
   - I, J, K, L for right stick

6. You should see the buttons light up in the test page when you press the corresponding keys

## Using with Xbox Remote Play

1. Navigate to Xbox Remote Play
2. Activate the Virtual Gamepad Emulator extension
3. Use the keyboard mappings to control the game

Note: For the best experience with Xbox Remote Play, you may want to go fullscreen after activating the extension.
