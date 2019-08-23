<template src="./rmh-picker.html" />

<script>
import moment from 'moment'

import {
  component,
  input
} from '@/mixins'

import {
  rmhPickerOverlay,
  rmhButton,
  rmhField,
  rmhIcon
} from '@/components'

const config = {
  format: 'YYYY-MM-DD',
  locale: 'en'
}

export default {
  name: 'rmh-picker',

  components: {
    rmhPickerOverlay,
    rmhButton,
    rmhField,
    rmhIcon
  },

  mixins: [
    component,
    input
  ],

  props: {
    value: {
      type: [String],
      default: null
    },
    format: {
      type: [String],
      default: config.format
    },
    locale: {
      type: [String],
      default: config.locale
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
    open: false,
    selected: null,
    preview: null,
    forceFocus: false,
  }),

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

    current () {
      const current = moment().locale(this.locale)
      return this.getFullObject(current)
    },

    localValue: {
      get () {
        return this.mutable(this.value)
      },
      set (value) {
        this.$nextTick(() => {
          if (value !== this.value) {
            this.$emit('input', value)
            this.$refs.field.update(value)
          }
        })
      }
    }
  },

  watch: {
    value (value) {
      this.setDate(value)
      this.$refs.field.update(value)
    }
  },

  mounted () {
    this.setDate(this.value)
    this.$refs.field.update(this.value)
  },

  methods: {
    focus () {
      if (this.disabled) return
      this.open = true
      this.$refs.field.focus(this.$refs.input)
    },

    blur () {
      if (this.disabled) return
      setTimeout(() => {
        if (!this.forceFocus) {
          this.open = false
          this.$refs.field.blur(this.$refs.input)
        } else {
          this.$refs.input.focus()
          this.forceFocus = false
        }
      }, 300)
    },

    fakeFocus () {
      if (this.disabled) return
      this.forceFocus = true
    },

    setDate (value = null) {
      const asMoment = !value
        ? moment().locale(this.locale || config.locale)
        : moment(value, this.format || config.format).locale(this.locale || config.locale)
      this.setSelected(asMoment)
      if (!value) {
        this.$refs.field.update(value)
      }
    },

    getFullObject (value) {
      return {
        day: {
          value: value.date(),
          fullValue: value.format('DD'),
          name: value.format('dddd'),
          shortName: value.format('ddd')
        },
        month: {
          value: value.month() + 1,
          fullValue: value.format('MM'),
          name: value.format('MMMM'),
          shortName: value.format('MMM')
        },
        year: value.year(),
        date: {
          moment: value,
          timestamp: value.unix(),
          string: value.format(this.format),
          config: value._locale
        }
      }
    },

    setSelected (value) {
      this.selected = value ? this.getFullObject(value) : null
      this.setPreview(this.selected.date.moment)
      this.localValue = this.selected.date.string
      this.$emit('change', this.selected)
    },

    setPreview (value) {
      this.preview = value ? this.getFullObject(value) : null
    },

    applyPreview () {
      this.setSelected(this.preview.date.moment)
    },

    getText (value) {
      return value ? (value.text || value.toString()) : null
    }
  }
}
</script>

<style src="./rmh-picker.styl" lang="stylus"></style>
