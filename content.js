// Content script for Virtual Gamepad Emulator

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getStatus') {
    // Return the current status
    sendResponse({active: window.gamepadActive || false});
  } else if (request.action === 'toggle') {
    // Toggle the gamepad simulation
    if (window.gamepadActive) {
      deactivateGamepad();
    } else {
      activateGamepad();
    }
    sendResponse({active: window.gamepadActive || false});
  }
});

// Function to activate the virtual gamepad
function activateGamepad() {
  // Inject the gamepad simulator script
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('gamepad-simulator.js');
  (document.head || document.documentElement).appendChild(script);
  
  // Set up keyboard event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  window.gamepadActive = true;
}

// Function to deactivate the virtual gamepad
function deactivateGamepad() {
  // Remove keyboard event listeners
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
  
  // Send disconnect message to the gamepad simulator
  window.dispatchEvent(new CustomEvent('gamepadDisconnect'));
  
  window.gamepadActive = false;
}

// Handle keyboard events
function handleKeyDown(event) {
  if (!window.gamepadActive) return;
  
  // Send key press to the gamepad simulator
  window.dispatchEvent(new CustomEvent('gamepadKeyPress', {
    detail: {
      key: event.code,
      pressed: true
    }
  }));
}

function handleKeyUp(event) {
  if (!window.gamepadActive) return;
  
  // Send key release to the gamepad simulator
  window.dispatchEvent(new CustomEvent('gamepadKeyPress', {
    detail: {
      key: event.code,
      pressed: false
    }
  }));
}

// Initialize
console.log('Virtual Gamepad Emulator content script loaded');
