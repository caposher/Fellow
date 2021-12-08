<template>
  <div class="container">
    <h2>Lets Chat About {{ toy.name }}</h2>
    <form @submit.prevent="sendMsg">
      <input
        type="text"
        v-model="msg.txt"
        placeholder="Your msg"
        @input="typing"
      />
      <button>Send</button><br />
      <small v-if="isTyping">{{ typingUser }} is typing...</small>
    </form>
    <hr />
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";

export default {
  props: {
    toy: {
      type: Object,
    },
  },
  data() {
    return {
      msg: { from: "", txt: "" },
      msgs: [],
      isTyping: false,
      typingUser: null,
    };
  },
  created() {
    // socketService.setup();
    socketService.emit("chat topic", this.toy.name);
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("chat userTyping", this.userTyping);
    this.msg.from = this.user.fullName;
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    // socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.unshift(msg);
    },
    sendMsg() {
      // console.log("Sending", this.msg);
      socketService.emit("chat newMsg", this.msg);
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg = { from: this.user.fullName, txt: "" };
    },
    userTyping(fullName) {
      // console.log("someone typing");
      this.isTyping = true;
      this.typingUser = fullName;
      setTimeout(() => {
        this.isTyping = false;
      }, 2000);
    },
    typing() {
      // console.log("sendTyping");
      socketService.emit("chat sendTyping", this.user.fullName);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
