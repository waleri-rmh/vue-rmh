<template src="./rmh-step-action.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-step-action',

  mixins: [component],

  props: {
    prevLabel: {
      type: String,
      default: null
    },
    nextLabel: {
      type: String,
      default: null
    },
    doneLabel: {
      type: String,
      default: null
    },
    prevDisabled: {
      type: Boolean,
      default: false
    },
    nextDisabled: {
      type: Boolean,
      default: false
    },
    doneDisabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {}
    },

    steps () {
      return this.$parent.$parent.steps
    },

    _prevLabel () {
      return this.$parent.$parent.prevLabel
    },

    _nextLabel () {
      return this.$parent.$parent.nextLabel
    },

    _doneLabel () {
      return this.$parent.$parent.doneLabel
    },

    selectedStepIndex () {
      return this.$parent.$parent.selectedStepIndex
    }
  },

  methods: {
    prev () {
      this.$parent.$parent.beforeUpdate('prev')
      this.$parent.update('prev')
    },

    next () {
      this.$parent.$parent.beforeUpdate('next')
      this.$parent.update('next')
    },

    done () {
      this.$parent.$parent.done()
    },

    prevIndex (current = null) {
      return this.$parent.$parent.prevIndex(current)
    },

    nextIndex (current = null) {
      return this.$parent.$parent.nextIndex(current)
    }
  },
}
</script>

<style src="./rmh-step-action.styl" lang="stylus"></style>
