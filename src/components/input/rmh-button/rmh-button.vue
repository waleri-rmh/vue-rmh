<template src="./rmh-button.html" />

<script>
import { component } from '@/mixins'
import { rmhIcon } from '@/components'

export default {
  name: 'rmh-button',

  components: {
    rmhIcon
  },

  mixins: [component],

  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    localValue: {
      get () {
        return this.mutable(this.value)
      },
      set (value) {
        this.$nextTick(() => {
          if (value !== this.value) {
            this.$emit('input', value)
          }
        })
      }
    }
  },

  watch: {
    value (value) {
      if (value !== this.localValue) {
        this.localValue = value
      }
    }
  }
}
</script>

<style src="./rmh-button.styl" lang="stylus"></style>
