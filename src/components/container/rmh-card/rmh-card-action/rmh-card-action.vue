<template src="./rmh-card-action.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-card-action',

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

<style src="./rmh-card-action.styl" lang="stylus"></style>
