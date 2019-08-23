<template src="./rmh-picker-overlay.html" />

<script>
import moment from 'moment'

import {
  component
} from '@/mixins'

import {
  rmhButton,
  rmhIcon
} from '@/components'

export default {
  name: 'rmh-picker-overlay',

  components: {
    rmhButton,
    rmhIcon
  },

  mixins: [
    component
  ],

  props: {
    locale: {
      type: String,
      default: 'en'
    },
    selected: {
      type: Object,
      default: null
    },
    preview: {
      type: Object,
      default: null
    },
    current: {
      type: Object,
      default: null
    },
    setSelected: {
      type: Function,
      default: () => null
    },
    setPreview: {
      type: Function,
      default: () => null
    },
    applyPreview: {
      type: Function,
      default: () => null
    }
  },

  data: () => ({
    emptyDays: 0,
    daysInMonth: 0,
    lastDaysPrevMonth: [],
    firstDaysNextMonth: [],
    view: 'days'
  }),

  watch: {
    preview: {
      handler () {
        this.setEmptyDays()
        this.setDaysInMonth()
      },
      deep: true
    }
  },

  mounted () {
    if (this.preview) {
      this.setEmptyDays()
      this.setDaysInMonth()
    }
  },

  computed: {
    months () {
      return moment().locale(this.locale)._locale._months
    },

    years () {
      const years = []
      let startYear = parseInt(this.preview.year) - 100
      const endYear = startYear + 200
      while (startYear <= endYear) {
        startYear++
        years.push(startYear)
      }
      return years
    }
  },

  methods: {
    selectDay (day) {
      const result = this.preview.date.moment.date(day)
      this.setPreview(result)
      this.applyPreview()
      this.$emit('updated')
    },

    selectMonth (month) {
      const result = this.preview.date.moment.month(month)
      this.setPreview(result)
      this.applyPreview()
      this.$emit('updated')
      this.switchView('days')
    },

    selectYear (year) {
      const result = this.preview.date.moment.year(year)
      this.setPreview(result)
      this.applyPreview()
      this.$emit('updated')
      this.switchView('months')
    },

    switchView (view) {
      this.view = view
      setTimeout(() => {
        // scroll into preview year item
        const [yearItem] = this.$refs[`year-item-${this.preview.year}`]
        if (yearItem) {
          const yearContainer = this.$refs.years
          yearContainer.scrollTop = 0
          this.$forceUpdate()
          this.$nextTick(() => {
            yearContainer.scrollTop = yearItem.offsetTop - yearContainer.offsetTop - (yearContainer.offsetHeight / 2) + (yearItem.offsetHeight / 2)
          })
        }
      }, 100)
    },

    doNothing () {
      this.$emit('updated')
    },

    setEmptyDays () {
      const firstDay = moment(this.preview.date.moment).startOf('month').day()
      this.emptyDays = firstDay === 0 ? 6 : firstDay - 1
      this.getLastDaysInPrevMonth()
      this.getFirstDaysInNextMonth()
    },

    getLastDaysInPrevMonth () {
      this.lastDaysPrevMonth = []
      const lastMonth = moment(this.preview.date.moment).add('month', -1)
      const daysInLastMonth = lastMonth.daysInMonth()
      let i = 1
      while (i <= this.emptyDays) {
        this.lastDaysPrevMonth.push(daysInLastMonth - this.emptyDays + i)
        i += 1
      }
    },

    getFirstDaysInNextMonth () {
      this.firstDaysNextMonth = []
      const daysInMonth = this.preview.date.moment.daysInMonth()
      let maxDays = this.lastDaysPrevMonth.length + daysInMonth
      while (!Number.isInteger(maxDays / 7)) {
        maxDays = maxDays + 1
      }
      let i = 0
      while (i < (maxDays - (this.lastDaysPrevMonth.length + daysInMonth))) {
        i += 1
        this.firstDaysNextMonth.push(i)
      }
    },

    setDaysInMonth () {
      this.daysInMonth = this.preview.date.moment.daysInMonth()
    },

    prevMonth () {
      const result = moment(this.preview.date.moment).add('month', -1)
      this.setPreview(result)
      this.$emit('updated')
    },

    nextMonth () {
      const result = moment(this.preview.date.moment).add('month', 1)
      this.setPreview(result)
      this.$emit('updated')
    },

    getDayClasses (day, add = 0) {
      const weekendDateMoment = this.preview.date.moment.clone().add('month', add).date(day)
      const weekendDate = weekendDateMoment.day()
      return {
        weekend: weekendDate === 0 || weekendDate === 6,
        selected: this.selected.date.moment.clone().format('DD.MM.YYY') === weekendDateMoment.clone().format('DD.MM.YYY'),
        today: this.selected.date.moment.clone().format('DD.MM.YYY') === weekendDateMoment.clone().format('DD.MM.YYY')
      }
    },

    getMonthClasses (month) {
      return {
        selected: this.preview.month.name === month
      }
    },

    getYearClasses (year) {
      return {
        selected: this.preview.year === year
      }
    },

    yearScrolling () {
      const yearContainer = this.$refs.years
      yearContainer.childNodes.forEach(item => {
        const itemOffsetY = item.offsetTop - yearContainer.offsetTop - (yearContainer.offsetHeight / 2) + (item.offsetHeight / 2)
        if (yearContainer.scrollTop >= itemOffsetY) {
          item.style.fontSize = (40 - (50 * (yearContainer.scrollTop - itemOffsetY) / yearContainer.offsetHeight)) + 'px'
        } else {
          item.style.fontSize = (40 - (50 * (itemOffsetY - yearContainer.scrollTop) / yearContainer.offsetHeight)) + 'px'
        }
      })
    },
  }
}
</script>
