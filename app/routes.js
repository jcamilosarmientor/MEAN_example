var Persona = require('./modelo/persona');
var Controller = require('./controller');

module.exports = function(app) {

  //Devolver todas las personas
  app.get('/api/persona', Controller.getPersona);

  //Crear nueva persona
  app.post('/api/persona', Controller.setPersona);

  //Modificar los datos de una persona
  app.put('/api/persona/:persona_id', Controller.updatePersona);

  //Borrar una persona
  app.delete('/api/persona/:persona_id', Controller.removePersona);

  //Aplication
  app.get('*', function (req, res) {
      res.sendFile(__dirname + '/angular/index.html'); // Carga única de la vista
  });

}
