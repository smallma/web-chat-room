import Vue from "vue";

const wsUrl = process.env.VUE_APP_API_URL;
console.log('wsUrl: ', wsUrl);
let socket = new WebSocket(wsUrl);

const emitter = new Vue({
  methods: {
    send(message:any) {
      console.log('message: ', message);
      if (1 === socket.readyState) socket.send(JSON.stringify(message));
    },
    connect() {
      socket = new WebSocket(wsUrl);
      console.log('ws connect: ', wsUrl);
      socket.onmessage = function(msg) {
        emitter.$emit("message", msg.data);
      };
      socket.onerror = function(err) {
        emitter.$emit("error", err);
      };
      socket.onclose = function() {
        emitter.connect();
      };
    }
  }
});

emitter.connect();
export const emitter;