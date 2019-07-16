<template src="./rmh-drawer.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-drawer',

  mixins: [component],

  props: {
    open: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    },
    wallClick: {
      type: Function,
      default: () => null
    }
  },

  data: () => ({
    right: false
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        right: this.right,
        open: this.open,
        persistent: this.persistent,
        mini: this.mini
      }
    }
  },

  mounted () {
    this.right = (this.$parent && this.$parent.right) || false
  },

  updated () {
    this.right = (this.$parent && this.$parent.right) || false
  }
}
</script>

<style src="./rmh-drawer.styl" lang="stylus"></style>
