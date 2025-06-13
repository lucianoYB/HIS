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

  createForm: async (req, res) => {
    try {
      const pacientes = await Paciente.findAll();
      res.render('pacientes/create', { 
        title: 'Registrar Nuevo Paciente',
        pacientes: pacientes
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al cargar el formulario de registro' 
      });
    }
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
  },

  findPaciente: async (req, res) => {
    try {
      const paciente = await Paciente.findByPk(req.body.paciente_id);
      if (!paciente) {
        req.flash('error', 'Paciente no encontrado');
        return res.redirect('/admisiones/create');
      }
      req.flash('success', 'Paciente encontrado');
      res.redirect(`/pacientes/${paciente.id}`);
    } catch (error) {
      req.flash('error', 'Error al buscar el paciente');
      res.redirect('/admisiones/create');
    }
  }
};

module.exports = pacienteController;