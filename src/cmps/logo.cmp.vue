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
    width: 16;
  }
  50% {
    width: 8px;
  }
  100% {
    width: 16;
  }
}
@keyframes down {
  0% {
    width: 8px;
  }
  50% {
    width: 16px;
  }
  100% {
    width: 8px;
  }
}

.con {
  width: 21px;
  height: 21px;
  background-color: #fff;
  padding: 2px;
  margin-right: 4px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.up {
  width: 16px;
  height: 5px;
  background-color: black;
  border-radius: 2px;

  transition: 0.3s;
}
.down {
  width: 8px;
  height: 5px;
  background-color: black;
  border-radius: 2px;
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
