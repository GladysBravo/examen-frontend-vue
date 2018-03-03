import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home';
import Form from './components/Form';
import Lista from './components/Lista';
import Autenticar from './components/login/Login';
import Reserva from './components/reserva/Reserva';
import Docente from './components/examen/Docente'
import RegistroDocente from './components/examen/RegistroDocente'
import Aula from './components/examen/Aula'
import Materia from './components/examen/Materia'
import Horario from './components/examen/Horario'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/lista',
      name: 'Lista',
      component: Lista
    },
    {
      path: '/autenticar',
      name: 'Autenticar',
      component: Autenticar
    },
    {
      path: '/reserva',
      name: 'Reserva',
      component: Reserva
    },
    {
      path: '/docentes',
      name: 'Docente',
      component: Docente
    },
    {
      path: '/docentes/registro',
      name: 'RegistroDocente',
      component: RegistroDocente
    },
    {
      path: '/aula',
      name: 'Aula',
      component: Aula
    },
    {
      path: '/materia',
      name: 'Materia',
      component: Materia
    },
    {
      path: '/horario',
      name: 'Horario',
      component: Horario
    }
  ]
});
