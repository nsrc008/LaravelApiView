<template>
    <div class="row">
         <div class="col-lg-10 col-xl-7 mx-auto">            
             <div class="content_login">
                 <h3 class="display-5">Registrarse </h3>
                 <form @submit.prevent="processSignUp"> 
                    <div class="form-group mb-3">
                         <input v-model="user.name" id="inputName" type="text" placeholder="Nombre" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4">
                     </div>
                     <div class="form-group mb-3">
                         <input v-model="user.lastname" id="inputLastName" type="text" placeholder="Apellido" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4">
                     </div>
                     <div class="form-group mb-3">
                         <input v-model="user.email" id="inputEmail" type="email" placeholder="Email" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4">
                     </div>
                     <div class="form-group mb-3">
                         <input v-model="user.password" id="inputPassword" type="password" placeholder="Contraseña" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-secondary">
                     </div>
                     <div class="form-group mb-3">
                         <input v-model="user.password_confirmation" id="inputConfirmPassword" type="password" placeholder="Repetir Contraseña" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-secondary">
                     </div>
                     <div class="hr-container">
                         <hr class="custom-hr">
                         <span class="or-text">.</span>
                         <hr class="custom-hr">
                     </div>
                     <button type="submit" class="button">Registrarse</button>
                 </form>
             </div>
             
         </div>
     </div>
 </template>

<script>
    import axios from 'axios'
    import config from '@/config'
    import Swal from 'sweetalert2'
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                user: {
                    name: '',
                    lastname: '',
                    email: '',
                    password: '',   
                    password_confirmation: '',          
                },
            }
        },
        methods: {
            ...mapActions(['loginAction']),
            processSignUp() {
                axios
                .post(`${config.apiUrl}/api/auth/register/`, this.user, {
                    headers: {},
                })
                .then((result) => {
                    const dataSignIn = {
                        email: this.user.email,
                        access_token: result.data.access_token
                    }
                    this.completedSignUp(dataSignIn)                    
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                    const errorResponse = JSON.parse(error.response.data);
                    
                    if (errorResponse.email) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'El Email ya se encuentra registrado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                    if (errorResponse.password) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Las Contraseñas No Coinciden',
                            text: errorResponse.password[0],
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
                })
            },     
        
            completedSignUp(data) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro Exitoso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.loginAction(data); // Llama a la acción para actualizar el estado de autenticación
                    this.$router.replace({ path: '/loading' }); // Redirige a la página después de iniciar sesión
                });
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