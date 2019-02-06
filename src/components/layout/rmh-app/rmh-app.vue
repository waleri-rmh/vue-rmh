<template src="./rmh-app.html"></template>

<script>
import component from '@/mixins/component'
import rmhToolbar from '@/components/layout/rmh-toolbar/rmh-toolbar'
import rmhDrawer from '@/components/layout/rmh-drawer/rmh-drawer'
import rmhContent from '@/components/layout/rmh-content/rmh-content'

export default {
  name: 'rmh-app',

  mixins: [component],

  components: {
    rmhToolbar,
    rmhDrawer,
    rmhContent
  },

  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    clipped: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    toolbar: null,
    drawer: null,
    content: null
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        'fixed': this.fixed,
        'clipped': this.clipped,
        'right': this.right
      }
    }
  }
}
</script>

<style src="./rmh-app.styl" lang="stylus"></style>
