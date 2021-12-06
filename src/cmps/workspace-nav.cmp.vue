<template>
  <nav>
    <div class="nav-container collapsed" :class="openBar ? 'hidden' : 'shown'" @click="onOpenBar(true)">
      <div class="collapsed-main">
        <button><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
    <div class="nav-container expanded" :class="openBar ? 'shown' : 'hidden'">
      <div class="expanded-main">
        <div class="expanded-header">
          <div class="workspace-logo-wrapper">
            <div class="workspace-logo">F</div>
          </div>
          <span>Fellow Workspace</span
          ><button class="close-nav" @click="onOpenBar(false)">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
        <div class="expanded-body">
          <div class="body-header">Your boards</div>
          <div class="body-main">
            <ul>
              <li v-for="board in boards" :key="board._id">
                <router-link :to="{ name: 'board', params: { boardId: board._id } }">
                  <img :src="board.style.imgUrl" />
                  <p>{{ board.title }}</p>
                  <span class="star icon-star" @click.stop.prevent=""></span
                ></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    boards: {
      type: Array,
    },
  },
  data() {
    return {
      openBar: false,
    };
  },
  methods: {
    onOpenBar(val) {
      this.openBar = val;
      this.$emit('openBar', val);
    },
  },
};
</script>
