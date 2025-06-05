const { Paciente } = require('../models');

const pacienteController = {
  list: async (req, res) => {
    try {
      const pacientes = await Paciente.findAll({
        order: [['apellido', 'ASC']]
      });
      res.render('pacientes/list', { 
        title: 'Lista de Pacientes',
        pacientes: pacientes
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al obtener la lista de pacientes' 
      });
    }
  },

  show: async (req, res) => {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).render('error', { 
          error: 'Paciente no encontrado' 
        });
      }
      res.render('pacientes/show', { 
        title: `Paciente: ${paciente.nombre} ${paciente.apellido}`,
        paciente: paciente
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al obtener los datos del paciente' 
      });
    }
  },

  createForm: (req, res) => {
    res.render('pacientes/create', { 
      title: 'Registrar Nuevo Paciente' 
    });
  },

  create: async (req, res) => {
    try {
      const pacienteData = req.body;
      await Paciente.create(pacienteData);
      req.flash('success', 'Paciente registrado exitosamente');
      res.redirect('/pacientes');
    } catch (error) {
      res.render('pacientes/create', { 
        title: 'Registrar Nuevo Paciente',
        error: 'Error al registrar el paciente',
        paciente: req.body
      });
    }
  },

  editForm: async (req, res) => {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).render('error', { 
          error: 'Paciente no encontrado' 
        });
      }
      res.render('pacientes/edit', { 
        title: `Editar Paciente: ${paciente.nombre} ${paciente.apellido}`,
        paciente: paciente
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al cargar el formulario de edición' 
      });
    }
  },

  update: async (req, res) => {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      if (!paciente) {
        return res.status(404).render('error', { 
          error: 'Paciente no encontrado' 
        });
      }
      await paciente.update(req.body);
      req.flash('success', 'Paciente actualizado exitosamente');
      res.redirect(`/pacientes/${paciente.id}`);
    } catch (error) {
      res.render('pacientes/edit', { 
        title: `Editar Paciente: ${req.body.nombre} ${req.body.apellido}`,
        error: 'Error al actualizar el paciente',
        paciente: req.body
      });
    }
  }
};

module.exports = pacienteController;