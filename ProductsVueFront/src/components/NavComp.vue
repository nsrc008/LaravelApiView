<template>
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark content_nav">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 navigation">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span @click="showUserDashboardComponent" class="ms-1 d-none d-sm-inline">Ordenar</span></a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span @click="showUserOrdersComponent" class="ms-1 d-none d-sm-inline">Mis Ordenes</span></a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/hombre.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">{{email}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" @click="showUserProfileComponent">Mi Perfil</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" @click="logout">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="content_dashboard col py-12">
            <div class="column column-80" v-if="showUserDashBoard">
                <ListProductsCopm  @selectedItems="handleItemSelected"/>
            </div>
            <div class="column column-20" v-if="showUserDashBoard">
                <OrderComp :selectedItem="selectedItem"/>
            </div>    
            <div class="profile_user" v-if="showUserProfile">
                <UserComp />
            </div>   
            <div class="orders_user" v-if="showUserOrders">
                <OrdersComp />
            </div>        
        </div>
    </div>
</div>
</template>

<script>
    import OrderComp from '@/components/OrderComp.vue'
    import OrdersComp from '@/components/OrdersComp.vue'
    import ListProductsCopm from '@/components/ListProductsCopm.vue'
    import UserComp from '@/components/UserComp.vue'
    import { mapState } from 'vuex';
    import { mapActions } from 'vuex';
    import Swal from 'sweetalert2'

    export default {
        name: "NavComp",
        components: {
            OrderComp,
            OrdersComp,
            ListProductsCopm,
            UserComp
        },   
        computed: {
            ...mapState(['isAuthenticated']),
        },     
        data() {
           return {
                email:  localStorage.getItem('email'),
                isAuthenticated : localStorage.getItem('isAuthenticated'),
                selectedItem: null, 
                showUserProfile: false,
                showUserDashBoard: true,
                showUserOrders: false 
           } 
        } ,
        methods : {
            showUserOrdersComponent() {
                this.showUserOrders = true;
                this.showUserProfile = false;
                this.showUserDashBoard = false;
            },
            showUserProfileComponent() {
                this.showUserProfile = true;
                this.showUserDashBoard = false;
                this.showUserOrders = false;
            },
            showUserDashboardComponent() {
                this.showUserDashBoard = true;
                this.showUserProfile = false;
                this.showUserOrders = false;
            },
            handleItemSelected(item) {
                this.selectedItem = item; // Actualizar el elemento seleccionado
            },
            ...mapActions(['logoutAction']),
            logout() {        
               
                Swal.fire({
                title: '¿Estás seguro de Cerrar Sesión?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF6347',
                confirmButtonText: 'Sí, ¡hazlo!',
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.logoutAction(); 
                    this.$router.replace({ path: '/loading' }); 
                }
                })                            
            },
        }
    }
</script>

<style>
    .column {
        width: 100%;
    }
    .profile_user {
        width: 100%;
    }
    .orders_user {
        margin-left: 20%;
        margin-top: 5%;
        margin-right: 5%;
        width: 100%;
    }
    .content_nav {
        position: fixed;
        background-color: #7D7D7D;  
    }
    .navigation span{        
        color: #F9C80E  ; 
    }
    .dropdown-item {
        cursor: pointer;
    }
    .content_dashboard {
        display: flex;
        width: 100vw; /* 100% del viewport width */
        height: 100vh; /* 100% del viewport height */
    }

    .column {
    flex: 1; /* Distribuye el espacio disponible entre las columnas */
    padding: 20px;
    display: flex;
    flex-direction: column;
    }

    .column-80 {
    flex: 0 0 70%; /* Ocupa el 80% del ancho sin ajustar */
    }

    .column-20 {
    flex: 0 0 30%; /* Ocupa el 20% del ancho sin ajustar */
    }
</style>