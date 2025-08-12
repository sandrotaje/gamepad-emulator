# Testing Mouse-to-Right-Stick Feature

## Setup Instructions

1. Load the extension in Chrome as described in the main README
2. Open `mouse-test.html` in your browser
3. Click the extension icon and activate the gamepad
4. Follow the instructions on the test page

## How to Test

1. **Activate the extension**: Click the extension icon and press "Activate Gamepad"
2. **Test mouse control**: Simply move your mouse within the browser window
3. **Observe axis values**: Watch the right stick axis values (indices 2 and 3) change as you move the mouse
4. **Center the stick**: Stop moving the mouse to see the right stick gradually return to center position (0,0)

## Expected Behavior

- As you move the mouse, the right stick axes (indices 2 and 3) should change
- When you stop moving the mouse, the right stick should gradually return to the center position (0,0)
- The sensitivity can be adjusted in `gamepad-simulator.js` by modifying the `sensitivity` constant

## Troubleshooting

If the mouse control isn't working:

1. Make sure the extension is activated
2. Check the browser console for any error messages
3. Verify that the content script is properly injected
4. Try reloading the page after activating the extension
