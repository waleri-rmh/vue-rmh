<template src="./rmh-app.html"></template>

<script>
import { component } from '@/mixins'

import {
  rmhToolbar,
  rmhDrawer,
  rmhContent
} from '@/components'

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
