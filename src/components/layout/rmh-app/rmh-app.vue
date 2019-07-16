<template src="./rmh-app.html" />

<script>
import { component } from '@/mixins'

import {
  rmhToolbar,
  rmhDrawer,
  rmhContent
} from '@/components'

export default {
  name: 'rmh-app',

  components: {
    rmhToolbar,
    rmhDrawer,
    rmhContent
  },

  mixins: [component],

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
