export default {
  name: 'rmh-validator',

  data () {
    return {
      validator: null,
      errors: {}
    }
  },

  created () {
    this.validator = {
      errors: 0,
      hasErrors: false,
      bag: [],
      init: this.rmhvInit,
      run: this.rmhvValidation
    }
  },

  methods: {
    rmhvAdd (error) {
      this.errors[error.key].has = true
      this.errors[error.key].get = error.error
      if (!this.$root.validator.bag.includes(error)) {
        this.$root.validator.bag.push(error)
      }
      this.rmhvCount()
    },

    rmhvRemove (key) {
      this.errors[key].has = false
      this.errors[key].get = ''
      this.$root.validator.bag = this.$root.validator.bag.filter(item => item.key !== key)
      this.rmhvCount()
    },

    rmhvClear () {
      this.$root.validator.bag = []
      this.rmhvCount()
    },

    rmhvCount () {
      this.$root.validator.errors = this.$root.validator.bag.length
      this.$root.validator.hasErrors = this.$root.validator.errors > 0
    },

    rmhvHasError (key) {
      this.$root.validator.bag.map(item => {
        if (item.key === key) {
          return true
        }
      })
      return false
    },

    rmhvGetError (key) {
      return this.$root.validator.bag.filter(item => item.key === key)[0].error
    },

    rmhvInit () {
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$root.validator = this.validator
        this.$root.validators = this.$options.validators
        const keys = Object.keys(this.$root.validators)
        if (keys.length > 0) {
          this.rmhvSetWatcher(keys)
        }
      })
    },

    rmhvSetWatcher (keys) {
      keys.map(key => {
        this.errors[key] = { has: false }
        this.errors[key] = { get: '' }
        this.$watch(key, value => {
          this.rmhvValidate(key, value)
        })
      })
    },

    rmhvValidation () {
      if (!this.$root) return
      this.$forceUpdate()
      this.$nextTick(() => {
        const keys = Object.keys(this.$root.validators)
        if (keys.length > 0) {
          keys.map(key => {
            this.rmhvValidate(key, this[key])
          })
        }
      })
    },

    rmhvValidate (key, value) {
      this.$forceUpdate()
      const validation = this.$root.validators[key]
      if (validation) {
        const error = validation(value)
        if (error !== false) {
          this.rmhvAdd({
            key: key,
            value: value,
            error: error
          })
        } else {
          this.rmhvRemove(key)
        }
      }
    }
  }
}
