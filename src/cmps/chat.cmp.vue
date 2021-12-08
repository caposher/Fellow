<template>
  <section>
    <ul id="messages"></ul>
    <form id="form" action="">
      <label>
        <input
          type="radio"
          name="topic"
          value="love"
          onchange="setTopic(this.value)"
        />
        Love
      </label>
      <label>
        <input
          type="radio"
          name="topic"
          value="politics"
          onchange="setTopic(this.value)"
        />
        Politics
      </label>
      <input id="input" autocomplete="off" />
      <button>Send</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      gTopic: "",
      nickname: "",
    };
  },
  created() {
    this.nickname = localStorage.userNickname || prompt("Whats your name?");
    localStorage.userNickname = nickname;
  },
  methods: {
    setTopic(topic) {
      gTopic = topic;
      socket.emit("chat setTopic", topic);
    },
  },
};
</script>

<style></style>
