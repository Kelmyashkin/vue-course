const service = 'ws://coins-stream.demo.javascript.ninja';
class CurrencyWebsocketAPI {
  constructor() {
    this.websocket = new WebSocket(service);
    this.subs = {};
    this.isOpen = false;
    this.websocket.onmessage = this.messageHandler.bind(this);
    this.websocket.onopen = () => {
      console.log('open');
      this.isOpen = true;
      Object.keys(this.subs).forEach(s => this.startWatch(s));
    };
    this.websocket.onclose = () => {
      console.log('close');
    };
    this.websocket.onerror = e => {
      console.log('error', e);
    };
  }
  subscribe(name, callback) {
    console.log('subscribe: ', name);
    if (!this.subs[name]) {
      this.subs[name] = [];
      if (this.isOpen) this.startWatch(name);
    }
    this.subs[name].push(callback);
  }
  unsubscribe(name, callback) {
    console.log('unsubscribe: ', name);
    // todo check remove callback logic
    this.subs[name] = this.subs[name].filter(c => c !== callback);
    if (this.subs[name] === 0) {
      delete this.subs[name];
      if (this.isOpen) this.stopWatch(name);
    }
  }
  startWatch(name) {
    console.log('startWatch: ', name);
    this.websocket.send(JSON.stringify({ type: 'subscribe', currency: name }));
  }
  stopWatch(name) {
    console.log('stopWatch: ', name);
    this.websocket.send(
      JSON.stringify({ type: 'unsubscribe', currency: name }),
    );
  }
  messageHandler(e) {
    const data = JSON.parse(e.data);
    const name = data.currency;
    const price = Number.parseFloat(data.price);
    console.log(name, price);
    if (this.subs[name] && !Number.isNaN(price)) {
      this.subs[name].forEach(c => c(price));
    }
  }
}

const api = new CurrencyWebsocketAPI();

export default api;
