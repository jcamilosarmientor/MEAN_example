var Persona = require('./modelo/persona');

// Obtiene todos los objetos Persona de la base de datos
exports.getPersona = function (req, res) {
  Persona.find(
    function (err, persona) {
      if (err) {
        res.send(err);
      } else {
        res.json(persona);
      };
    }
  );
};  //Fin

// Guarda un objeto Persona en base datos
exports.setPersona = function(req, res) {
  // Crea el objeto Persona
  Persona.create(
    { nombre: req.body.nombre,
      apellido: req.body.apellido,
      edad: req.body.edad
    },
    function (err, persona) {
      if (err) {
        res.send(err)
      } else {
        // Obtiene y devuelve todas las personas tras crear una de ellas
        Persona.find(
          function (err, persona) {
            if (err) {
              res.send(err)
            } else {
              res.json(persona)
            }
          });
        };
    });
};  //Fin

// Modificamos un objeto persona de la base de datos
exports.updatePersona = function (req, res) {
  Persona.update( { _id: req.params.persona_id },
                  {$set:
                    {nombre: req.body.nombre, apellido: req.body.apellido, edad: req.body.edad}
                  },
                  function (err, persona) {
                    if (err) {
                      res.send(err);
                    } else {
                      // Obtiene y devuelve todas las personas tras modificar una de ellas
                      Persona.find(
                        function (err, persona) {
                          if (err) {
                            res.send(err);
                          } else {
                            res.json(persona);
                          }
                        });
                    }
                  });
};

// Eliminó un objeto persona de la base de datos
exports.removePersona = function (req, res) {
  Persona.remove( { _id: req.params.persona_id },
                  function (err, persona) {
                    if (err) {
                      res.send(err)
                    } else {
                      // Obtiene y devuelve todas las personas tras borrar una de ellas
                      Persona.find(
                        function (err, persona) {
                          if (err) {
                            res.send(err);
                          } else {
                            res.json(persona);
                          }
                        });
                    }
                  });
};
