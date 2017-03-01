angular
  .module('app')
  .component('historialcomponent', {
    templateUrl: '/calidad/html/historial/historial.html',
    controller: HistorialController

  });





function HistorialController($scope,$location,$http){



        // Gestion 


		url = $location.url()

		dni = url.split('=')[1]





}
