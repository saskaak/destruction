<template>
  <div class="App">
    <div class="App__container">

      <div class="App__grid">
        <div class="App__relative">

          <img
            :src="require('./assets/emile-seguin-R9OueKOtGGU-unsplash.jpg')"
            :class="['App__image', {'App__image--hide': hideImage}]"
            title="Photo by EMILE SÉGUIN 🇨🇦 on Unsplash"
          >
          <div class="App__text">
            <Destroyable
              v-for="(word, index) in textArray"
              :key="index"
              :activated="hideDestroyables"
              :position="index / destroyableItems"
              :duration="1"
            >
              {{word}}&nbsp;
            </Destroyable>

            <div class="App__author">
              <Destroyable
                v-for="(word, index) in authorArray"
                :key="index"
                :activated="hideDestroyables"
                :position="textArray.length + index / destroyableItems"
                :duration="0"
              >
                {{word}}&nbsp;
              </Destroyable>
            </div>
          </div>

        </div>
      </div>

      <div
        :class="['App__button', {
          'App__button--hidden': hideButton,
        }]"
      >
        <Button @click.native.once="process">
          !
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Destroyable from "./components/Destroyable";
  import Button from "./components/Button";

  function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  export default {
    name: 'app',
    components: {
      Destroyable,
      Button,
    },
    data() {
      return {
        text: 'Il semble que la perfection soit atteinte non quand il n\'y a plus rien à ajouter, mais quand il n\'y a plus rien à retrancher.',
        author: 'Antoine de Saint Exupéry',
        hideButton: false,
        hideDestroyables: false,
        hideImage: false,
      };
    },
    computed: {
      destroyableItems() {
        return [
          ...this.textArray,
          ...this.authorArray,
        ].length;
      },
      textArray() {
        return this.text.split(' ');
      },
      authorArray() {
        return this.author.split(' ');
      },
    },
    methods: {
      async process() {
        this.hideButton = true;

        this.hideImage = true;
        this.hideDestroyables = true;
        await sleep(4);

        window.Cookies.set('destroyed', 'true');

        const pace = await this.destroyTitle(3.5);
        await sleep(pace);

        this.destroyFavicon();
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

  .App {
    font-family: 'Source Serif Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #444;
  }

  .App__container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    max-width: 960px;
    margin: 0 auto;

    @media (min-width: 30rem) {
      padding: 0 2rem;
    }
  }

  .App__grid {
    position: relative;
    display: flex;
    min-height: 100vh;
    max-width: 30rem;
    width: 100%;

    @media (min-width: 30rem) {
      align-items: center;
    }
  }

  .App__relative {
    position: relative;
    padding: 0 0 2rem;

    @media (min-width: 30rem) {
      padding: 2rem 0 4rem;
    }
  }

  .App__image {
    width: 100%;
    transition: 5s;

    &--hide {
      opacity: 0;
    }
  }

  .App__text {
    position: absolute;
    top: 4rem;
    left: 0;
    font-size: 1.2rem;
    line-height: 1.5;
    padding: 2rem;
    transition: 5s;

    @media (min-width: 30rem) {
      font-size: 1.5rem;
      padding: 4rem;
    }
  }

  .App__author {
    color: #bbb;
  }

  .App__button {
    height: 8rem;
    transition: 0.5s;
    overflow: hidden;
    padding: 0 2rem;

    &--hidden {
      visibility: hidden;
      opacity: 0;
      height: 0;
    }
  }
</style>
