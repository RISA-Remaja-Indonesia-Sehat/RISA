export function initTooltip() {
  window.toggleTooltip = function() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.toggle('hidden');
  };
  
  window.toggleHivTooltip = function() {
    const hivTooltip = document.getElementById('hiv-tooltip');
    hivTooltip.classList.toggle('hidden');
  };
  
  // Hide tooltips when clicking outside
  document.addEventListener('click', function(event) {
    const tooltip = document.getElementById('tooltip');
    const hivTooltip = document.getElementById('hiv-tooltip');
    const target = event.target;
    
    if (!target.textContent.includes('*') && !tooltip?.contains(target)) {
      tooltip?.classList.add('hidden');
    }
    
    if (!target.textContent.includes('#') && !hivTooltip?.contains(target)) {
      hivTooltip?.classList.add('hidden');
    }
  });
}