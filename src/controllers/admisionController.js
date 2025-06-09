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
      req.flash('success', 'Admisión creada exitosamente');
      res.redirect(`/admisiones/${admision.id}/asignar-cama?ala=${ala_id}`);
    } catch (error) {
      res.render('error', { 
        error: 'Error al crear la admisión' 
      });
    }
  },

  asignarCamaForm: async (req, res) => {
    try {
      const { ala } = req.query;
      const admision = await Admision.findByPk(req.params.id, {
        include: [Paciente]
      });
      if (!admision) {
        return res.status(404).render('error', { 
          error: 'Admisión no encontrada' 
        });
      }
      const camasDisponibles = await Cama.findAll({
        include: [
          {
            model: Habitacion,
            where: ala ? { ala_id: ala } : {},
            include: [Ala]
          }
        ],
        where: { estado: 'libre' }
      });
      const paciente = await Paciente.findByPk(admision.paciente_id);
      // Filtro de camas según restricción de sexo
      const camasFiltradas = [];
      for (const cama of camasDisponibles) {
        if (cama.Habitacion.cantidad_camas === 1) {
          camasFiltradas.push(cama);
          continue;
        }
        const asignacion = await AsignacionCama.findOne({
          where: { cama_id: cama.id },
          include: [{
            model: Admision,
            where: { estado: 'activo' },
            include: [Paciente]
          }]
        });
        if (!asignacion || asignacion.Admision.Paciente.sexo === paciente.sexo) {
          camasFiltradas.push(cama);
        }
      }
      res.render('admisiones/asignar-cama', { 
        title: `Asignar Cama a ${admision.Paciente.nombre} ${admision.Paciente.apellido}`,
        admision,
        camas: camasFiltradas,
        alas: await Ala.findAll()
      });
    } catch (error) {
      res.render('error', { 
        error: 'Error al cargar el formulario de asignación de cama' 
      });
    }
  },

  asignarCama: async (req, res) => {
    try {
      const { cama_id, notas } = req.body;
      const cama = await Cama.findByPk(cama_id);
      if (!cama || cama.estado !== 'libre') {
        req.flash('error', 'La cama seleccionada no está disponible');
        return res.redirect(`/admisiones/${req.params.id}/asignar-cama`);
      }
      await AsignacionCama.create({
        admision_id: req.params.id,
        cama_id,
        notas
      });
      await cama.update({ estado: 'ocupada' });
      req.flash('success', 'Cama asignada exitosamente');
      res.redirect(`/admisiones/${req.params.id}`);
    } catch (error) {
      res.render('error', { 
        error: 'Error al asignar la cama' 
      });
    }
  },

  show: async (req, res) => {
    try {
      const admision = await Admision.findByPk(req.params.id, {
        include: [
          { model: Paciente },
          { model: AsignacionCama, include: [Cama] },
          { model: Usuario, as: 'Doctor' }
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
        return res.status(404).render('error', { 
          error: 'Admisión no encontrada' 
        });
      }
      if (admision.AsignacionCama) {
        await Cama.update(
          { estado: 'libre' },
          { where: { id: admision.AsignacionCama.cama_id } }
        );
        await admision.AsignacionCama.destroy();
      }
      await admision.update({ estado: 'cancelado' });
      req.flash('success', 'Admisión cancelada exitosamente');
      res.redirect('/admisiones');
    } catch (error) {
      res.render('error', { 
        error: 'Error al cancelar la admisión' 
      });
    }
  }
};

module.exports = admisionController;