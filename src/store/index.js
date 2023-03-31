import { createStore } from 'vuex'

export default createStore({
  state: {
    user            : {
      name    : 'Гость',
    },
    logged          : false,
    roles           : [],
    registeredUsers : [],
  },
  getters: {
    user            : s => s.user,
    roles           : s => role => { return s.roles.indexOf(role) >= 0 ? true : false },
    logged          : s => s.logged,
    registeredUsers : s => s.registeredUsers,

  },
  mutations: {
    setUser(s,v){
      s.user = v;
    },
    setRoles(s,v){
      s.roles = v;
    },
    setLogged(s,v){
      s.logged = v;
    },
    setRegisteredUsers(s,v){
      s.registeredUsers.push(v);
    },
    deleteUsers(s,v){
      if (v.all)  s.registeredUsers.length = 0;
        else s.registeredUsers.splice(v.idx, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
