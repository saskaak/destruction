<template>
  <Button class="Button">
    <span class="Button__icon">
      !
    </span>
  </Button>
</template>

<style lang="scss">
  @import "../definitions";

  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    70% {
      transform: rotate(0deg);
    }
    80% {
      transform: rotate(15deg);
    }
    90% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .Button {
    display: block;
    margin: 0 auto;
    border: 0;
    width: 4rem;
    height: 4rem;
    padding: 0;
    border-radius: 5rem;
    background-color: $red;
    cursor: pointer;
    transition: 0.2s;
    font-family: 'Source Sans Pro', sans-serif;

    &:focus,
    &:hover {
      outline: none;
      box-shadow: 0 0.25rem 0.5rem rgba($red, 0.75);
    }
  }

  .Button__icon {
    display: block;
    font-family: inherit;
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: white;
    animation: wiggle 1s infinite;
  }
</style>
