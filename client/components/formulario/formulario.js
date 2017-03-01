angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: '/calidad/html/formulario/formulario.html',
    controller: FormularioController,
    bindings: {
        onDelete: '&'
    }
  });



function FormularioController($scope,$location,$http){

        var ctrl = this;

		// Saca de la URL solo el DNI


		url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

		dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = url.split('&')[3].split('=')[1]

        var formData = { dni: dni };

        var postData = 'myData='+JSON.stringify(formData);


        $http({

        method : 'POST',
        url : host+'/gestion.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){

            console.log('Cliente-----',res);

            $scope.agente = res[0]



        })

        $scope.llamar = function(data){

            ctrl.onDelete({hero: data});

        }






	

}
