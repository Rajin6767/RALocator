window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/status')
      .then(response => response.json())
      .then(data => {
        document.getElementById('status').innerText = data.status;
        document.getElementById('updatedAt').innerText = `Last updated at: ${new Date(data.updatedAt).toLocaleString()}`;
      })
      .catch(error => {
        document.getElementById('status').innerText = 'Error loading status';
        console.error('Error:', error);
      });
  });
  