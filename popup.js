// Popup script for the Virtual Gamepad Emulator

document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');
  
  // Check current activation status
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
      if (response && response.active) {
        updateUI(true);
      } else {
        updateUI(false);
      }
    });
  });
  
  // Toggle button click handler
  toggleBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggle'}, function(response) {
        if (response) {
          updateUI(response.active);
        }
      });
    });
  });
  
  // Update UI based on activation status
  function updateUI(active) {
    if (active) {
      statusDiv.textContent = 'Status: Active';
      statusDiv.className = 'status active';
      toggleBtn.textContent = 'Deactivate Gamepad';
      toggleBtn.className = 'secondary';
    } else {
      statusDiv.textContent = 'Status: Inactive';
      statusDiv.className = 'status inactive';
      toggleBtn.textContent = 'Activate Gamepad';
      toggleBtn.className = 'primary';
    }
  }
});
