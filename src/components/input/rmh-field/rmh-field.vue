<template src="./rmh-field.html"></template>

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-field',

  props: {
    static: {
      type: Boolean,
      default: false
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    validation: {
      type: Object,
      default: null
    }
  },

  mixins: [component],

  computed: {
    classes () {
      return {
        focused: this.focused,
        filled: (this.filled && !this.static) || this.placeholder !== ''
      }
    }
  },

  data: () => ({
    focused: false,
    filled: false,
    errorMessage: '',
    value: ''
  }),

  methods: {
    focus (e) {
      this.value = e.target ? e.target.value : e.value
      this.filled = this.value && this.value !== ''
      this.focused = true
    },

    blur (e) {
      this.value = e.target ? e.target.value : e.value
      this.filled = this.value && this.value !== ''
      setTimeout(() => {
        this.focused = false
      }, 300)
    },

    update (value) {
      this.value = value
      this.filled = this.value && this.value !== ''
    }
  }
}
</script>

<style src="./rmh-field.styl" lang="stylus"></style>
