<template>
  <section>
    <h2 class="title">LISTA -- AULAS</h2>    
    <form  v-on:submit="registrar()">
        <p>Nombre Aula:</p>
        <input type="text" placeholder="Introduzca Nombre" v-model="aula.nombre">        
        <br><br>
        <button type="submit" value="login" class="btn btn-primary">REGISTRAR</button>
    </form>     
    <p>{{ searchMessage }}</p>

    <table>
      <tr>        
        <th>Nro</th>
        <th>NOMBRES</th>        
        <th>ESTADO</th>
      </tr>
      <tr v-for="(item, index) in lista" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.nombre }}</td>        
        <td>{{ item.estado }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  components: {},
  mounted() {
    let url = "http://localhost:4000/public/aulas?limit=10&page=1";
    axios.get(url).then(respuesta => {
      console.log(respuesta.data.datos.rows);
      this.lista = respuesta.data.datos.rows;
    }),
    (this.path = this.$route.path);
  },
  created() {},
  data() {
    return {
      lista: [],
      mensaje: "xxxx",
      path: "/",
      aula: {
        nombre: ""
      }
    };
  },
  filters: {
    fecha: function(str) {
      //return moment(str).format('DD-MM-YYYY');
      return moment(String(str)).format("MM/DD/YYYY hh:mm");
    }
  },
  methods: {
    registrar: function() {
      const authUser = {};
      var app = this;
      let url = "http://localhost:4000/public/aulas";
      axios
        .post(url, app.aula)
        .then(function(res) {
          console.log("respuesta login.{{{{{vue}}}}}", res);
          app.$router.push("/");
          console.log("respuesta login.vue---<<<<<<<<<<<<--", app);
        })
        .catch(function(err) {
          app.mensaje = err.response.data.mensaje;
          console.log(".............xxxs......", err.response.data);
        });
    }
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
    }
  },
  computed: {
    searchMessage() {
      return `${this.mensaje}`;
    }
  },
};
</script>

