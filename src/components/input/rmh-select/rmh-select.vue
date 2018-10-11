<template src="./rmh-select.html"></template>

<script>
import component from '@/mixins/component'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-select',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    validation: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    localValue: '',
    localValueText: '',
    selectedItem: {
      value: null,
      text: ''
    },
    open: false
  }),

  mounted () {
    this.localValue = this.value
    this.localValueText = this.getText(this.value)
    this.$refs.field.inputMounted(this.value)
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    },

    classes () {
      return {
        'open': this.open,
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required
      }
    }
  },

  watch: {
    localValue (val) {
      if (val !== this.value) {
        this.$emit('input', val)
        this.$refs.field.inputUpdated(val)
      }
    },
    value (val) {
      if (val !== this.localValue) {
        this.localValue = val
        this.localValueText = this.getText(val)
        this.$refs.field.inputUpdated(val)
      }
    }
  },

  methods: {
    focus (e) {
      if (this.disabled) return
      this.open = true
      this.$refs.field.focus(this.$refs.input)
    },

    blur (e) {
      if (this.disabled) return
      setTimeout(() => {
        this.open = false
      }, 300)
      this.$refs.field.blur(this.$refs.input)
    },

    fakeFocus (e) {
      if (this.disabled) return
      if (!this.open)
        this.$refs.input.focus()
    },

    select (item) {
      this.selectedItem = item
      this.localValue = item.value
      this.localValueText = this.getText(item.value)
      this.$refs.field.inputMounted(item.value)
      this.open = false
    },

    getText (value) {
      if (typeof value === 'object' && value !== null) {
        return value.text
      }
      return value.toString()
    }
  }
}
</script>

<style src="./rmh-select.styl" lang="stylus"></style>
