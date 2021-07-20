class eventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(name, callback) {
    this.events.set(name, new Set([...(this.events.get(name) || []), callback]));
    return () => this.unsubscribe(name, callback);
  }

  unsubscribe(name, callback) {
    (this.events.get(name) || new Set()).delete(callback);
  }

  trigger(name) {
    [...this.events.get(name) || []].forEach(callback => callback());
  }
}

export default eventEmitter;
