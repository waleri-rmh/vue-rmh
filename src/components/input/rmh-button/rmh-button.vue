<template src="./rmh-button.html"></template>

<script>
import component from '../../../mixins/component'
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
      default: ''
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

  data: () => ({
    localValue: ''
  }),

  mounted () {
    this.localValue = this.value
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    }
  },

  watch: {
    localValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.localValue = val
    }
  }
}
</script>

<style src="./rmh-button.styl" lang="stylus"></style>
