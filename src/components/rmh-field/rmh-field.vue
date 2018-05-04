<template src="./rmh-field.html"></template>

<script>
import component from '../../mixins/component.vue'

export default {
  name: 'rmh-field',

  mixins: [component],

  data: () => ({
    focused: false,
    filled: false
  }),

  methods: {
    focus (e) {
      this.filled = e.target.value && e.target.value !== ''
      this.focused = true
    },

    blur (e) {
      this.filled = e.target.value && e.target.value !== ''
      this.focused = false
    },

    inputMounted (val) {
      this.filled = val && val !== ''
    }
  }
}
</script>

<style src="./rmh-field.styl" lang="stylus"></style>
