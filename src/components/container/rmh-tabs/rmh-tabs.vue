<template src="./rmh-tabs.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-tabs',

  mixins: [component],

  data: () => ({
    tabs: [],
    selectedTab: null,
    selectedTabIndex: -1
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {}
    }
  },

  mounted () {
    this.fetchTabs()
    this.setTabEvents()
  },

  watch: {
    selectedTabIndex () {
      this.changedSelectedTab()
    }
  },

  methods: {
    tabActivated (tab) {
      this.selectedTab = tab
      this.setSelectedTabIndex(tab)
    },

    tabDeactivated () {
      this.fetchTabs()
      this.setTabEvents()
    },

    setSelectedTabIndex (tab) {
      for (let _tab in this.tabs) {
        if (this.tabs[_tab] === tab) {
          this.selectedTabIndex = parseInt(_tab)
        } else {
          this.tabs[_tab].deactivate()
        }
      }
    },

    fetchTabs () {
      this.tabs = this.$children.filter(child => {
        return child.$options._componentTag === 'rmh-tab'
      })
    },

    checkPropActivated () {
      let activeTabExists = false
      for (let tab in this.tabs) {
        if (tab.isActive) {
          activeTabExists = true
        }
      }
      if (!activeTabExists && this.tabs.length > 0) {
        this.tabs[0].activate()
      }
    },

    setTabEvents () {
      for (let tab of this.tabs) {
        tab.$on('tabActivated', this.tabActivated)
      }
      this.checkPropActivated()
    },

    changedSelectedTab () {
      this.$emit('change', {
        tab: this.selectedTab,
        target: this.selectedTab.$el,
        index: this.selectedTabIndex
      })
      this.moveTabContent()
    },

    moveTabContent () {
      for (let tab of this.tabs) {
        tab.$el.querySelector('.rmh-tab-content').style.display = 'block'
      }
      const tabContent = this.selectedTab.$el.querySelector('.rmh-tab-content')
      if (this.$refs.body && tabContent) {
        this.$refs.body.innerHTML = tabContent.innerHTML
      }
      for (let tab of this.tabs) {
        tab.$el.querySelector('.rmh-tab-content').style.display = 'none'
      }
    }
  }
}
</script>

<style src="./rmh-tabs.styl" lang="stylus"></style>
