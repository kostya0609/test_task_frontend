import { createRouter, createWebHistory } from 'vue-router'

import StartPage from '../page'
import UserData from '../page/user_data'
import ServerData from '../page/server_data'
import Login from '../components/login'
import Admin from "../page/admin";

const routes = [
  {
    path: '/test-task/',
    children : [
      {
        path      : 'start',
        name      : 'start_page',
        component : StartPage,
        meta      : {name : 'Стартовая страница', path : '/test-task/login', label : 'Регистрация'}
      },
      {
        path      : 'user_data',
        name      : 'user_data',
        component : UserData,
        meta      : {name : 'Данные о пользователях'}
      },
      {
        path      : 'server_data',
        name      : 'server_data',
        component : ServerData,
        meta      : {name : 'Данные с сервера'}
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin,
        meta : {name : 'Администрирование', onlyAdmin : true},
      },
      {
        path      : 'login',
        name      : 'login',
        component : Login,
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
