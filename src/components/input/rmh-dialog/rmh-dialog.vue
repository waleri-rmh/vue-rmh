<template src="./rmh-dialog.html"></template>

<script>
import component from '@/mixins/component'
import rmhButton from '@/components/input/rmh-button/rmh-button'
import rmhIcon from '@/components/input/rmh-icon/rmh-icon'

export default {
  name: 'rmh-dialog',

  mixins: [component],

  components: {
    rmhButton,
    rmhIcon
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
    }
  },

  data: () => ({
    transitionEnd: true
  }),

  watch: {
    open (value) {
      if (value) {
        this.transitionEnd = true
      }
    }
  },

  updated () {
    if (!this.transitionEnd) {
      setTimeout(() => {
        this.open = false
        this.$emit('update:open', this.open)
        this.transitionEnd = true
      }, 400)
    }
  },

  methods: {
    close () {
      this.transitionEnd = false
    },

    wallCloseTrigger () {
      if (this.wallClose) {
        this.close()
      }
    }
  }
}
</script>

<style src="./rmh-dialog.styl" lang="stylus"></style>
