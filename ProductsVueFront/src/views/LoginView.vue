<template>
  <div class="content_login">
     <div class="row no-gutter">
         <!-- The image half -->
         <div class="col-md-6 col-py-12 d-none d-md-flex bg-image" ></div>
         <!-- The content half -->
         <div class="col-md-6 bg-light">
             <div class="login d-flex align-items-center py-5">
                 <!-- Demo content-->
                 <div class="container">
                  <div class="row">
                         <div class="col-lg-10 col-xl-7 mx-auto">
                            <div class="content_comps">
                              <button class="hover" @click="Login">Login</button>
                              <button class="hover" @click="Register">Registro</button>

                              <div>
                                <LoginComp v-if="mostrarComponente === 'LoginComp'" />
                                <RegisterComp v-else-if="mostrarComponente === 'RegisterComp'" />
                              </div>
                            </div>
                            
                         </div>
                     </div>
                     
                 </div><!-- End -->
             </div>
         </div><!-- End -->
     </div>
 </div>
 </template>

<script>
  import LoginComp from '@/components/LoginComp.vue';
  import RegisterComp from '@/components/RegisterComp.vue';

  export default {
    name: "HomeView",
    components: {
      LoginComp,
      RegisterComp,
    },
    data() {
      return {
        mostrarComponente: 'LoginComp',
      };
    },
    methods: {
      Login() {
        this.mostrarComponente = 'LoginComp';
      },
      Register() {
        this.mostrarComponente = 'RegisterComp';
      },
    },
  }
</script>

 <style>
  .login,
  .image {
    min-height: 100vh;
    min-width: 50vw;
  }
  .bg-image {
    background-image: url('../assets/restaurant.png');
    background-size: cover;
    background-position: center center;
  }

  .content_comps {
    text-align: center;
  }

  .content_login {
    margin: 0;
    padding: 0;
  }

  /* Estilo para el contenedor */
  .hr-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    }

    /* Estilo personalizado para la línea horizontal */
    .custom-hr {
    flex: 1;
    border: none;
    border-top: 1px solid #000;
    margin: 0 10px;
    }

    /* Estilo para el texto "ó" */
    .or-text {
    font-size: 18px;
    font-weight: bold;
    }
 </style>