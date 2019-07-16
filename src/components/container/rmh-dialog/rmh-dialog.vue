<template src="./rmh-dialog.html" />

<script>
import { component } from '@/mixins'

import {
  rmhButton,
  rmhIcon,
  rmhDialogHeader,
  rmhDialogContent,
  rmhDialogAction
} from '@/components'

export default {
  name: 'rmh-dialog',

  components: {
    rmhIcon,
    rmhButton,
    rmhDialogHeader,
    rmhDialogContent,
    rmhDialogAction
  },

  mixins: [component],

  props: {
    open: {
      type: Boolean,
      default: false
    },
    wall: {
      type: Boolean,
      default: false
    },
    wallClose: {
      type: Boolean,
      default: false
    },
    withDivider: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    actions: {
      type: Array,
      default: null
    },
    alert: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: null
    },
    confirmText: {
      type: String,
      default: null
    }
  },

  data: () => ({
    transitionEnd: true,
    isOpen: this.open
  }),

  watch: {
    open (value) {
      this.isOpen = value
      if (value) {
        this.transitionEnd = true
      }
    }
  },

  updated () {
    if (!this.transitionEnd) {
      setTimeout(() => {
        this.isOpen = false
        this.$emit('update:open', this.isOpen)
        this.transitionEnd = true
      }, 400)
    }
  },

  methods: {
    close () {
      this.$emit('close')
      this.transitionEnd = false
    },

    wallCloseTrigger () {
      if (this.wallClose) {
        this.close()
      }
    },

    triggerConfirm (value) {
      this.close()
      this.$emit('confirm', value)
    }
  }
}
</script>

<style src="./rmh-dialog.styl" lang="stylus"></style>
