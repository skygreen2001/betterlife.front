<!-- notice lang="stylus" -->
<style lang="stylus">
span.hi
  color $blue-1
  background-color $deep-orange
</style>

<template>
  <q-page class="flex flex-center">
    <div>
      <span class="hi">hello,</span>
      <q-toggle v-model="drawerState">This is good</q-toggle>
      <p class="text-primary">
        skygreen <span class="bg-positive text-white"> is better man!</span>
      </p>
      <transition-group
        appear
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
      >
        <!-- We wrap a "p" tag and a QBtn -->
        <p key="text">Lorum Ipsum</p>
        <q-btn key="email-button" color="secondary" icon="mail" label="Email" />
      </transition-group>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    drawerState: {
      get() {
        return this.$store.state.showcase.drawerState;
      },
      set(val) {
        this.$store.commit("showcase/updateDrawerState", val);
      }
    }
  }
};
</script>
