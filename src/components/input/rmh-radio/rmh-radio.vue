<template src="./rmh-radio.html"></template>

<script>
import component from '../../../mixins/component'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-radio',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    model: [String, Number, Boolean],
    id: {
      type: String,
      default: null
    },
    name: [String, Number],
    value: {
      type: [String, Number, Boolean],
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
    this.uId = this.id ? this.id : 'rmh-radio-' + this._uid
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    },

    isSelected () {
      return this.model === this.value
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
    focus (e) {
      this.$refs.field.focus(e)
    },

    blur (e) {
      this.$refs.field.blur(e)
    },

    toggle (e) {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style src="./rmh-radio.styl" lang="stylus"></style>
