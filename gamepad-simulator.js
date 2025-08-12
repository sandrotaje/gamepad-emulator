// Gamepad simulator that overrides the Gamepad API
(function() {
  // Store the original getGamepads function
  const originalGetGamepads = navigator.getGamepads;
  
  // Gamepad state
  let virtualGamepad = null;
  let gamepadConnected = false;
  
  // Default key mappings
  const keyMappings = {
    'ArrowUp': { type: 'button', index: 12 },    // D-pad up
    'ArrowDown': { type: 'button', index: 13 },  // D-pad down
    'ArrowLeft': { type: 'button', index: 14 },  // D-pad left
    'ArrowRight': { type: 'button', index: 15 }, // D-pad right
    'KeyZ': { type: 'button', index: 0 },        // A button
    'KeyX': { type: 'button', index: 1 },        // B button
    'KeyC': { type: 'button', index: 2 },        // X button
    'KeyV': { type: 'button', index: 3 },        // Y button
    'KeyQ': { type: 'button', index: 4 },        // Left bumper
    'KeyE': { type: 'button', index: 5 },        // Right bumper
    'KeyU': { type: 'axis', index: 4, value: 1 }, // Left trigger
    'Digit2': { type: 'button', index: 9 },      // Start button
    'Digit3': { type: 'button', index: 8 },      // Back/Select button
    'KeyO': { type: 'axis', index: 5, value: 1 }, // Right trigger
    'Space': { type: 'button', index: 16 },      // Home button
    // Left stick axes
    'KeyW': { type: 'axis', index: 1, value: -1 }, // Left stick up
    'KeyS': { type: 'axis', index: 1, value: 1 },  // Left stick down
    'KeyA': { type: 'axis', index: 0, value: -1 }, // Left stick left
    'KeyD': { type: 'axis', index: 0, value: 1 },  // Left stick right
    // Right stick axes
    'KeyI': { type: 'axis', index: 3, value: -1 }, // Right stick up
    'KeyK': { type: 'axis', index: 3, value: 1 },  // Right stick down
    'KeyJ': { type: 'axis', index: 2, value: -1 }, // Right stick left
    'KeyL': { type: 'axis', index: 2, value: 1 }   // Right stick right
  };
  
  // Create a virtual gamepad object
  function createVirtualGamepad() {
    return {
      id: 'Virtual Gamepad (Vendor: 0000 Product: 0000)',
      index: 0,
      connected: true,
      mapping: 'standard',
      axes: [0, 0, 0, 0, 0, 0], // [Left Stick X, Left Stick Y, Right Stick X, Right Stick Y, Left Trigger, Right Trigger]
      buttons: Array(17).fill().map(() => ({ pressed: false, value: 0 }))
    };
  }
  
  // Override the getGamepads function
  navigator.getGamepads = function() {
    if (gamepadConnected && virtualGamepad) {
      // Return an array with our virtual gamepad at index 0
      const gamepads = Array(4).fill(null);
      gamepads[0] = virtualGamepad;
      return gamepads;
    }
    return [null, null, null, null];
  };
  
  // Create and connect the virtual gamepad
  function connectGamepad() {
    if (!gamepadConnected) {
      virtualGamepad = createVirtualGamepad();
      gamepadConnected = true;
      
      // Dispatch gamepad connected event
      const event = new GamepadEvent('gamepadconnected', { gamepad: virtualGamepad });
      window.dispatchEvent(event);
    }
  }
  
  // Disconnect the virtual gamepad
  function disconnectGamepad() {
    if (gamepadConnected) {
      // Dispatch gamepad disconnected event
      const event = new GamepadEvent('gamepaddisconnected', { gamepad: virtualGamepad });
      window.dispatchEvent(event);
      
      virtualGamepad = null;
      gamepadConnected = false;
    }
  }
  
  // Handle key press events from the content script
  window.addEventListener('gamepadKeyPress', function(event) {
    if (!gamepadConnected || !virtualGamepad) return;
    
    const { key, pressed } = event.detail;
    const mapping = keyMappings[key];
    
    if (mapping) {
      if (mapping.type === 'button') {
        virtualGamepad.buttons[mapping.index].pressed = pressed;
        virtualGamepad.buttons[mapping.index].value = pressed ? 1 : 0;
      } else if (mapping.type === 'axis') {
        // For axis, we need to handle both key press and release
        if (pressed) {
          virtualGamepad.axes[mapping.index] = mapping.value;
        } else {
          // Only reset axis if no other key is pressing it
          // This is a simplification - in a real implementation, we'd need to track all keys
          virtualGamepad.axes[mapping.index] = 0;
        }
      }
    }
  });
  
  // Handle mouse movement events for right stick control
  window.addEventListener('gamepadMouseMovement', function(event) {
    if (!gamepadConnected || !virtualGamepad) return;
    
    const { deltaX, deltaY } = event.detail;
    
    // Convert mouse movement to right stick axes values
    // Scale factor to adjust sensitivity (can be customized)
    const sensitivity = 0.01;
    
    // Calculate new axis values
    let newX = deltaX * sensitivity;
    let newY = deltaY * sensitivity;
    
    // Apply smoothing by combining with current values
    newX = virtualGamepad.axes[2] + (newX * 0.3);
    newY = virtualGamepad.axes[3] + (newY * 0.3);
    
    // Clamp values to [-1, 1] range
    newX = Math.max(-1, Math.min(1, newX));
    newY = Math.max(-1, Math.min(1, newY));
    
    // Apply decay to gradually return to center when not moving
    newX *= 0.9;
    newY *= 0.9;
    
    // Update right stick axes (indices 2 and 3)
    virtualGamepad.axes[2] = newX; // Right stick X
    virtualGamepad.axes[3] = newY; // Right stick Y
  });
  
  // Handle disconnect event from the content script
  window.addEventListener('gamepadDisconnect', function() {
    disconnectGamepad();
  });
  
  // Connect the gamepad when the script loads
  connectGamepad();
  
  console.log('Virtual Gamepad Simulator loaded');
})();
