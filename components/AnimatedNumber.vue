<template>
  <div class="animated-number">
    <div class="numbers" ref="numbers">
      <div class="number up">{{ displayNumber + 1 }}</div>
      <div class="number current">{{ displayNumber }}</div>
      <div class="number down">{{ displayNumber - 1 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedNumber',
  props: { number: { default: 0 } },
  data() {
    return {
      displayNumber: 0,
      interval: false
    }
  },
  watch: {
    number() {
      this.numberFunc()
    }
  },
  mounted() {
    this.displayNumber = this.number
  },
  methods: {
    numberFunc() {
      clearTimeout(this.interval)

      if (this.number === this.displayNumber) {
        return
      }

      const numbers = this.$refs.numbers
      const ref = this

      let change = (this.number - this.displayNumber) / 10

      change = change >= 0 ? Math.ceil(change) : Math.floor(change)

      change >= 0
        ? numbers.classList.add('tickUp')
        : numbers.classList.add('tickDown')

      this.displayNumber = this.displayNumber + change

      this.interval = setTimeout(function() {
        numbers.classList.remove('tickUp')
        numbers.classList.remove('tickDown')
        ref.numberFunc()
      }, 150)
    }
  }
}
</script>
