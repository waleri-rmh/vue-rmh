<template src="./rmh-button.html"></template>

<script>
import component from '@/mixins/component'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-button',

  mixins: [component],

  components: {
    rmhIcon
  },

  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    localValue: {
      get () {
        return this.mutable(this.value)
      },
      set (value) {
        this.$nextTick(() => {
          if (value !== this.value) {
            this.$emit('input', value)
          }
        })
      }
    }
  },

  watch: {
    value (val) {
      if (value !== this.localValue) {
        this.localValue = value
      }
    }
  }
}
</script>

<style src="./rmh-button.styl" lang="stylus"></style>
