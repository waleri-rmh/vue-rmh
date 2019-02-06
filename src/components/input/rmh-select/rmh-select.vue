<template src="./rmh-select.html"></template>

<script>
import component from '@/mixins/component'
import input from '@/mixins/input'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-select',

  mixins: [
    component,
    input
  ],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    value: {
      type: [String, Number, Object],
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    localValueText: '',
    selectedItem: {
      value: null,
      text: ''
    },
    open: false
  }),

  mounted () {
    this.localValueText = this.getText(this.value)
    this.$refs.field.update(this.value)
  },

  computed: {
    classes () {
      return {
        'open': this.open,
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required
      }
    },

    localValue: {
      get () {
        return this.value
      },
      set (value) {
        if (value !== this.value) {
          this.$emit('input', value)
          this.$refs.field.update(value)
        }
      }
    }
  },

  watch: {
    value (value) {
      if (value !== this.localValue) {
        this.localValueText = this.getText(value)
        this.$refs.field.update(value)
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
      if (!this.open) this.$refs.input.focus()
    },

    select (item) {
      this.selectedItem = item
      this.localValue = item.value
      this.localValueText = this.getText(item.value)
      this.$refs.field.update(item.value)
      this.open = false
    },

    getText (value) {
      return value ? (value.text || value.toString()) : null
    }
  }
}
</script>

<style src="./rmh-select.styl" lang="stylus"></style>
