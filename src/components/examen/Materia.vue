<template>
  <section>
    <h2 class="title">LISTA -- MATERIAS</h2>    
    <form  v-on:submit.prevent="registrar()">
        <p>Nombre Materia:</p>
        <input type="text" placeholder="Introduzca Nombre" v-model="materia.nombre">        
        <p>Sigla Materia:</p>
        <input type="text" placeholder="Introduzca Nombre" v-model="materia.sigla">        
        <p>Docentes:</p>
        <select v-model="selected" >
          <option v-for="itemM in listaMateria"
            v-bind:value="itemM">{{ `${itemM.nombres} ${itemM.primer_apellido ? itemM.primer_apellido : ''} ${itemM.segundo_apellido ? itemM.segundo_apellido: ''}` }}></option>
        </select>
        <br><br>
        <button type="submit" value="login" class="btn btn-primary">REGISTRAR</button>
    </form>     
    <p>{{ searchMessage }}</p>

    <table>
      <tr>        
        <th>Nro</th>
        <th>NOMBRES</th>        
        <th>SIGLA</th>        
        <th>DOCENTE</th>
      </tr>
      <tr v-for="(item, index) in lista" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.nombre }}</td>        
        <td>{{ item.sigla }}</td>
        <td>{{ `${item.docente.nombres} ${item.docente.primer_apellido ? item.docente.primer_apellido : ''} ${item.docente.segundo_apellido ? item.docente.segundo_apellido: ''}` }}</td>
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
    let url = "http://localhost:4000/public/materias?limit=10&page=1";
    axios.get(url).then(respuesta => {
      console.log(respuesta.data.datos.rows);
      this.lista = respuesta.data.datos.rows;
    })
    let urlDoc = 'http://localhost:4000/public/docentes?limit=10&page=1';
    axios.get(urlDoc).then(respuesta => {
      console.log(respuesta.data.datos.rows);
      this.listaMateria = respuesta.data.datos.rows;
    }),
    (this.path = this.$route.path);
  },
  created() {},
  data() {
    return {
      lista: [],
      listaMateria: [],
      mensaje: "xxxx",
      path: "/",
      selected: {},
      materia: {
        nombre: "",
        sigla: "",
        fid_docente: 0
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
      let url = "http://localhost:4000/public/materias";      
      app.materia.fid_docente = app.selected.id_docente;      
      axios
        .post(url, app.materia)
        .then(function(res) {
          console.log("respuesta login.{{{{{vue}}}}}", res);
          app.$router.push("/");          
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

