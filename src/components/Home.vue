<template>
  <section>
    <h2 class="title">PAGINA DE HOME</h2>

  </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import reservaService from "../components/reserva/ReservaService.js";
export default {
  components: {
    reservaService
  },
  mounted () {
   
  },
  created () {
    
  },
  data () {
    return {
      lista: [],
      listaSalas: [],
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

