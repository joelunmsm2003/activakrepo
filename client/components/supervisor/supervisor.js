angular
  .module('app')
  .component('supervisorcomponent', {
    templateUrl: '/calidad/html/supervisor/supervisor.html',
    controller: SupervisorController,
    bindings: {
        pasabase: '='
    }
  

  });


function SupervisorController($scope,$location,$http,$log){

	

}