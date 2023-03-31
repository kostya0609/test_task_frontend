<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router=true
        style="min-height: 59px"
    >
      <el-menu-item v-for="(item, key) in menu" :index="item.path" :key="key">{{item.name}}</el-menu-item>
      <el-menu-item
          v-if="route.meta.path && !logged"
          class="menu-right-element"
          :index="route.meta.path"
      >
        <el-button class="menu-right-element-button">
          {{route.meta.label}}
        </el-button>
      </el-menu-item>
      <el-menu-item
          v-if="logged"
          class="menu-right-element"
          index="start"
      >
        <label style="padding-right: 10px">
          {{userName}}
        </label>
        <el-button
            class="menu-right-element-button"
            @click="logOut"
        >
          Выйти
        </el-button>

      </el-menu-item>
    </el-menu>
  </div>

</template>

<script>

import {ref, reactive, inject, watchEffect, computed, watch} from "vue";
import {useRoute, useRouter} from 'vue-router'
import { useStore } from 'vuex';

export default {
  name: "navBar_component",
  setup(){
    const route       = useRoute()
    const router      = useRouter()
    const store       = useStore();

    const logged      = computed(() => { return store.getters.logged});
    const userName    = computed(() => { return store.getters.user.name});
    const isAdmin     = computed(() => { return store.getters.roles('admin')});

    const menu        = reactive([]);
    const activeIndex = ref(null);
    function showNavBar(){
      menu.length = 0;
      router.getRoutes().forEach(el => {
        if (el.meta.name)
          if(!el.meta.onlyAdmin) {
            logged.value ? menu.push({path: el.path, name: el.meta.name}) : '';
          } else {
            isAdmin.value ? menu.push({path : el.path, name : el.meta.name}) : '';
          }
      })
    };

    function logOut(){
      store.commit('setLogged', false)
      store.commit('setUser', {name : 'Гость'})
      store.commit('setRoles', [])
    };

    watchEffect(() => {
      activeIndex.value = route.path
    })

    watch( [
      () => logged.value,
    ], (newValues, oldValues) => {
      if (oldValues[0] !== newValues[0]) showNavBar();
    });


    return{
      activeIndex, menu, route, logged, userName, isAdmin,
      logOut
    }
  },
}
</script>

<style scoped>

</style>