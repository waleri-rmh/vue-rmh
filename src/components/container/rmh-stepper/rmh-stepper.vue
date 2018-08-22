<template src="./rmh-stepper.html"></template>

<script>
import component from '@/mixins/component'
import rmhStepHeader from './rmh-step-header/rmh-step-header'
import rmhButton from '@/components/input/rmh-button/rmh-button'

export default {
  name: 'rmh-stepper',

  mixins: [component],

  components: {
    rmhStepHeader,
    rmhButton
  },

  props: {
    prevLabel: {
      type: String,
      default: 'prev'
    },
    prevCallback: {
      type: Function,
      default: null
    },
    nextLabel: {
      type: String,
      default: 'next'
    },
    nextCallback: {
      type: Function,
      default: null
    },
    doneLabel: {
      type: String,
      default: 'Done'
    },
    doneCallback: {
      type: Function,
      default: null
    }
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
      this.setSelectedStepIndex(0)
    },

    changedSelectedStep () {
      this.$emit('change', {
        step: this.selectedStep,
        target: this.selectedStep.$el,
        index: this.selectedStepIndex
      })
    },

    prev () {
      this.setSelectedStepIndex(this.selectedStepIndex - 1)
      if (this.prevCallback)
        this.prevCallback()
    },

    next () {
      this.setSelectedStepIndex(this.selectedStepIndex + 1)
      if (this.nextCallback)
        this.nextCallback()
    },

    done () {
      if (this.doneCallback)
        this.doneCallback()
      else this.$emit('done')
    },
  }
}
</script>

<style src="./rmh-stepper.styl" lang="stylus"></style>
