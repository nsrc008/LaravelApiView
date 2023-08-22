<template>
    <div>
      <title-bar :title-stack="titleStack" />
      <hero-bar>
        Formulario
        <nuxt-link slot="right" to="dashboard" class="button">
          Tablero de Control
        </nuxt-link>
      </hero-bar>
      <div v-if="isActive === 'false'">
        <br />
        <v-alert text outlined color="deep-orange" icon="mdi-shield-lock-outline">
          Atencion!! Tenga en cuenta que no podra realizar Tramites hasta que su
          perfil no este completamente diligenciado
        </v-alert>
      </div>
      <section v-else class="section is-main-section">
        <card-component title="Solicitar Tramite" icon="ballot">
          <form @submit.prevent="Create">
            <b-field label="Datos" horizontal>
              <b-field>
                <b-input
                  ref="nombre_completo"
                  v-model="form.nombre_completo"
                  icon="account"
                  placeholder="Nombre"
                  name="name"
                  required
                />
              </b-field>
              <b-field>
                <b-input
                  ref="email"
                  v-model="form.email"
                  icon="email"
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  required
                />
              </b-field>
            </b-field>
            <b-field message="Información Registrada" horizontal>
              <b-field>
                <p class="control">
                  <a class="button is-static"> +57 </a>
                </p>
                <b-input
                  ref="movil"
                  v-model="form.movil"
                  type="tel"
                  placeholder="Movil"
                  name="phone"
                  expanded
                />
              </b-field>
            </b-field>
            <b-field align="right">
              <a
                href="https://www.duitama-boyaca.gov.co/tema/tramites-y-servicios"
                >Consulte Aqui Nuestros Tramites!!</a
              >
            </b-field>
            <b-field label="Tipo De Petición" horizontal>
              <b-select
                ref="tipo_peticion"
                v-model="solicitud.tipo_peticion"
                placeholder="Seleccione el Tipo de Petición"
                required
              >
                <option
                  v-for="(tp, index) in tipo_peticion"
                  :key="index"
                  :value="tp.tipo_peticion"
                >
                  {{ tp.tipo_peticion }}
                </option>
              </b-select>
            </b-field>
            <hr />
            <b-field label="Asunto" message="Escriba el Asunto" horizontal>
              <b-input v-model="solicitud.asunto" placeholder="Asunto" required />
              <b-field horizontal>
                <file-picker
                  id="file"
                  ref="file"
                  v-model="solicitud.file"
                  type="file"
                  name="file"
                  required
                  @change="onFileUpload"
                />
              </b-field>
            </b-field>
            <b-field
              label="Mensaje"
              message="Mensaje maximo de 255 caracteres"
              horizontal
            >
              <b-input
                v-model="solicitud.mensaje"
                :rules="[
                  () =>
                    (!!address && address.length <= 256) ||
                    'Maximo 256 caracteres',
                  addressCheck,
                ]"
                counter="265"
                type="textarea"
                placeholder="Contenido del mensaje"
                maxlength="255"
                required
              />
            </b-field>
            <!--<b-field label="¿Desea la respuesta por Email?" horizontal>
              <b-switch v-model="customElementsForm.switch"> Si </b-switch>
            </b-field>-->
            <hr />
            <b-field horizontal>
              <b-field grouped>
                <div class="control">
                  <b-button native-type="submit" type="is-primary">
                    Enviar Solicitud
                  </b-button>
                </div>
                <!--<div class="control">
                  <b-button type="is-primary is-outlined" @click="reset">
                    Reset
                  </b-button>
                </div>-->
              </b-field>
            </b-field>
          </form>
        </card-component>
        <!--<card-component title="Custom elements" icon="ballot-outline">
          <b-field label="Checkbox" class="has-check" horizontal>
            <checkbox-picker
              v-model="customElementsForm.checkbox"
              :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
              type="is-primary"
            />
          </b-field>
          <hr />
          <b-field label="Radio" class="has-check" horizontal>
            <radio-picker
              v-model="customElementsForm.radio"
              :options="{ one: 'One', two: 'Two' }"
            />
          </b-field>
          <hr />
          <b-field label="Switch" horizontal>
            <b-switch v-model="customElementsForm.switch"> Default </b-switch>
          </b-field>
          <hr />
          <b-field label="File" horizontal>
            <file-picker v-model="customElementsForm.file" />
          </b-field>
        </card-component>-->
      </section>
    </div>
  </template>
  
  <script>
  import mapValues from 'lodash/mapValues'
  import TitleBar from '@/components/TitleBar'
  import CardComponent from '@/components/CardComponent'
  // import CheckboxPicker from '@/components/CheckboxPicker'
  // import RadioPicker from '@/components/RadioPicker'
  import FilePicker from '@/components/FilePicker'
  import HeroBar from '@/components/HeroBar'
  import localStorage from 'localStorage'
  import axios from 'axios'
  import jwtdecode from 'jwt-decode'
  
  export default {
    name: 'Forms',
    components: {
      HeroBar,
      FilePicker,
      // RadioPicker,
      // CheckboxPicker,
      CardComponent,
      TitleBar,
    },
    data() {
      return {
        isActive: localStorage.getItem('isActive'),
        form: {
          name: null,
          phone: null,
          department: null,
          subject: null,
          question: null,
          nombre_completo: localStorage
            .getItem('primer_nombre')
            .concat(
              ' ',
              localStorage.getItem('segundo_nombre'),
              ' ',
              localStorage.getItem('primer_apellido'),
              ' ',
              localStorage.getItem('segundo_apellido')
            ),
          movil: localStorage.getItem('movil'),
          direccion: localStorage.getItem('direccion'),
          email: localStorage.getItem('email'),
          tipo_documento: localStorage.getItem('tipo_documento'),
          documento_tercero: localStorage.getItem('documento_tercero'),
          dataSinc: localStorage.getItem('dataSinc'),
        },
        solicitud: {
          documento_tercero: localStorage.getItem('documento_tercero'),
          tipo_peticion: '',
          asunto: '',
          mensaje: '',
          nombre_completo: localStorage
            .getItem('primer_nombre')
            .concat(
              ' ',
              localStorage.getItem('segundo_nombre'),
              ' ',
              localStorage.getItem('primer_apellido'),
              ' ',
              localStorage.getItem('segundo_apellido')
            ),
          email: localStorage.getItem('email'),
          movil: localStorage.getItem('movil'),
          direccion: localStorage.getItem('direccion'),
          file: null,
        },
        customElementsForm: {
          checkbox: [],
          radio: null,
          switch: true,
          file: null,
        },
        tipo_peticion: [],
      }
    },
    head() {
      return {
        title: 'Formulario Solicitud',
      }
    },
    computed: {
      titleStack() {
        return ['Armorum VU-SGDEA v2022', 'Solicitud']
      },
    },
    created() {
      this.getData()
    },
    methods: {
      onFileUpload() {
        this.solicitud.file = this.$refs.file.files[0]
      },
      getData() {
        const api = this.$config.RutaApi
        const token = localStorage.getItem('token_acces')
        const userId = jwtdecode(token).user_id.toString()
        axios
          .get(`${api}/TipoPeticion/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((result) => {
            this.tipo_peticion = result.data
          })
          .catch((error) => {
            console.log(error)
            this.$buefy.snackbar.open({
              message:
                'No se ha podido cargar los tipos de petición. Por favor recargue la pagina',
              queue: false,
            })
          })
      },
      Create() {
        const formData = new FormData()
        formData.append('file', this.solicitud.file)
        formData.append('documento_tercero', this.solicitud.documento_tercero)
        formData.append('tipo_peticion', this.solicitud.tipo_peticion)
        formData.append('asunto', this.solicitud.asunto)
        formData.append('mensaje', this.solicitud.mensaje)
        formData.append('nombre_completo', this.solicitud.nombre_completo)
        formData.append('email', this.solicitud.email)
        formData.append('movil', this.solicitud.movil)
        formData.append('direccion', this.solicitud.direccion)
  
        const api = this.$config.RutaApi
        const token = localStorage.getItem('token_acces')
        const userId = jwtdecode(token).user_id.toString()
        axios
          .post(`${api}/solicitud/create/${userId}/`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((result) => {
            console.log(result.data)
            this.$buefy.snackbar.open({
              message: 'Solicitud enviada correctamente',
              queue: false,
            })
            this.$router.push({
              path: 'dashboard',
            })
          })
          .catch((error) => {
            console.log(error)
            console.log(this.solicitud.file)
            this.$buefy.snackbar.open({
              message: 'Fallo al momento de Enviar',
              type: 'is-danger',
              queue: false,
            })
          })
      },
      submit() {},
      reset() {
        this.form = mapValues(this.form, (item) => {
          if (item && typeof item === 'object') {
            return []
          }
          return null
        })
  
        this.$buefy.snackbar.open({
          message: 'Reset successfully',
          queue: false,
        })
      },
    },
  }
  </script>