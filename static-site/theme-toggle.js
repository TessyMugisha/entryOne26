// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save the preference
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  });
});