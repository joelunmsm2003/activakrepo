angular
  .module('app')
  .component('tipificacioncomponent', {
    templateUrl: '/calidad/html/tipificacion/tipificacion.html',
    controller: TipificacionController,
    bindings: {
        pasabase: '='
    }
  

  });





function TipificacionController($scope,$location,$http,$log){


    ctrl = this


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

      console.log('tipifica.....',tipo,data,base)

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


      console.log('obs....',data,ctrl)

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
