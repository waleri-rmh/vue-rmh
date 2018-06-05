<template src="./rmh-dialog.html"></template>

<script>
import component from '@/mixins/component'
import rmhButton from '@/components/input/rmh-button/rmh-button'
import rmhIcon from '@/components/input/rmh-icon/rmh-icon'
import rmhDialogHeader from './rmh-dialog-header/rmh-dialog-header'
import rmhDialogContent from './rmh-dialog-content/rmh-dialog-content'
import rmhDialogAction from './rmh-dialog-action/rmh-dialog-action'

export default {
  name: 'rmh-dialog',

  mixins: [component],

  components: {
    rmhIcon,
    rmhButton,
    rmhDialogHeader,
    rmhDialogContent,
    rmhDialogAction
  },

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
      type: String
    },
    content: {
      type: String
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
      type: String
    },
    confirmText: {
      type: String
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
