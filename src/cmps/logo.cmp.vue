<template>
  <div>
    <div class="con">
      <div class="up"></div>
      <div class="down"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@keyframes up {
  0% {
    width: 11px;
  }
  50% {
    width: 6px;
  }
  100% {
    width: 11px;
  }
}
@keyframes down {
  0% {
    width: 6px;
  }
  50% {
    width: 11px;
  }
  100% {
    width: 6px;
  }
}

.con {
  width: 16px;
  height: 15px;
  background-color: #fff;
  padding: 2px;
  margin-top: 3px;
  margin-right: 4px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.up {
  width: 11px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1px;
  transition: 0.3s;
}
.down {
  width: 6px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1px;
  transition: 0.3s;
}

.logo:hover .up {
  animation-name: up;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}
.logo:hover .down {
  animation-name: down;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}
</style>
