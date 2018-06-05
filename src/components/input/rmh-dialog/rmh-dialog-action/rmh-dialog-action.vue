<template src="./rmh-dialog-action.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-dialog-action',

  mixins: [component],

  props: {
    alignRight: {
      type: Boolean,
      default: false
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    reversed: {
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
        'align-right': this.alignRight,
        'align-center': this.alignCenter,
        'reversed': this.reversed
      }
    }
  }
}
</script>

<style src="./rmh-dialog-action.styl" lang="stylus"></style>
