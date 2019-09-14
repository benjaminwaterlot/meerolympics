<template>
  <div :class="$style.container">
    <div :class="$style.square" :style="{ 'background-color': color }"></div>
    <div :class="$style.title">
      <p>Hello,</p>
      <p :class="$style.name">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainTitle',
  props: {
    name: {
      type: String,
      default: 'there'
    },
    color: {
      type: String,
      default: '#80D1CA'
    }
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
}

.square {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-top: 4px;
}

.title {
  font-size: 32px;
  line-height: 32px;
  margin-left: 10px;
}

.name {
  font-weight: bold;
}
</style>
