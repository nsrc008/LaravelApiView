<template>
    <div class="grid-container">
      <div class="grid-item" v-for="item in items_products.listaProduct" :key="item.id">
        <ProductsComp @itemSelected="handleItemSelected" :image="item.image" :price="item.price" :product="item.product" :id="item.id"/>
      </div> 
  </div>
  </template>

<script>
  import ProductsComp from './ProductsComp.vue';
  import axios from 'axios'
  import config from '@/config'; 
  import { mapMutations, mapState } from 'vuex';
  import Swal from 'sweetalert2'

  export default {
    name : "Products",    
    computed: {
      ...mapState(['itemList']), // itemList debe coincidir con el nombre del estado en Vuex
    },
    components : {
      ProductsComp
    },
    data() {
      return {
        items_products: {
          listaProduct: []
        },
        columns : [], 
      };
    },
    created() {
      this.getData()
    },
    methods: {
      ...mapMutations(['addItem']),
      handleItemSelected(item) {
          axios
            .get(`${config.apiFood}/data/${item.id}`, {
              headers: {},
            })
            .then((result) => {
              if (!this.itemList.some(item => item.id === result.data.id)) {
                const res = result.data
                res.numero = 1;
                this.$store.commit('addItem', result.data);                
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'info',
                  title: 'Elemento ya añadido',
                  showConfirmButton: false,
                  timer: 700
              })
              }
              result.data = ''; // Limpiar el campo de entrada
            })
            .catch((error) => {
              console.log(error)
              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'No se a cargado el elemento, Favor Recargar la pagina',
                  showConfirmButton: false,
                  timer: 1500
              })
            })         
      },
      getData() {
        axios
          .get(`${config.apiFood}/data`, {
            headers: {},
          })
          .then((result) => {
            this.items_products.listaProduct = result.data
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No se han cargado elementos, Favor Recargar la pagina',
                showConfirmButton: false,
                timer: 1500
            })
          })
      },
    }
  }
</script>
  
  <style scoped>
  .grid-container {
    display: flex;
    flex-wrap: wrap;
    margin-left: 30%;
  }

  .grid-item {
    width: 25%; /* Para no más de 4 columnas */
    box-sizing: border-box;
    padding: 10px;
  }
  </style>