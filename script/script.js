document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-button-type]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active-button' from all buttons
      buttons.forEach(btn => {
        btn.classList.remove('active-button');
        // Reset to default gray styles
        btn.classList.add('bg-gray-200', 'text-gray-500');
        btn.classList.remove('bg-blue-600', 'text-white');
      });

      // Add 'active-button' to the clicked button
      button.classList.add('active-button');
      // Apply active blue styles
      button.classList.remove('bg-gray-200', 'text-gray-500');
      button.classList.add('bg-blue-600', 'text-white');

      // You can also add logic here based on which button was clicked
      const buttonType = button.dataset.buttonType;
      console.log(`Button "${buttonType}" was clicked!`);

      // Example: filter some content based on buttonType
      // filterContent(buttonType);
    });
  });
});

