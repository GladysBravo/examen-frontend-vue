<template>
  <section>
    <h2 class="title">Registro de Docente</h2>
    <form class="form-group" v-on:submit.prevent="registrar()">
        <p>Carnet Identidad</p>
        <input type="text" placeholder="Introduzca C.I." v-model="docente.documento_identidad">
        <p>Nombres:</p>
        <input type="text" placeholder="Introduzca Nombres" v-model="docente.nombres">
        <p>Primer Apellido:</p>
        <input type="text" placeholder="Introduzca Primer Apellido" v-model="docente.primer_apellido">
        <p>Segundo Apellido:</p>
        <input type="text" placeholder="Introduzca Segundo Apellido" v-model="docente.segundo_apellido">        
        <br><br>
        <button type="submit" value="login" class="btn btn-primary">REGISTRAR</button>
    </form>     
    <p>{{ searchMessage }}</p>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  components: {

  },
  mounted() {
    this.path = this.$route.path;
  },
  data() {
    return {
      mensaje: "xxxx",
      respuesta: 0,
      lista: [],
      loginDetails: {
        email: "",
        contrasena: ""
      },
      docente: {
        nombres: "",
	    documento_identidad: "",
        primer_apellido: "",
        segundo_apellido: ""
      }
    };
  },
  methods: {
    registrar: function() {
      const authUser = {};
      var app = this;
      let url = 'http://localhost:4000/public/docentes';
      axios.post(url, app.docente)      
        .then(function(res) {
          console.log("respuesta login.{{{{{vue}}}}}", res);
          app.$router.push("/docentes");
          console.log("respuesta login.vue---<<<<<<<<<<<<--", app);
        })
        .catch(function(err) {
          app.mensaje = err.response.data.mensaje;
          console.log(".............xxxs......", err.response.data);
        });
    }
  },
  computed: {
    searchMessage() {
      return `${this.mensaje}`;
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/_variables.scss";
@import "../../assets/scss/modules/_form.scss";


</style>

