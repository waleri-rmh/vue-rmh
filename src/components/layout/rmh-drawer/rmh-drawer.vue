<template src="./rmh-drawer.html"></template>

<script>
import component from '@/mixins/component'

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
      default: () => {
        return null
      }
    }
  },

  data: () => ({
    right: false
  }),

  mounted () {
    this.right = (this.$parent && this.$parent.right) || false
  },

  updated () {
    this.right = (this.$parent && this.$parent.right) || false
  },

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
  }
}
</script>

<style src="./rmh-drawer.styl" lang="stylus"></style>
