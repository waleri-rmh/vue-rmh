<template src="./rmh-step.html" />

<script>
import { component } from '@/mixins'
import { rmhStepAction } from '@/components'

export default {
  name: 'rmh-step',

  components: {
    rmhStepAction
  },

  mixins: [component],

  props: {
    label: {
      type: String,
      default: 'Item'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    visible: false,
    _disabled: false
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    hasCustomAction () {
      if (!this.hasDefaultSlot) return false
      const actions = this.$slots.default.filter(child => child.componentOptions && child.componentOptions.tag === 'rmh-step-action')
      return actions.length > 0
    }
  },

  watch: {
    disabled (value) {
      if (value !== this._disabled)
        this._disabled = value
    },
    _disabled (value) {
      if (value !== this.disabled)
        this.$emit('update:disabled', value)
    }
  },

  mounted () {
    this._disabled = this.disabled
  },

  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    disable () {
      this._disabled = true
      this.$parent._disabled = true
    },

    enable () {
      this._disabled = false
      this.$parent._disabled = false
    },

    update (action) {
      this.$forceUpdate()
      this.$nextTick(() => {
        this.setSelectedStepIndex(action === 'next' ? this.nextIndex() : this.prevIndex())
        this.$parent.update(action)
      })
    },

    setSelectedStepIndex (index) {
      this.$parent.setSelectedStepIndex(index)
    },

    prevIndex (current = null) {
      return this.$parent.prevIndex(current)
    },

    nextIndex (current = null) {
      return this.$parent.nextIndex(current)
    }
  }
}
</script>
