<template>
   <div v-if="isAuthenticated != true" class="row">
        <div class="col-lg-10 col-xl-7 mx-auto">            
            <div class="content_login">
                <h3 class="display-5">Iniciar Sesión </h3>
                <form @submit.prevent="processLogInUser">
                    <div class="form-group mb-3">
                        <input v-model="user.email" id="inputEmail" type="email" placeholder="Email" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4">
                    </div>
                    <div class="form-group mb-3">
                        <input v-model="user.password" id="inputPassword" type="password" placeholder="Contraseña" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-secondary">
                    </div>               
                    <div class="hr-container">
                        <hr class="custom-hr">
                        <span class="or-text">.</span>
                        <hr class="custom-hr">
                    </div>
                    <button type="submit" class="button">Iniciar Sesión</button>
                </form>
            </div>
            
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import { mapActions } from 'vuex'
  import Swal from 'sweetalert2'
  
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
        isAuthenticated: localStorage.getItem('isAuthenticated')
      }
    },
    methods: {
      ...mapActions(['loginAction']),
      processLogInUser() {
        axios
          .post(`${config.apiUrl}/api/auth/login/`, this.user, {
            headers: {},
          })
          .then((result) => {
            const dataSignUp = {
              email: this.user.email,
              access_token: result.data.access_token
            }
            this.completedLogIn(dataSignUp)
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Datos Incorrectos, por favor confirme e intente de nuevo',
                  showConfirmButton: false,
                  timer: 1500
              })
            }
          })
      },
  
      completedLogIn(data) {
        this.loginAction(data); // Llama a la acción para actualizar el estado de autenticación
        this.$router.replace({ path: '/loading' }); // Redirige a la página después de iniciar sesión
      },
    },
  }
  </script>

<style>
    .hover {        
        font-size: 14px;
    }
    .content_login {
        text-align: center;
        margin-top: 20px;
    }

    .content_login h3{
        margin-bottom: 20px;
    }
</style>