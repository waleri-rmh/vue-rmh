<template src="./rmh-field.html"></template>

<script>
import component from '@/mixins/component.vue'

export default {
  name: 'rmh-field',

  props: {
    static: {
      type: Boolean,
      default: false
    },
    validationTerm: {
      type: String,
      default: ''
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  mixins: [component],

  computed: {
    classes () {
      return {
        focused: this.focused,
        filled: (this.filled && !this.static) || this.placeholder !== '',
        invalid: this.hasError
      }
    }
  },

  data: () => ({
    focused: false,
    filled: false,
    errorMessage: '',
    value: '',
    hasError: false,
    validationCallback: null
  }),

  watch: {
    validationTerm () {
      this.validateSolo()
    }
  },


  methods: {
    focus (e) {
      this.value = e.target ? e.target.value : e.value
      this.filled = this.value && this.value !== ''
      this.focused = true
    },

    blur (e) {
      this.value = e.target ? e.target.value : e.value
      this.filled = this.value && this.value !== ''
      this.validateSolo()
      setTimeout(() => {
        this.focused = false
      }, 300)
    },

    inputMounted (value) {
      this.value = value
      this.filled = this.value && this.value !== ''
      this.validateSolo()
    },

    inputUpdated (value) {
      this.value = value
      this.filled = this.value && this.value !== ''
      this.validateSolo()
    },

    validateSolo () {
      if (!this.validationCallback) return
      this.validationCallback(this)
    }
  }
}
</script>

<style src="./rmh-field.styl" lang="stylus"></style>
