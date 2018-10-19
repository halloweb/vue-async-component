<template>
    <div>
        <button @click = "click">report</button>
    </div>
</template>
<script>
export default {
  name: 'report',
  methods: {
    click () {
      this.$router.push({path: '/page/myClaim'})
    }
  }
}
</script>
