<template src="./rmh-app.html"></template>

<script>
import component from '../../../mixins/component'

export default {
  name: 'rmh-app',

  props: {
    fixedToolbar: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    menu: null
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        'fixed-toolbar': this.fixedToolbar
      }
    }
  },

  mounted () {
    this.menu = this.$children.filter(child => { return child.$options._componentTag === 'rmh-drawer' })[0]
  }
}
</script>

<style src="./rmh-app.styl" lang="stylus"></style>
