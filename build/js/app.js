



function UserService ($http,$q,$log,$localStorage) {  
    return {
        ingresar: ingresar,
        alumnos: alumnos
    }



}





angular

.module('app', ['ngSanitize','angular-input-stars','rzModule','ui.router','ngStorage','ui.bootstrap','ngAnimate','ngTouch','ngScrollTo','flow','xeditable','ngResource','gettext','ngMap','ngLocale','tmh.dynamicLocale','wyvernzora.un-svg'])
      
.config(routesConfig)

// Aqui se llamn los servicios

.service('UserService', UserService)

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider) {

	// Aqui se especifica las rutas

	$stateProvider.state('home',{

			url : '/home',
			template: "<homecomponent></homecomponent>",

		});


	host = 'http://192.168.40.4/calidad/controllers'

	//$locationProvider.html5Mode(true);

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";


	/*

	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
	return {
	    'request': function (config) {
	        config.headers = config.headers || {};
	        if ($localStorage.token) {
	            config.headers.Authorization = 'Bearer ' + $localStorage.token;
	        }
	        return config;
	    },
	    'responseError': function(response) {
	        if(response.status === 401 || response.status === 403) {

	            $location.path('/signin');
	        }
	        return $q.reject(response);
	    }
	};
	}]);
	*/


}

	

angular
  .module('app')
  .component('foootercomponent', {
    templateUrl: '/calidad/html/footer/footer.html',
    controller: FooterController
  });



function FooterController($scope,$location){


}

angular
  .module('app')
  .component('formulariocomponent', {
    templateUrl: '/calidad/html/formulario/formulario.html',
    controller: FormularioController
  });



function FormularioController($scope,$location,$http){



		// Saca de la URL solo el DNI


		url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

		dni = url.split('&')[0].split('=')[1]



        console.log('dni...',dni)

        
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






	

}

angular
  .module('app')
  .component('headercomponent', {
    templateUrl: '/calidad/html/header/header.html',
    controller: HeaderController
  });



function HeaderController($scope){


}

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

angular
  .module('app')
  .component('homecomponent', {
    templateUrl: '/calidad/html/home/home.html',
    controller: HomeController

  });





function HomeController($scope,$location,$http){


        console.log('URL...',$location.url())

		url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

		dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.agente = url.split('&')[2].split('=')[1]

        $scope.nomagente = url.split('&')[3].split('=')[1]

        console.log('Request.......',dni,$scope.base,$scope.agente,$scope.nomagente)


        var formData = { agente: $scope.agente ,base:$scope.base,nomagente:$scope.nomagente};

        var postData = 'myData='+JSON.stringify(formData);


        $http({

        method : 'POST',
        url : host+'/agentesave.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){

            
        

        })




        var formData = { dni: dni };

        var postData = 'myData='+JSON.stringify(formData);


        $http({

        method : 'POST',
        url : host+'/gestion.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){

            $scope.agente = res[0]
        

        })

        var formData = { base: $scope.base };

        var postData = 'myData='+JSON.stringify(formData);

        $http({

        method : 'POST',
        url : host+'/base.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

        }).success(function(res){

            $scope.agentereal = res[0]

            

        })

        $scope.goperson =function(data){


            window.location.href='http://192.168.40.4/calidad/#/home?dni='+data+'&'+'base=123'

            location.reload()

        }


        $scope.searchdni =function(data){


                console.log('dni....',data)

                var formData = { dni: dni };

                var postData = 'myData='+JSON.stringify(formData);


                $http({

                method : 'POST',
                url : host+'/gestion.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                $scope.resultadodni = res[0]


                })


                var formData = { dni: data };

                var postData = 'myData='+JSON.stringify(formData);


                $http({

                method : 'POST',
                url : host+'/dni.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                    $scope.registros = res

                    console.log('dnis.....',$scope.registros)

                })


        }

        

        $scope.go=function(data){

            console.log('ererer...',data)

               $('#myModal').modal('hide');

               

               
            //window.location.href='http://192.168.40.4/calidad/#/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente=17402130&nomagente=DeisyH'

            window.location.href='http://192.168.40.4/calidad/#/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.agente+'&nomagente='+$scope.nomagente


            location.reload()
        }



}

angular
  .module('app')
  .component('llamadascomponent', {
    templateUrl: '/calidad/html/llamadas/llamadas.html',
    controller: LlamadasController

  });





