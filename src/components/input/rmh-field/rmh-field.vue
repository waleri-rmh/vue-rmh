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
    validation: {
      type: [Boolean, String],
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
  },

  mixins: [component],

  computed: {
    classes () {
      return {
        focused: this.focused,
        filled: (this.filled && !this.static) || this.placeholder !== '',
        invalid: this.hasError || this.hasRequiredError
      }
    },

    errorMessage () {
      return typeof this.validation === 'string' ? this.validation : ''
    },

    requiredErrorMessage () {
      return typeof this.required === 'string' ? this.required : ''
    },
  },

  data: () => ({
    focused: false,
    filled: false,
    hasError: false,
    hasRequiredError: false
  }),

  watch: {
    validation () {
      this.validate()
      this.$forceUpdate()
    }
  },

  methods: {
    focus (e) {
      const value = e.target ? e.target.value : e.value
      this.filled = value && value !== ''
      this.focused = true
    },

    blur (e) {
      const value = e.target ? e.target.value : e.value
      this.filled = value && value !== ''
      this.validate()
      this.validateRequired(value)
      setTimeout(() => {
        this.focused = false
      }, 300)
    },

    inputMounted (val) {
      this.validate()
    },

    inputUpdated (val) {
      this.filled = val && val !== ''
      this.validate()
      this.validateRequired(val)
      this.$forceUpdate()
    },

    validate () {
      this.hasError = this.checkError(this.validation)
    },

    validateRequired (val = null) {
      const filled = val && val !== ''
      this.hasRequiredError = this.checkError(this.required) && !filled
    },

    checkError (value) {
      return typeof value === 'boolean' ? value === true : true
    }
  }
}
</script>

<style src="./rmh-field.styl" lang="stylus"></style>
