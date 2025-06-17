const Paciente = require('../models/Paciente');

// Mostrar formulario de creación
exports.createForm = (req, res) => {
  res.render('pacientes/create');
};

// Guardar nuevo paciente
exports.create = async (req, res) => {
  try {
    await Paciente.create(req.body);
    req.flash('success', 'Paciente creado correctamente');
    res.redirect('/pacientes');
  } catch (error) {
    console.error(error); 
    req.flash('error', 'Error al crear paciente');
    res.redirect('/pacientes/create');
  }
};

// Listar pacientes
exports.list = async (req, res) => {
  const pacientes = await Paciente.findAll();
  res.render('pacientes/list', { pacientes });
};

// Mostrar detalle de un paciente
exports.show = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.id);
  if (!paciente) {
    req.flash('error', 'Paciente no encontrado');
    return res.redirect('/pacientes');
  }
  res.render('pacientes/show', { paciente });
};

// Mostrar formulario de edición
exports.editForm = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.id);
  if (!paciente) {
    req.flash('error', 'Paciente no encontrado');
    return res.redirect('/pacientes');
  }
  res.render('pacientes/edit', { paciente });
};

// Actualizar paciente
exports.update = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      req.flash('error', 'Paciente no encontrado');
      return res.redirect('/pacientes');
    }
    await paciente.update(req.body);
    req.flash('success', 'Paciente actualizado correctamente');
    res.redirect(`/pacientes/${paciente.id}`);
  } catch (error) {
    req.flash('error', error.errors && error.errors[0] ? error.errors[0].message : 'Error al actualizar paciente');
    res.redirect(`/pacientes/${req.params.id}/edit`);
  }
};