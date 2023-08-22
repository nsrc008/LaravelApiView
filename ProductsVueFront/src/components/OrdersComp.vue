<template>
    <div>
      <table id="customers" class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import "jquery"; // Importa jQuery
  import "datatables.net"; // Importa datatables.net
  import "datatables.net-bs4"; // Importa datatables.net-bs4
  import jwtdecode from 'jwt-decode'
  import axios from 'axios'
  import config from '@/config'
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        orders: [] 
      };
    },
    created() {
      this.getOrders()
    },
    methods: {
      getOrders() {
        const token = localStorage.getItem('access_token')
        const decodedToken = jwtdecode(token);
        const userId = decodedToken.sub.toString();
        axios
          .get(`${config.apiUrl}/api/order/user/${userId}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.orders = response.data;
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Datos No Cargados',
                showConfirmButton: false,
                timer: 1500
            })
          })
      },
    }
  };
  </script>

<style>
  #customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #28A745;
  color: white;
}
</style>