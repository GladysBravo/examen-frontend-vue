<template>
  <section>
    <h2 class="title">LISTA -- RESERVA HORARIOS</h2>    
    
    <table>
      <tr>        
        <th>Nro</th>
        <th>FECHA RESERVA</th>        
        <th>HORA INICIO</th>        
        <th>HORA FIN</th>
        <th>AULA</th>
        <th>MATERAIA</th>
        <th>DOCENTE</th>
      </tr>
      <tr v-for="(item, index) in lista" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.fecha_reserva | fecha}}</td>        
        <td>{{ item.hora_inicio }}</td>
        <td>{{ item.hora_fin }}</td>
        <td>{{ item.aula.nombre }}</td>
        <td>{{ item.materia.nombre }}</td>
        <td>{{ `${item.materia.docente.nombres} ${item.materia.docente.primer_apellido ? item.materia.docente.primer_apellido : ''} ${item.materia.docente.segundo_apellido ? item.materia.docente.segundo_apellido: ''}` }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  components: { },
  mounted() {
    let url = "http://localhost:4000/public/reservar?limit=10&page=1";
    axios.get(url).then(respuesta => {
      console.log(respuesta.data.datos.rows);
      this.lista = respuesta.data.datos.rows;
    });
    let urlDoc = "http://localhost:4000/public/docentes?limit=10&page=1";
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
      horario: {
        fecha_reserva: "12/12/2013",
        hora_inicio: "12:00",
        hora_fin: "12:20",
        fid_aula: 0,
        fid_materia: 0
      },
      state: {
        date: new Date(2016, 9, 16)
      },
    };
  },
  filters: {
    fecha: function(str) {
      //return moment(str).format('DD-MM-YYYY');
      return moment(String(str)).format("MM/DD/YYYY");
    }
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
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
    },

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
  }
};
</script>

