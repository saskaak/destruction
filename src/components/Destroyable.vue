<template>
  <div
    :class="['Destroyable', {
      'Destroyable--activated': activated
    }]"
    :style="{transition: `1s ${duration - position * duration}s ease-in`}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: [
      'activated',
      'position',
      'duration',
    ],
  }
</script>

<style lang="scss">
  .Destroyable {
    display: inline-block;

    &--activated {
      visibility: hidden;
      opacity: 0;
      transform: translateY(1rem);
    }
  }
</style>
