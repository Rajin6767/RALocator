document.getElementById('statusForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const status = document.getElementById('status').value;
    const password = document.getElementById('password').value;
  
    fetch('/api/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Status updated successfully') {
          document.getElementById('responseMessage').innerText = data.message;
          document.getElementById('responseMessage').style.color = 'green';
          document.getElementById('statusForm').reset();
        } else {
          document.getElementById('responseMessage').innerText = data.message;
          document.getElementById('responseMessage').style.color = 'red';
        }
      })
      .catch(error => {
        document.getElementById('responseMessage').innerText = 'Error updating status';
        document.getElementById('responseMessage').style.color = 'red';
        console.error('Error:', error);
      });
  });
  