<template>
  <div class="app-layout">
    <div class="main-content">
      <Navbar class="app-nav"/>
      <!-- Value from Views and Components go here -->
      <div class="app-view">
        <router-view/>
      </div>
    </div>
  </div>
</template>
  
  <style lang="scss">
  .app-nav{
    position: fixed;
    top: 0px;
    left: 15%;
    right: 15%;
    background-color: white;
    z-index: 2;
  }

  .app-view{
		margin-top: 9.5rem;
  }

  .left-side-bar{
    position: fixed;
    // top: 50px;
    top: 70px;
    left: 1.5%;
    padding-right: 1%;
    border-right: 1px solid rgb(30, 30, 39);
    // height: 100vh;
    height: 88vh;
  }

  .right-side-bar{
    position: fixed;
    top: 50px;
    right: 0%;
    width: 150px;
    margin-right: 15px;
    padding-left: 15px;
    border-left: 1px solid rgb(30, 30, 39);
    height: 100vh;
  }

  .main-content{
    margin-inline: 15%;
  }

  #searchBar{
    width: 300px;
  }

  @media(max-width: 1100px){
    .app-nav{
      left: 17%;
      right: 17%;
    }
  
    .main-content{
      margin-inline: 17%;
    }
  }

  @media(max-width: 960px){

  }

  @media(max-width: 860px){
    .app-nav{
      left: 19%;
      right: 19%;
    }

    .main-content{
      margin-inline: 19%;
    }
  }

  @media(max-width: 760px){
    .main-content{
      margin-inline: 1%;
    }

    .left-side-bar{
      display: none;
    }

    .app-nav{
      left: 1%;
      right: 1%;
    }
  }
  </style>
  
  <script>
    import { defineComponent } from 'vue';
    import Navbar from './Navbar.vue';
  
    export default defineComponent({
      name: 'AppLayout',
      components: {
        Navbar,
      }
    });
  </script>

