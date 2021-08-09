function createNotification({ message, duration, style }) {
  window.dispatchEvent(new window.CustomEvent('createNotification', { detail: { message, duration, style } }));
}

export default createNotification;
