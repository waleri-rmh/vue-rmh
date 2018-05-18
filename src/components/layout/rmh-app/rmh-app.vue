<template src="./rmh-app.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-app',

  props: {
    fixedToolbar: {
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
        'fixed-toolbar': this.fixedToolbar
      }
    }
  },

  mounted () {
    this.calculateContentHeight()
  },

  updated () {
    this.calculateContentHeight()
  },

  methods: {
    calculateContentHeight () {
      const toolbar = document.querySelector('.rmh-app > .rmh-app-container > .rmh-toolbar')
      const content = document.querySelector('.rmh-app > .rmh-app-container > .rmh-content')
      if (!content)
        return
      if (this.fixedToolbar && toolbar) {
          content.style.height = 'calc(100% - ' + toolbar.clientHeight + 'px)'
      } else {
        content.style.height = 'auto'
      }
    }
  }
}
</script>

<style src="./rmh-app.styl" lang="stylus"></style>
