<template src="./rmh-select.html" />

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
  name: 'rmh-select',

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

  data () {
    return {
      selectedItem: {
        value: null,
        text: ''
      },
      open: false
    }
  },

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
    },

    valueText () {
      return this.value ? (this.value.text || this.value.toString()) : null
    }
  },

  watch: {
    value (value) {
      if (value !== this.localValue) {
        this.$refs.field.update(value)
        this.$emit('change', value)
      }
    }
  },

  mounted () {
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
      this.$refs.field.update(item.value)
      this.open = false
    }
  }
}
</script>

<style src="./rmh-select.styl" lang="stylus"></style>
