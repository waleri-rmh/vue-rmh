<template src="./rmh-tab.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-tab',

  mixins: [component],

  props: {
    label: {
      type: String,
      default: 'Item'
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isActive: false
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        'active': this.isActive
      }
    }
  },

  mounted () {
    if (this.active) {
      this.activate()
    }
  },

  watch: {
    active (value) {
      if (value) {
        this.activate()
      } else {
        this.deactivate()
      }
    }
  },

  methods: {
    activate () {
      this.isActive = true
      this.$emit('tabActivated', this)
    },

    deactivate () {
      this.isActive = false
    }
  }
}
</script>

<style src="./rmh-tab.styl" lang="stylus"></style>
