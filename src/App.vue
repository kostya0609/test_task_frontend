<template>
  <div
      class="app_container"
  >
    <div>
      <navBar/>
      <router-view/>
    </div>
  </div>

</template>

<script>
import navBar from "./components/navBar";
import {ref, provide} from "vue";
import  {ElNotification}  from 'element-plus'
import { useRouter, useRoute} from 'vue-router'

export default {
  name: 'App',
  components: {navBar},
  setup() {
    const router      = useRouter()
    const route       = useRoute()
    const svg     = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    const domain  = ref( process.env.NODE_ENV == 'production' ? window.location.origin + '/api' : 'http://localhost:8000');
    const notify  = (title, message, type) => {
      ElNotification({
        title: title,
        message: message,
        type: type,
        duration: 2000,
      })
    };

    function loadJson(url , data, type, downloadRequest){
      let body, header = {};

      if(type === 'file'){
        body = data;
      }else{
        body = {...data};
        header['Content-Type'] = 'application/json;charset=utf-8';
      }

      return fetch(
          domain.value + url,
          {
            method: 'post',
            headers: header,
            body: type === 'file' ? body : JSON.stringify(body, function(key, val) {
              return (typeof val === 'function') ? ''+ val : val;
            })
          }
      ).then(res => {
        return new Promise((resolve,reject) => {
          if(!res.ok)
            throw new Error('Response server - status code ' + res.status);
          else{

            if (downloadRequest) {
              resolve(res)
            } else {
              res.json().then(json => {
                resolve(json)
              }).catch(err => {
                reject(err);
              })
            }

          }
        })
      }).catch(err => {
        return new Promise((resolve,reject) => {
          reject({status : 'error',message : 'Некорректный ответ сервера',system : err.message})
        })
      });
    };

    router.push({name : 'start_page'});

    provide('domain', domain);
    provide('loadJson', loadJson);
    provide('svg', svg);
    provide('notify', notify);

    return{route}
  }
}

</script>

<style>
/* ниже стили общие на все приложение*/
#workarea {
  overflow-x: hidden!important;
}
#workarea-content {
  overflow: unset !important;
}
.workarea-content-paddings{
  overflow-x: unset !important;
}
.app_container{
  padding: 15px;
}
#app ::selection {
  background: #cfcfcf;
}

/* ниже стили для отдельного компонента  - Меню navBar */
.el-menu--horizontal{
  display: block !important;
}
.menu-right-element{
  float: right !important;
  padding-top: 10px!important;
}
.menu-right-element-button{
  background: #3bc8f5 !important;
  border-color: #3bc8f5 !important;
  color : white !important;
  text-transform: uppercase;
}
.menu-right-element-button:hover{
  background: #3fddff !important;
}
.el-menu--horizontal .el-menu-item:focus{
  background-color: #ffffff!important;
}
.el-menu--horizontal .el-menu-item:hover:last-child{
  background-color: #ffffff!important;
}
.el-menu--horizontal>.el-menu-item.is-active
{
  background-color: #ecf5ff!important;
}

/*Общий класс - если не все поля на форме заполнены*/
small {
  color: #ff2400;
}
.invalid {
  border:solid 1px !important;
  border-color: #ff2400 !important;
}

/*чтоб в таблицах переносились слова*/
table.el-table__body td .cell {
  word-break: break-word;
}

/*Стили формы Login*/
.add-label{
  font-weight: 700;
}
.add-element{
  margin-top: 5px;
  width: 100% !important;
}
.el-col-padding-right-15{
  padding-right: 15px;
}
.add-button{
  width : 100%;
  background: #3bc8f5 !important;
  border-color: #3bc8f5 !important;
  color : white !important;
  text-transform: uppercase;
}
.add-button:hover{
  background: #3fddff !important;
}





</style>
