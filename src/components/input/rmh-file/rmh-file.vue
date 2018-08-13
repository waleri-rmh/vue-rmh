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
    placeholder: {
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
      type: [Boolean, String],
      default: false
    },
    validation: {
      type: String,
      default: ''
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

  mounted () {
    this.model = Object.assign({
      value: '',
      files: []
    }, this.value)
    this.$refs.field.inputMounted(this.model.value)
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
      this.$refs.field.inputUpdated(this.model.value)
      this.$emit('input', this.model)
      this.$emit('change', this.files)
    },

    acceptHandling () {
      for (let file of this.files) {
        const ext = '.' + file.name.split('.').pop()
        const meme = file.type
        const memeAllrounder = meme.split('/').shift() + '/*'
        const isValideExt = ext && ext !== '' && this.accept.indexOf(ext) > -1
        const isValideMeme = meme && meme !== '' && this.accept.indexOf(meme) > -1 || this.accept.indexOf(memeAllrounder) > -1
        if (!(isValideExt || isValideMeme)) return false
      }
      return this.files.length > 0 ? true : false
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