function LlamadasController($scope,$location,$http){


        // Saca de la URL solo el DNI

        url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

        dni = url.split('&')[0].split('=')[1]




                var formData = { dni: dni };

                var postData = 'myData='+JSON.stringify(formData);

                $http({

                method : 'POST',
                url : host+'/dni.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                console.log('llamadas..',res);

                $scope.llamadas = res


                })



}

angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: '/calidad/html/tipificacion/tipificacion.html',
    controller: TipificacionController
  

  });





function TipificacionController($scope,$location,$http,$log){


          // Saca de la URL solo el DNI

    $scope.pasabase = this.pasabase

    console.log('Tipificando.......',this.pasabase)

    url = $location.url()

    $scope.base = url.split('&')[1].split('=')[1]

    console.log('base..',$scope.base)

    $http.get(host+"/contacto.php/").success(function(data) {

    $scope.contacto = data

    });





    var formData = { base: $scope.base };

    var postData = 'myData='+JSON.stringify(formData);

    $http({

    method : 'POST',
    url : host+'/obtienebase.php',
    data: postData,
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

    }).success(function(res){


            $scope.baseresult = res[0]

            $http.get(host+"/contacto.php/").success(function(data) {

                  $scope.contacto = data

                
      
                
            });



 
      

 

            // console.log('contacto',$scope.baseresult.contacto)
  
    })



    $scope.muestraagendar= false

    $scope.tipifica =function(tipo,data,base){

      console.log('tipifica..',tipo,data)

      $scope.tip = {}

      if (tipo=='contacto'){

        $scope.tip['contacto'] = data


      } 

      if (tipo=='accion'){

        $scope.tip['accion'] = data

  
      } 

      if (tipo=='estado'){

        $scope.tip['estado'] = data
      } 

      console.log($scope.tip)

 
            var formData = { tipifica: $scope.tip ,base:base};

            var postData = 'myData='+JSON.stringify(formData);

            $http({

            method : 'POST',
            url : host+'/tipifica.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

            }).success(function(res){

            

            })


    }


    $scope.setobservacion = function(data){


      console.log('obs....',data)

            var formData = { observacion: data ,base:$scope.base};

            var postData = 'myData='+JSON.stringify(formData);

            $http({

            method : 'POST',
            url : host+'/observacion.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

            }).success(function(res){

            

            })



    }

    




      

        $scope.traeestados =function(data){

          

          $scope.tipifica('accion',data,$scope.base)

            var formData = { accion: data };

                      var postData = 'myData='+JSON.stringify(formData);

                      $http({

                          method : 'POST',
                          url : host+'/estados.php',
                          data: postData,
                          headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                      }).success(function(res){

                          $scope.estados = res

                          console.log('accion',res)

                            

                      

                      })


        }


            $scope.traeacciones =function(data){

                      

                      $scope.tipifica('contacto',data,$scope.base)

                      var formData = { contacto: data };

                      var postData = 'myData='+JSON.stringify(formData);

                      $http({

                          method : 'POST',
                          url : host+'/accion.php',
                          data: postData,
                          headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                      }).success(function(data){

                          console.log('acciones',data)

                          $scope.listaaciones = data

                      })

            } 

            $scope.setestado = function(data){


              console.log('esado....',data)

              $scope.tipifica('estado',data,$scope.base)
            }


            
// Datetime

  $scope.muestratime = false
  
  $scope.agendar = function(data) {
  
   
    $scope.changed()

    $scope.muestratime = true

  };

  $scope.today = function() {
    $scope.dt = null;
  };

  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
     minDate: new Date(),
    showWeeks: false
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };



  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];


  // Time

  $scope.mytime = null;

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 0 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.update()

  $scope.changed = function () {
 
     console.log('FEcha...',$scope.dt.getDate(),$scope.mytime)


                fagenda = JSON.stringify($scope.dt).split(':')[0].split('T')[0].split('"')[1]+' '+$scope.mytime.getHours()+':'+$scope.mytime.getMinutes()

                console.log('Agenda...',fagenda) 


                var formData = { fagenda: fagenda,base:$scope.base };

                var postData = 'myData='+JSON.stringify(formData);

                $http({

                method : 'POST',
                url : host+'/agendar.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                    console.log('llamadas..ooo..',res);

                    $scope.llamadas = res


                })
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };


         $scope.searchdni =function(data){


                


                var formData = { dni: data };

                var postData = 'myData='+JSON.stringify(formData);


                $http({

                method : 'POST',
                url : host+'/llamadas.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

                }).success(function(res){

                    $scope.registros = res

                    console.log('dnis.....',$scope.registros)

                })


        }

      

    
   







}
