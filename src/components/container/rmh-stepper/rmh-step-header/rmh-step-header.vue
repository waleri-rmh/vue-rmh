<template src="./rmh-step-header.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-step-header',

  mixins: [component],

  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        'active': this.active,
        'disabled': this.disabled
      }
    }
  }
}
</script>

<style src="./rmh-step-header.styl" lang="stylus"></style>
