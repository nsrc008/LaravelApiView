<template>
    <div class="master-container">
        <div class="carg_order cart">
            <label class="title">Tu Carrito</label>
            <div class="products">
                <div v-for="(item, index) in itemList" :key="index" class="product">
                    <img class="image_order" :src="item.image">
                    <div class="content_product_count">
                        <div>
                            <span> {{item.product }}</span>
                        </div>
                        <div class="quantity">
                            <button @click="decrementar(item)">
                                <svg fill="none" viewBox="0 0 24 24" height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                                </svg>
                            </button>
                            <label :v-model="dataOrder.details.quantity" :id="'label-' + item.id">{{ item.numero }}</label>
                            <button @click="incrementar(item)">
                                <svg fill="none" viewBox="0 0 24 24" height="10" width="10" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <label :v-model="dataOrder.total" class="price small">{{ calculateTotalProduct(item) + ' $'}}</label>                         
                    <button @click="removeItem(item.id)" class="btn">
                        <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                        </svg>
                    </button>               
                </div>
            </div>            
        </div>

        <div class="carg_order checkout">
            <label class="title">Pide Ahora</label>
            <div class="details">
            <span>Subtotal Carrito:</span>
            <span>{{ calcularTotal() }} $</span>
            <span>Gastos De Envio:</span>
            <span>4.99 $</span>
            </div>
            <div class="checkout--footer">
            <label class="price"><sup>$</sup>{{ calcularTotal()}} </label>
            <button  @click="UploadOrder()" class="checkout-btn">Pide Ahora</button>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapState, mapMutations  } from 'vuex';
    import jwtdecode from 'jwt-decode'
    import axios from 'axios'
    import config from '@/config'
    import Swal from 'sweetalert2'

    export default {
        computed: {
            ...mapState(['itemList']), 
        },
        data(){
            return {
                numero: 1,
                dataOrder : {
                    user_id: '',
                    total: 0,
                    details: []
                },
                selectedItems: []
            }
        }, 
        created () {
            this.LoadData()
        },
        methods: {
            LoadData () {
                const token = localStorage.getItem('access_token')
                const decodedToken = jwtdecode(token);
                const userId = decodedToken.sub.toString();
                this.dataOrder.user_id = userId
            },
            calculateTotalProduct(item) {
                return item.numero * item.price;
            },
            addAllToSelectedItems() {
                // Agregar todos los elementos de itemList a selectedItems
                this.selectedItems = [...this.itemList];
            },
            UploadOrder() {  
                this.addAllToSelectedItems()
                this.selectedItems.forEach(item => {
                    const quantity = item.numero;
                    const idProduct = item.id;

                    const existingDetail = this.dataOrder.details.find(detail => detail.id_product === idProduct);
                    
                    if (existingDetail) {
                        existingDetail.quantity += quantity;
                    } else {
                        this.dataOrder.details.push({
                            id_product: idProduct,
                            quantity: quantity
                        });
                    }                    
                    this.dataOrder.total += parseInt(this.calcularTotal());
                });    
                
                Swal.fire({
                    title: 'Esta seguro de Realizar la Orden',
                    text: 'Esta acción no se puede deshacer',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#28A745',
                    confirmButtonText: 'Sí, ¡hazlo!',
                    cancelButtonText: 'Cancelar',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios
                        .post(`${config.apiUrl}/api/order/register_order/`, this.dataOrder, {
                            headers: {},
                        })
                        .then((result) => {
                            console.log(result.data)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Orden Registrada Correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                window.location.reload();
                            });                            
                        })
                        .catch(() => {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Error al registrar orden, asegurece de agregar productos',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        
                        })                        
                    }
                })                 
            },   

            ...mapMutations(['removeItem']),
            removeItem(itemId) {
                this.$store.commit('removeItem', itemId);    
            },
            incrementar(item) {
                if (!item.numero) {
                    item.numero = 1;
                } else {
                    item.numero++;
                }
            },
            decrementar(item) {
                if (item.numero && item.numero > 1) {
                    item.numero--;
                    this.actualizarLabel(item);
                }                             
            },
            actualizarLabel(item) {
                const label = document.getElementById('label-' + item.id);
                if (label) {
                    label.textContent = item.numero || 1;
                }
            },
            calcularTotal() {
                return this.itemList.reduce((total, item) => total + (item.numero * item.price), 0) + 4.99;
            }
        }
    }
</script>

<style>
    .image_order {
        width: 50px;
        height: 50px;
    }
    .content_product_count {
        width: 100px;
        margin: 0 auto;
    }
    .master-container {
    display: grid;
    grid-template-columns: auto;
    gap: 5px;
    height: 100vh;
    position: fixed;
    }

    .carg_order {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    }

    .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: 11px;
    color: #63656b;
    }

    /* cart */
    .cart {
    border-radius: 19px 19px 7px 7px;
    height: 75vh;
    }

    .cart .products {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 70vh; /* Altura fija del contenedor, ajusta según tus necesidades */
    overflow: auto; /* Activa la barra de desplazamiento cuando el contenido excede la altura */
    }

    .cart .products .product {
    display: grid;
    grid-template-columns: 60px 1fr 80px 1fr;
    gap: 10px;
    margin-bottom: 20px;
    }

    .cart .products .product span {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin-bottom: 8px;
    display: block;
    }

    .cart .products .product p {
    font-size: 11px;
    font-weight: 600;
    color: #7a7c81;
    }

    .cart .quantity {
    height: 30px;
    display: grid;
    color: #242424;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    filter: drop-shadow(0px 1px 0px #efefef)
        drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    }

    .cart .quantity label {
    width: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #47484b;
    }

    .cart .quantity button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-bottom: 2px;
    }

    .carg_order .small {
    padding-top: 25px;
    font-size: 15px;
    margin: 0 0 auto auto;
    }

    .carg_order .small sup {
    font-size: px;
    }

    .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e5e5e5;
    filter: drop-shadow(0px 1px 0px #efefef)
        drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    }

    .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
    }

    /* Checkout */
    .checkout {
    border-radius: 9px 9px 19px 19px;
    height: 20vh;
    }

    .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    gap: 5px;
    }

    .checkout .details span {
    font-size: 13px;
    font-weight: 600;
    }

    .checkout .details span:nth-child(odd) {
    font-size: 11px;
    font-weight: 700;
    color: #707175;
    margin: auto auto auto 0;
    }

    .checkout .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin: auto 0 auto auto;
    }

    .checkout .checkout--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #efeff3;
    }

    .price {
    position: relative;
    font-size: 22px;
    color: #2B2B2F;
    font-weight: 900;
    }

    .price sup {
    font-size: 13px;
    }

    .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5F5D6B;
    bottom: 5px;
    display: inline-block;
    }

    .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: linear-gradient(180deg, #28A745  0%, #28A745  50%, #28A745  100%);
    box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    }

    /*BTN DELETE */
    .btn {
    background-color: transparent;
    position: relative;
    border: none;
    }

    .btn::after {
    content: 'delete';
    position: absolute;
    top: -130%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    height: fit-content;
    background-color: rgb(168, 7, 7);
    padding: 4px 8px;
    border-radius: 5px;
    transition: .2s linear;
    transition-delay: .2s;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    }

    .icon {
    transform: scale(1.2);
    transition: .2s linear;
    }

    .btn:hover > .icon {
    transform: scale(1.5);
    }

    .btn:hover > .icon path {
    fill: rgb(168, 7, 7);
    }

    .btn:hover::after {
    visibility: visible;
    opacity: 1;
    top: -30%;
    }

</style>