<template>
  <section>
    <h2 class="title">LISTA -- DOCENTE</h2>    
    <table>
      <tr>        
        <th>Nro</th>
        <th>NOMBRES</th>
        <th>PRIMER APELLIDO</th>
        <th>SEGUNDO APELLIDO</th>
        <th>DOC. IDENTIDAD</th>
      </tr>
      <tr v-for="(item, index) in lista" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.nombres }}</td>
        <td>{{ item.primer_apellido }}</td>
        <td>{{ item.segundo_apellido }}</td>
        <td>{{ item.documento_identidad }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  components: {
    
  },
  mounted () {
    let url = 'http://localhost:4000/public/docentes?limit=10&page=1';
    axios.get(url)
    .then(respuesta => {
      console.log(respuesta.data.datos.rows);
      this.lista = respuesta.data.datos.rows;
    }),
    this.path = this.$route.path;
  },
  created () {
    
  },
  data () {
    return {
      lista: [],
      path: '/'
    }
  }, 
  filters: {    
    fecha: function (str) {
      
      //return moment(str).format('DD-MM-YYYY');
      return moment(String(str)).format('MM/DD/YYYY hh:mm')
    }
  },
  methods: {
   
  },
  watch: {
    '$route' (to, from) {
      this.path = to.path;
    }
  }
}
</script>

