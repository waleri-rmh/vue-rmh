<template src="./rmh-file.html"></template>

<script>
import component from '@/mixins/component'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-file',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    value: {
      type: Object,
      default: {}
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'attach_file'
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
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    localValue: {},
    files: [],
    model: {}
  }),

  mounted () {
    this.model = {
      value: '',
      files: []
    }
    this.$refs.field.inputMounted(this.model.value)
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    },

    classes () {
      return {
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required
      }
    }
  },

  watch: {
    localValue: {
      handler (value) {
        this.$emit('input', value)
      },
      deep: true
    },
    model: {
      handler (value) {
        this.localValue = value
      },
      deep: true
    }
  },

  methods: {
    focus (e) {
      this.$refs.field.focus({
        value: this.model.value
      })
    },

    blur (e) {
      this.$refs.field.blur({
        value: this.model.value
      })
    },

    getMultipleName (files) {
      let names = [];
      [...files].forEach(({ name }) => names.push(name))
      return names.join(', ')
    },

    getFileName (files, target) {
      if (!files || files.length === 0) {
        return target.value.split('\\').pop()
      }
      if (files.length > 1) {
        return this.getMultipleName(files)
      }
      if (files.length === 1) {
        return files[0].name
      }
      return null
    },

    openPicker () {
      this.$refs.inputFile.click()
      this.$refs.input.focus()
    },

    onChange ($event) {
      this.onFileSelected($event)
    },

    onFileSelected ({ target, dataTransfer }) {
      const files = target.files || dataTransfer.files
      this.files = files || target.value
      this.model = {
        value: this.getFileName(files, target),
        files: this.files
      }
      this.$emit('change', this.files)
    }
  }
}
</script>

<style src="./rmh-file.styl" lang="stylus"></style>
