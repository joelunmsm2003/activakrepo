angular
  .module('app')
  .component('reportecomponent', {
    templateUrl: '/activak/build/html/reporte/reporte.html',
    controller: ReporteController

  });



function ReporteController($scope,$location,$http){


	/// Contador de tipo de Contacto

	function gestiontotal(){

				
			    $http.get(host+"/gestionado.php").success(function(response) {

		     	console.log('Respuesta del BAckend...',response)

		     	for(i in response){

		     		console.log('dato...',response[i].contador)

		     		// if(response[i])

		     		if(response[i].contacto==1){

		     			$scope.totaltitular = response[i].contador

		     		}

		     		if(response[i].contacto==2){

		     			$scope.totaltercero = response[i].contador

		     		}

		     		if(response[i].contacto==3){

		     			$scope.totalnocontacto = response[i].contador

		     		}

		     		$scope.totalgestion  = parseInt($scope.totaltitular) + parseInt($scope.totaltercero) +parseInt($scope.totalnocontacto)
		     	}


		    });

	}

	function efectividadtotal(){

				
			    $http.get(host+"/efectividad.php").success(function(response) {

		     	console.log('Respuesta del Efectividad...',response)


		     	for(i in response){

		     		console.log('Efectividad...11',response[i])

		     	
		     		if(response[i].contacto==1 && response[i].accion==1){

		     		console.log('Efectividad...',response[i])

		     		}


				}

	


		    });

	}


	gestiontotal()

	efectividadtotal()



	//setInterval(function(){ gestiontotal() }, 1000);






}
