import Vue from 'vue'

export default {
  name: 'rmh-validator',

  data: () => ({
    validator: null,
    errors: {}
  }),

  created () {
    this.validator = {
      errors: 0,
      hasErrors: false,
      bag: [],
      init: this.rmhv_init,
      run: this.rmhv_validation
    }
  },

  methods: {
    rmhv_add (error) {
      this.errors[error.key].has = true
      this.errors[error.key].get = error.error
      if (!this.$root.validator.bag.includes(error))
        this.$root.validator.bag.push(error)
      this.rmhv_count()
    },

    rmhv_remove (key) {
      this.errors[key].has = false
      this.errors[key].get = ''
      this.$root.validator.bag = this.$root.validator.bag.filter(item => item.key !== key)
      this.rmhv_count()
    },

    rmhv_clear () {
      this.$root.validator.bag = []
      this.rmhv_count()
    },

    rmhv_count () {
      this.$root.validator.errors = this.$root.validator.bag.length
      this.$root.validator.hasErrors = this.$root.validator.errors > 0
    },

    rmhv_has_error (key) {
      this.$root.validator.bag.map((item) => {
        if (item.key === key) {
          return true
        }
      })
      return false
    },

    rmhv_get_error (key) {
      return this.$root.validator.bag.filter(item => item.key === key)[0].error
    },

    rmhv_init () {
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$root.validator = this.validator
        this.$root.validators = this.$options.validators
        const keys = Object.keys(this.$root.validators)
        if (keys.length > 0) {
          this.rmhv_set_watcher(keys)
        }
      })
    },

    rmhv_set_watcher (keys) {
      keys.map((key) => {
        this.errors[key] = { has: false }
        this.errors[key] = { get: '' }
        this.$watch(key, (value) => {
          this.rmhv_validate(key, value)
        });
      })
    },

    rmhv_validation () {
      if (!this.$root) return
      this.$forceUpdate()
      this.$nextTick(() => {
        const keys = Object.keys(this.$root.validators)
        if (keys.length > 0) {
          keys.map((key) => {
            this.rmhv_validate(key, this[key])
          })
        }
      })
    },

    rmhv_validate (key, value) {
      this.$forceUpdate()
      const validation = this.$root.validators[key]
      if (validation) {
        const error = validation(value)
        if (error !== false) {
          this.rmhv_add({
            key: key,
            value: value,
            error: error
          })
        } else {
          this.rmhv_remove(key)
        }
      }
    }
  }
}
