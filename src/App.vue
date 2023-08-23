<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import is_have from './utils/haveToken';

export default {
  name: 'App',

  data: () => ({
  }),
  created() {
    this.checkUser()
  },
  mounted() {
  },  
  beforeDestroy() {
  }, 
  methods: {
    async checkUser() {
      if (!is_have()) {
          this.$router.push('/login');
      }
    }
  },
  watch: {
  }
};
</script>
