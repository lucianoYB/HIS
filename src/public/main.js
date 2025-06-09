function confirmAction(message) {
  return confirm(message || '¿Está seguro que desea realizar esta acción?');
}

// Manejo de formularios dinámicos (para medicamentos, etc.)
document.addEventListener('DOMContentLoaded', function() {
  // Agregar campos dinámicos de medicamentos
  document.querySelector('.add-medication')?.addEventListener('click', function(e) {
    e.preventDefault();
    const container = document.getElementById('medications-container');
    if (!container) return;
    const index = container.children.length;
    
    const div = document.createElement('div');
    div.className = 'medication-item mb-3 border p-3 position-relative';
    div.innerHTML = `
      <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0" 
              onclick="this.parentNode.remove()">×</button>
      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label class="form-label">Nombre del Medicamento</label>
            <input type="text" class="form-control" name="medications[${index}][name]" required>
          </div>
        </div>
        <!-- Puedes agregar más campos aquí si lo necesitas -->
      </div>
    `;
    container.appendChild(div);
  });

  // Validación de formularios
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor complete todos los campos requeridos');
      }
    });
  });
});

// Funciones para admisiones
function cancelAdmission(admissionId) {
  if (confirmAction('Cancelar esta admisión liberará la cama asignada. ¿Desea continuar?')) {
    fetch(`/admisiones/${admissionId}/cancelar`, { // Corregido a español
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Puedes agregar CSRF si tu backend lo requiere
      }
    }).then(response => {
      if (response.ok) window.location.reload();
    });
  }
}