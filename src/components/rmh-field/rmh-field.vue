<template src="./rmh-field.html"></template>

<script>
import component from '../../mixins/component.vue'

export default {
  name: 'rmh-field',

  props: {
    static: {
      type: Boolean,
      default: false
    }
  },

  mixins: [component],

  data: () => ({
    focused: false,
    filled: false
  }),

  methods: {
    focus (e) {
      this.filled = this.isFilled(e)
      this.focused = true
    },

    blur (e) {
      this.filled = this.isFilled(e)
      setTimeout(() => {
        this.focused = false
      }, 300)
    },

    isFilled (e) {
      const value = e.target ? e.target.value : e.value
      return value && value !== ''
    },

    inputMounted (val) {
      this.filled = val && val !== ''
    }
  }
}
</script>

<style src="./rmh-field.styl" lang="stylus"></style>
