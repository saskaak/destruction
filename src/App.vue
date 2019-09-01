<template>
  <div class="App">
    <div class="App__container">
      <div class="App__text">
        <Destroyable
          v-for="(word, index) in textArray"
          :key="index"
          :activated="hideText"
          :position="index / textArray.length"
          :duration="2"
        >
          {{word}}&nbsp;
        </Destroyable>
      </div>

      <button
        @click.once="process"
        :class="['App__button', {
          'App__button--hidden': hideButton,
        }]"
      >
        !
      </button>
    </div>
  </div>
</template>

<script>
  import Destroyable from "./components/Destroyable";

  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  export default {
    name: 'app',
    components: {
      Destroyable
    },
    data() {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        hideButton: false,
        hideText: false,
      };
    },
    computed: {
      textArray() {
        return this.text.split(' ');
      },
    },
    methods: {
      async process() {
        this.hideButton = true;
        await sleep(0.5);

        this.hideText = true;
        await sleep(3);

        const pace = await this.destroyTitle(3);
        await sleep(pace);

        this.destroyFavicon();

        window.Cookies.set('destroyed', 'true');
      },
      async destroyTitle(seconds) {
        const title = document.title;
        const titleLength = title.length;
        const pace = seconds / (titleLength - 1);

        for (let i = 0; i < titleLength - 1; i++) {
          document.title = document.title.slice(0, -1);
          await sleep(pace);
        }

        document.title = '⠀';
        return pace;
      },
      destroyFavicon() {
        document.getElementById('favicon-16').setAttribute('href', 'favicons/favicon-empty-16.png');
        document.getElementById('favicon-32').setAttribute('href', 'favicons/favicon-empty-32.png');
      }
    }
  }
</script>

<style lang="scss">
  @import "~reset-css";
  @import "definitions";

  .App {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .App__container {
    max-width: 640px;
    margin: 0 auto;
    padding: 4rem 1rem;
  }

  .App__text {
    margin-bottom: 4rem;
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .App__button {
    display: block;
    margin: 0 auto;
    border: 0;
    width: 8rem;
    height: 8rem;
    padding: 0;
    font-family: inherit;
    font-size: 5rem;
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 5rem;
    background-color: $red;
    color: white;
    cursor: pointer;
    letter-spacing: 0.1rem;
    transition: 0.5s;

    &:focus,
    &:hover {
      outline: none;
      box-shadow: 0 0.2rem 0.5rem 0 rgba(black, 0.3);
    }

    &--hidden {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
