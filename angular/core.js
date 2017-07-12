angular.module('MainApp', [])

function mainController($scope, $http) {
  $scope.newPersona = {};
  $scope.personas = {};
  $scope.selected = false;

  // Obtenemos todos los datos de la base de datos
  $http.get('/api/persona').success(function(data) {
    $scope.personas = data;
    console.log($scope.personas);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  // Función para registrar a una persona
  $scope.registrarPersona = function() {
    $http.post('/api/persona', $scope.newPersona).success(function(data) {
      $scope.newPersona = {}; // Borramos toda la información del formulario
      $scope.personas = data; // Al registrar una persona se devuelven todas las personas
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // Función para editar los datos de una persona
  $scope.modificarPersona = function(newPersona) {
    $http.put('/api/persona' + $scope.newPersona._id, $scope.newPersona).success(function(data) {
      $scope.newPersona = {}; // Borramos toda la información del formulario
      $scope.personas = data; // Al modificar una persona se devuelven todas las personas
      $scope.selected = false;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };

  // Función que borra un objeto persona conocido por su id
  $scope.borarPersona = function(newPersona) {
    $http.delete('/api/persona/' + $scope.newPersona._id).success(function(data) {
      $scope.newPersona = {}; // Borramos toda la información del formulario
      $scope.personas = data; // Al borar a una persona se devuelven todas las personas
      $scope.selected = false;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // Función para coger el objeto seleccionado en la tabla
  $scope.selectPerson = function(persona) {
    $scope.newPersona = persona;
    $scope.selected = true;
    console.log($scope.newPersona, $scope.selected);
  }
}
