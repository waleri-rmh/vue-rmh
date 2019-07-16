<template src="./rmh-file.html" />

<script>
import {
  component,
  input
} from '@/mixins'

import {
  rmhField,
  rmhIcon
} from '@/components'

export default {
  name: 'rmh-file',

  components: {
    rmhField,
    rmhIcon
  },

  mixins: [
    component,
    input
  ],

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: String,
      default: 'attach_file'
    },
    bordered: {
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
    model: {},
    errorBlink: false
  }),

  computed: {
    classes () {
      return {
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required,
        'error-blink': this.errorBlink,
        'rmh-file-drop': this.drop,
        'rmh-file-drop-entered': this.dropEntered
      }
    }
  },

  watch: {
    model: {
      handler (value) {
        if (value !== this.localValue) {
          this.localValue = value
        }
      },
      deep: true
    },
    value: {
      handler (value) {
        if (value !== this.model) {
          this.model = value
        }
      },
      deep: true
    }
  },

  mounted () {
    this.model = {
      value: '',
      files: [],
      ...this.value
    }
    this.$refs.field.update(this.model.value)
    this.initDrop()
  },

  methods: {
    focus () {
      this.$refs.field.focus({
        value: this.model.value
      })
    },

    blur () {
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

    onChange (e) {
      this.handleFiles(e)
    },

    handleFiles ({ target, dataTransfer }) {
      const files = target.files || dataTransfer.files
      this.files = files || target.value
      if (this.acceptHandling()) {
        this.model = {
          value: this.getFileName(files, target),
          files: this.files
        }
      } else {
        this.errorBlink = true
        setTimeout(() => {
          this.errorBlink = false
        }, 200)
        this.model = {
          value: '',
          files: []
        }
      }
      this.$refs.field.update(this.model.value)
      this.$emit('input', this.model)
      this.$emit('change', this.files)
    },

    acceptHandling () {
      if (this.accept !== '') {
        for (let file of this.files) {
          const ext = '.' + file.name.split('.').pop()
          const meme = file.type
          const memeAllrounder = meme.split('/').shift() + '/*'
          const isValideExt = ext && ext !== '' && this.accept.indexOf(ext) > -1
          const isValideMeme = meme && meme !== '' && this.accept.indexOf(meme) > -1 || this.accept.indexOf(memeAllrounder) > -1
          if (!(isValideExt || isValideMeme)) return false
        }
      }
      return this.files.length > 0
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
