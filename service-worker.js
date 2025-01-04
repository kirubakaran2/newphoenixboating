self.addEventListener('push', function(event) {
    const options = {
      body: event.data ? event.data.text() : 'No payload',
      icon: 'icon.png', // Path to your icon
      badge: 'badge.png' // Path to your badge
    };
  
    event.waitUntil(
      self.registration.showNotification('Notification Title', options)
    );
  });