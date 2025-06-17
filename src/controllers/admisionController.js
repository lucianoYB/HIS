const { Admision, Paciente, Cama, AsignacionCama, Ala, Habitacion, Usuario } = require('../models');

const admisionController = {
  list: async (req, res) => {
    try {
      const admisiones = await Admision.findAll({
        include: [
          { model: Paciente },
          { model: AsignacionCama, include: [Cama] }
        ],
        where: { estado: 'activo' }
      });
      res.render('admisiones/list', { 
        title: 'Admisiones Activas',
        admisiones
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al obtener la lista de admisiones' 
      });
    }
  },

  createForm: async (req, res) => {
    try {
      const pacientes = await Paciente.findAll({
        order: [['apellido', 'ASC']]
      });
      const alas = await Ala.findAll();
      res.render('admisiones/create', { 
        title: 'Nueva Admisión',
        pacientes,
        alas
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al cargar el formulario de admisión' 
      });
    }
  },

  create: async (req, res) => {
    try {
      const { paciente_id, tipo, motivo, ala_id } = req.body;
      const admision = await Admision.create({
        paciente_id,
        tipo,
        motivo,
        estado: 'activo',
        doctor_id: req.user.id
      });
      // Redirige pasando el ala seleccionada
      res.redirect(`/admisiones/${admision.id}/asignar-cama?ala=${ala_id}`);
    } catch (error) {
      res.render('error', { error: 'Error al crear la admisión' });
    }
  },

  asignarCamaForm: async (req, res) => {
    try {
      const { ala } = req.query;
      const admision = await Admision.findByPk(req.params.id, { include: [Paciente] });
      const alas = await Ala.findAll();
      let camas = [];

      if (ala) {
        camas = await Cama.findAll({
          where: { estado: 'libre' },
          include: [{
            model: Habitacion,
            where: { ala_id: ala },
            include: [Ala]
          }]
        });
      }

      res.render('admisiones/AsignacionCama', {
        title: 'Asignar Cama',
        admision,
        alas,
        camas,
        alaSeleccionada: ala
      });
    } catch (error) {
      res.render('error', { error: 'Error al cargar asignación de cama' });
    }
  },

  asignarCama: async (req, res) => {
    try {
      // Verificar si ya tiene una cama asignada
      const yaAsignada = await AsignacionCama.findOne({ where: { admision_id: req.params.id } });
      if (yaAsignada) {
        req.flash('error', 'Esta admisión ya tiene una cama asignada.');
        return res.redirect(`/admisiones/${req.params.id}`);
      }

      const { ala_id, cama_id } = req.body;
      const ala = await Ala.findByPk(ala_id);
      if (!ala) {
        req.flash('error', 'El ala seleccionada no existe.');
        return res.redirect(`/admisiones/${req.params.id}/asignar-cama`);
      }

      await AsignacionCama.create({
        ala_id,
        cama_id,
        admision_id: req.params.id,
        fecha_asignacion: new Date()
      });

      await Cama.update({ estado: 'ocupada' }, { where: { id: cama_id } });

      req.flash('success', 'Cama asignada correctamente');
      res.redirect(`/admisiones/${req.params.id}`);
    } catch (error) {
      console.error(error);
      req.flash('error', 'Error al asignar cama');
      res.redirect(`/admisiones/${req.params.id}/asignar-cama`);
    }
  },

  show: async (req, res) => {
    try {
      const admision = await Admision.findByPk(req.params.id, {
        include: [
          { model: Paciente },
          { model: AsignacionCama, include: [Cama] }
        ]
      });
      if (!admision) {
        return res.status(404).render('error', { 
          error: 'Admisión no encontrada' 
        });
      }
      res.render('admisiones/show', { 
        title: `Admisión #${admision.id}`,
        admision
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al obtener los datos de la admisión' 
      });
    }
  },

  cancelar: async (req, res) => {
    try {
      const admision = await Admision.findByPk(req.params.id, {
        include: [AsignacionCama]
      });
      if (!admision) {
        return res.status(404).render('error', { error: 'Admisión no encontrada' });
      }
      if (admision.AsignacionCama) {
        await Cama.update(
          { estado: 'libre' },
          { where: { id: admision.AsignacionCama.cama_id } }
        );
        await admision.AsignacionCama.destroy();
      }
      await admision.update({ estado: 'cancelado' });
      req.flash('success', 'Admisión cancelada y cama liberada exitosamente');
      res.redirect('/admisiones');
    } catch (error) {
      console.error(error);
      res.render('error', { error: 'Error al cancelar la admisión' });
    }
  },

  darDeAlta: async (req, res) => {
    try {
      const admision = await Admision.findByPk(req.params.id);
      if (!admision) {
        req.flash('error', 'Admisión no encontrada');
        return res.redirect('/admisiones');
      }
      await admision.update({ estado: 'dado de alta' });
      req.flash('success', 'Paciente dado de alta correctamente');
      res.redirect('/admisiones');
    } catch (error) {
      console.error(error);
      req.flash('error', 'Error al dar de alta la admisión');
      res.redirect('/admisiones');
    }
  }
};

module.exports = admisionController;