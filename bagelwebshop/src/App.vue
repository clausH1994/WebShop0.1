<template>
  <v-app id="app">
      <Nav/>


    <v-content>
          <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
    import Nav from './components/Nav';

  export default {
      components:{
          Nav
      },
    name:'App',
    props: {
      source: String,
    },
    data: () => ({

    }),
  }
</script>

<style lang="scss">
    main{
        background-color: map_get($colorz, white);
    }
</style>