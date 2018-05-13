<template src="./rmh-checkbox.html"></template>

<script>
import component from '../../../mixins/component'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-checkbox',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    model: [String, Boolean, Object, Number, Array],
    id: {
      type: String,
      default: null
    },
    name: [String, Number],
    value: {
      type: [String, Boolean, Object, Number],
      default: 'on'
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
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

  data: () => ({
    uId: null
  }),

  mounted () {
    this.$refs.field.inputMounted(this.value)
    this.uId = this.id ? this.id : 'rmh-checkbox-' + this._uid
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    },

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

    focus (e) {
      this.$refs.field.focus(e)
    },

    blur (e) {
      this.$refs.field.blur(e)
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
