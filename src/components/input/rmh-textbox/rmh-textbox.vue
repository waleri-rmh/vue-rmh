<template src="./rmh-textbox.html" />

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
  name: 'rmh-textbox',

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
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    area: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required,
        'is-textarea': this.area
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
        this.$refs.field.update(value)
      }
    }
  },

  mounted () {
    this.$refs.field.update(this.value)
  },
}
</script>

<style src="./rmh-textbox.styl" lang="stylus"></style>
