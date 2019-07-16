<template src="./rmh-picker.html" />

<script>
import {
  component,
  input
} from '@/mixins'

import {
  rmhField,
  rmhIcon
} from '@/components'

export default {
  name: 'rmh-picker',

  components: {
    rmhField,
    rmhIcon
  },

  mixins: [
    component,
    input
  ],

  props: {
    value: {
      type: [String, Number, Object],
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    localValueText: '',
    selectedItem: {
      value: null,
      text: ''
    },
    open: false
  }),

  computed: {
    classes () {
      return {
        'open': this.open,
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required
      }
    },

    localValue: {
      get () {
        return this.mutable(this.value)
      },
      set (value) {
        this.$nextTick(() => {
          if (value !== this.value) {
            this.$emit('input', value)
            this.$refs.field.update(value)
          }
        })
      }
    }
  },

  watch: {
    value (value) {
      if (value !== this.localValue) {
        this.localValueText = this.getText(value)
        this.$refs.field.update(value)
      }
    }
  },

  mounted () {
    this.localValueText = this.getText(this.value)
    this.$refs.field.update(this.value)
  },

  methods: {
    focus () {
      if (this.disabled) return
      this.open = true
      this.$refs.field.focus(this.$refs.input)
    },

    blur () {
      if (this.disabled) return
      setTimeout(() => {
        this.open = false
      }, 300)
      this.$refs.field.blur(this.$refs.input)
    },

    fakeFocus () {
      if (this.disabled) return
      if (!this.open) this.$refs.input.focus()
    },

    select (item) {
      this.selectedItem = item
      this.localValue = item.value
      this.localValueText = this.getText(item.value)
      this.$refs.field.update(item.value)
      this.open = false
    },

    getText (value) {
      return value ? (value.text || value.toString()) : null
    }
  }
}
</script>

<style src="./rmh-picker.styl" lang="stylus"></style>
