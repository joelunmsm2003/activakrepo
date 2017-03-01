angular
  .module('app')
  .component('homecomponent', {
    templateUrl: '/calidad/html/home/home.html',
    controller: HomeController

  });





function HomeController($scope,$location,$http){

        console.log('URL...',$location.url())

        var ctrl = this;

        url = $location.url()

        console.log('url.....',url.split('&')[0].split('=')[1])

        dni = url.split('&')[0].split('=')[1]

        $scope.base = url.split('&')[1].split('=')[1]

        $scope.id_agente = url.split('&')[2].split('=')[1]

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

            $scope.cliente = res[0]

            console.log('Cliente...',$scope.cliente)
        

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

        // $scope.goperson =function(data){


        //     window.location.href='/calidad/#/home?dni='+data+'&'+'base=123'

        //     location.reload()

        // }


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

            window.location.href=host_primary+'/calidad/#/home?dni='+data.cliente+'&'+'base='+data.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente


            location.reload()
        }


          ctrl.deleteHero = function(hero) {

            console.log('heroeeeee',hero)

            var formData = { telefono: hero };

            var postData = 'myData='+JSON.stringify(formData);


            $http({

            method : 'POST',
            url : host+'/traebase.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}  

            }).success(function(res){

                console.log('Llamar denuevo-',res[0].id_orig_base);

                url = '#/home?dni='+res[0].cliente+'&'+'base='+res[0].id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente

                $scope.pasabase = res[0]

                window.location.href='/calidad/#/home?dni='+res[0].cliente+'&'+'base='+$scope.pasabase.id_orig_base+'&agente='+$scope.id_agente+'&nomagente='+$scope.nomagente
   
                location.reload()

            })

            //$location.path(hero)

            

            //window.location.href=hero

            //location.reload()

          };






}
