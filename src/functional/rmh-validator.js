import Vue from 'vue'

export default {
  name: 'rmh-validator',

  data: () => ({
    validator: null
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
    rmhv_add (component) {
      if (!this.$root.validator.bag.includes(component))
        this.$root.validator.bag.push(component)
      this.rmhv_count()
    },

    rmhv_remove (component) {
      this.$root.validator.bag = this.$root.validator.bag.filter(item => item._uid !== component._uid)
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

    rmhv_init () {
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$root.validator = this.validator
        this.$root.validators = this.$options.validators
        this.rmhv_init_recursive(this.$root)
      })
    },

    rmhv_init_recursive (component) {
      for (const child of component.$children) {
        if (child.$props && child.$props.validationTerm) {
          child.validationCallback = this.rmhv_trigger_validation
        }
        this.rmhv_init_recursive(child)
      }
    },

    rmhv_validation () {
      this.rmhv_clear()
      this.rmhv_validation_recursive(this.$root)
    },

    rmhv_validation_recursive (component) {
      for (const child of component.$children) {
        this.rmhv_trigger_validation(child)
        this.rmhv_validation_recursive(child)
      }
    },

    rmhv_trigger_validation (component) {
      if (this.$root.validators === null) return
      if (component.$props) {
        const term = component.$props.validationTerm
        if (term && term !== false) {
          const validation = this.$root.validators[term]
          if (validation) {
            const result = validation(component.value)
            if (result !== false) {
              component.errorMessage = result
              component.hasError = true
              this.rmhv_add(component)
            } else {
              component.errorMessage = ''
              component.hasError = false
              this.rmhv_remove(component)
            }
          }
        }
      }
    }
  }
}
