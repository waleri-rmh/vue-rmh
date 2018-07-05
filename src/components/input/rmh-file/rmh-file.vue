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
    },
    drop: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    dropEntered: false,
    files: [],
    model: {}
  }),

  mounted () {
    this.model = Object.assign({
      value: '',
      files: []
    }, this.value)
    this.fakeMount()
    this.initDrop()
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
        'required': this.required,
        'rmh-file-drop': this.drop,
        'rmh-file-drop-entered': this.dropEntered
      }
    }
  },

  watch: {
    model: {
      handler (value) {
        this.localValue = value
      },
      deep: true
    },
    value: {
      handler (value) {
        this.model = value
        this.fakeMount()
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

    fakeMount () {
      this.$refs.field.inputMounted(this.model.value)
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

    onChange (e) {
      this.handleFiles(e)
    },

    handleFiles ({ target, dataTransfer }) {
      const files = target.files || dataTransfer.files
      this.files = files || target.value
      this.model = {
        value: this.getFileName(files, target),
        files: this.files
      }
      this.fakeMount()
      this.$emit('input', this.model)
      this.$emit('change', this.files)
    },

    initDrop () {
      if (this.drop) {
        this.$refs.field.$el.addEventListener('dragenter', this.dropEnter, false)
        this.$refs.field.$el.addEventListener('dragover', this.dropEnter, false)
        this.$refs.field.$el.addEventListener('dragleave', this.dropLeave, false)
        this.$refs.field.$el.addEventListener('drop', this.dropHandle, false)
      }
    },

    dropEnter (e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropEntered = true
    },

    dropLeave (e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropEntered = false
    },

    dropHandle (e) {
      e.preventDefault()
      e.stopPropagation()
      this.dropLeave(e)
      this.handleFiles(e)
    }
  }
}
</script>

<style src="./rmh-file.styl" lang="stylus"></style>
