<template src="./rmh-drawer.html"></template>

<script>
import component from '../../../mixins/component'

export default {
  name: 'rmh-drawer',

  props: {
    right: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    persistent: {
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

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-drawer.styl" lang="stylus"></style>
