<template>
  <svg viewBox="25 25 50 50" class="svg">
    <circle cx="50" cy="50" r="20" class="circle"></circle>
  </svg>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.svg {
  width: 3em;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

.circle {
  fill: none;
  stroke: #a0aec0;
  stroke-width: 4;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>