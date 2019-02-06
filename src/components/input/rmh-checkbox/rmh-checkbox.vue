<template src="./rmh-checkbox.html"></template>

<script>
import component from '@/mixins/component'
import input from '@/mixins/input'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-checkbox',

  mixins: [
    component,
    input
  ],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    model: [String, Boolean, Object, Number, Array],
    name: [String, Number],
    value: {
      type: [String, Boolean, Object, Number],
      default: 'on'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'model',
    event: 'change'
  },

  mounted () {
    this.$refs.field.update(this.value)
  },

  computed: {
    isSelected () {
      if (this.isModelArray) {
        return this.model.includes(this.value)
      }

      if (this.isModelBoolean && this.value === 'on') {
        return this.model
      }

      return this.model === this.value
    },

    isModelArray () {
      return Array.isArray(this.model)
    },

    isModelBoolean () {
      return typeof this.model === 'boolean'
    },

    classes () {
      return {
        'checked': this.isSelected,
        'disabled': this.disabled,
        'required': this.required,
        'inline': this.inline
      }
    }
  },

  methods: {
    removeItemFromModel (newModel) {
      const index = newModel.indexOf(this.value)

      if (index !== -1) {
        newModel.splice(index, 1)
      }
    },

    handleArrayCheckbox () {
      const newModel = this.model

      if (!this.isSelected) {
        newModel.push(this.value)
      } else {
        this.removeItemFromModel(newModel)
      }

      this.$emit('change', newModel)
    },

    handleStringCheckbox () {
      if (!this.isSelected) {
        this.$emit('change', this.value)
      } else {
        this.$emit('change', null)
      }
    },

    handleBooleanCheckbox () {
      this.$emit('change', !this.model)
    },

    toggle (e) {
      if (!this.disabled) {
        if (this.isModelArray) {
          this.handleArrayCheckbox()
        } else if (this.isModelBoolean) {
          this.handleBooleanCheckbox()
        } else {
          this.handleStringCheckbox()
        }
      }
    }
  }
}
</script>

<style src="./rmh-checkbox.styl" lang="stylus"></style>
