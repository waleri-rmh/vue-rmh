<template src="./rmh-stepper.html"></template>

<script>
import { component } from '@/mixins'

import {
  rmhButton,
  rmhStepHeader
} from '@/components'

export default {
  name: 'rmh-stepper',

  mixins: [component],

  props: {
    prevLabel: {
      type: String,
      default: 'Prev'
    },
    nextLabel: {
      type: String,
      default: 'Next'
    },
    doneLabel: {
      type: String,
      default: 'Done'
    }
  },

  components: {
    rmhStepHeader,
    rmhButton
  },

  data: () => ({
    steps: [],
    selectedStep: null,
    selectedStepIndex: -1
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {}
    }
  },

  mounted () {
    this.fetchSteps()
  },

  watch: {
    selectedStepIndex () {
      this.changedSelectedStep()
    }
  },

  methods: {
    setSelectedStepIndex (index) {
      if (index === null || (index !== null && this.steps[index]._disabled))
        return
      this.selectedStepIndex = parseInt(index)
      this.selectedStep = this.steps[index]
      this.steps.forEach((step) => {
        step.hide()
        if (step === this.selectedStep) {
          step.show()
        }
      })
    },

    fetchSteps () {
      this.steps = this.$children.filter(child => child.$options._componentTag === 'rmh-step')
      this.checkPropActivated()
    },

    checkPropActivated () {
      this.steps.forEach((step, index) => {
        if (!!step.active) {
          this.setSelectedStepIndex(index)
          return
        }
      })
      this.setSelectedStepIndex(this.nextIndex(-1))
    },

    changedSelectedStep () {
      this.$emit('change', {
        step: this.selectedStep,
        target: this.selectedStep.$el,
        index: this.selectedStepIndex
      })
    },

    beforeUpdate (action) {
      this.$emit('beforeUpdate', {
        steps: {
          prev: this.steps[this.prevIndex()],
          current: this.selectedStep,
          next: this.steps[this.nextIndex()]
        },
        index: this.selectedStepIndex,
        action: action
      })
      this.$forceUpdate()
    },

    update (action) {
      this.$emit('update', {
        steps: {
          prev: this.steps[this.prevIndex()],
          current: this.selectedStep,
          next: this.steps[this.nextIndex()]
        },
        index: this.selectedStepIndex,
        action: action
      })
    },

    done () {
      this.$emit('done')
    },

    prevIndex (current = null) {
      if (current === null)
        current = this.selectedStepIndex
      let prevIndex = current - 1
      if (prevIndex < 0)
        return null
      if (this.steps[prevIndex] && this.steps[prevIndex]._disabled === false)
        return prevIndex
      else return this.prevIndex(prevIndex)
    },

    nextIndex (current = null) {
      if (current === null)
        current = this.selectedStepIndex
      let nextIndex = current + 1
      if (nextIndex > this.steps.length - 1)
        return null
      if (this.steps[nextIndex] && this.steps[nextIndex]._disabled === false)
        return nextIndex
      else return this.nextIndex(nextIndex)
    }
  }
}
</script>

<style src="./rmh-stepper.styl" lang="stylus"></style>
