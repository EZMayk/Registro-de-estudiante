    let editandoEstudianteId = null;
    let editandoCursoId = null;

    function cargarEstudiantes() {
      fetch('http://localhost:3000/api/estudiantes/estudiante')
        .then(res => res.json())
        .then(data => {
          const tbody = document.getElementById('tablaEstudiantesBody');
          tbody.innerHTML = '';
          data.forEach(est => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
              <td>${est.nombre}</td>
              <td>${est.email}</td>
              <td>${est.cedula}</td>
              <td>${est.curso?.nombre || 'Sin curso'}</td>
              <td>
                <button onclick="editarEstudiante(${est.id})">Editar</button>
                <button onclick="eliminarEstudiante(${est.id})">Eliminar</button>
              </td>
            `;
            tbody.appendChild(fila);
          });
        })
        .catch(err => console.error('Error cargando estudiantes:', err));
    }

    function guardarEstudiante(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const cedula = document.getElementById('cedula').value;
      const cursoId = document.getElementById('cursoSelect').value;

      const estudiante = {
        nombre,
        email,
        cedula,
        cursoId: parseInt(cursoId)
      };

      const url = editandoEstudianteId
        ? `http://localhost:3000/api/estudiantes/estudiante/${editandoEstudianteId}`
        : 'http://localhost:3000/api/estudiantes/estudiante';

      const method = editandoEstudianteId ? 'PUT' : 'POST';

      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudiante)
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al guardar estudiante');
          alert(editandoEstudianteId ? 'Estudiante actualizado' : 'Estudiante registrado con éxito');
          document.getElementById('formEstudiante').reset();
          editandoEstudianteId = null;
          cargarEstudiantes();
          cambiarVista('tablaEstudiantes');
        })
        .catch(err => {
          console.error(err);
          alert('Error al guardar estudiante');
        });
    }

    function editarEstudiante(id) {
      fetch(`http://localhost:3000/api/estudiantes/estudiante/${id}`)
        .then(res => res.json())
        .then(est => {
          cambiarVista('estudiantes');
          document.getElementById('nombre').value = est.nombre;
          document.getElementById('email').value = est.email;
          document.getElementById('cedula').value = est.cedula;
          document.getElementById('cursoSelect').value = est.cursoId;
          editandoEstudianteId = id;
        })
        .catch(err => console.error('Error al cargar estudiante:', err));
    }

    function eliminarEstudiante(id) {
      if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
        fetch(`http://localhost:3000/api/estudiantes/estudiante/${id}`, {
          method: 'DELETE'
        })
          .then(res => {
            if (!res.ok) throw new Error('Error al eliminar');
            alert('Estudiante eliminado con éxito');
            cargarEstudiantes();
          })
          .catch(err => {
            console.error(err);
            alert('Error al eliminar estudiante');
          });
      }
    }

    function cargarCursos() {
      fetch('http://localhost:3000/api/cursos/curso')
        .then(res => res.json())
        .then(data => {
          const tbody = document.getElementById('tablaCursosBody');
          tbody.innerHTML = '';
          data.forEach(curso => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
              <td>${curso.nombre}</td>
              <td>${curso.descripcion}</td>
              <td>
                <button onclick="editarCurso(${curso.id})">Editar</button>
                <button onclick="eliminarCurso(${curso.id})">Eliminar</button>
              </td>
            `;
            tbody.appendChild(fila);
          });
        })
        .catch(err => console.error('Error cargando cursos:', err));
    }

    function guardarCurso(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombreCurso').value;
      const descripcion = document.getElementById('descripcionCurso').value;

      const curso = { nombre, descripcion };

      const url = editandoCursoId
        ? `http://localhost:3000/api/cursos/curso/${editandoCursoId}`
        : 'http://localhost:3000/api/cursos/curso';

      const method = editandoCursoId ? 'PUT' : 'POST';

      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso)
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al guardar curso');
          alert(editandoCursoId ? 'Curso actualizado con éxito' : 'Curso registrado con éxito');
          document.getElementById('formCurso').reset();
          editandoCursoId = null;
          cargarCursos();
          cambiarVista('tablaCursos');
        })
        .catch(err => {
          console.error(err);
          alert('Error al guardar curso');
        });
    }

    function editarCurso(id) {
      fetch(`http://localhost:3000/api/cursos/curso/${id}`)
        .then(res => res.json())
        .then(curso => {
          cambiarVista('cursos');
          document.getElementById('nombreCurso').value = curso.nombre;
          document.getElementById('descripcionCurso').value = curso.descripcion;
          editandoCursoId = id;
        })
        .catch(err => console.error('Error al cargar curso:', err));
    }

    function eliminarCurso(id) {
      if (confirm('¿Seguro que deseas eliminar este curso?')) {
        fetch(`http://localhost:3000/api/cursos/curso/${id}`, {
          method: 'DELETE'
        })
          .then(res => {
            if (!res.ok) throw new Error('Error al eliminar curso');
            alert('Curso eliminado con éxito');
            cargarCursos();
          })
          .catch(err => {
            console.error(err);
            alert('Error al eliminar curso');
          });
      }
    }

    function cargarCursosEnFormulario() {
      fetch('http://localhost:3000/api/cursos/curso')
        .then(res => res.json())
        .then(data => {
          const select = document.getElementById('cursoSelect');
          select.innerHTML = `<option disabled selected value="">Selecciona un curso</option>`;
          data.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id;
            option.textContent = curso.nombre;
            select.appendChild(option);
          });
        })
        .catch(err => console.error('Error cargando cursos en el formulario:', err));
    }

    function cambiarVista(id) {
      document.querySelectorAll('.vista').forEach(v => v.classList.add('oculto'));
      document.getElementById(id).classList.remove('oculto');

      if (id === 'tablaEstudiantes') {
        cargarEstudiantes();
      } else if (id === 'tablaCursos') {
        cargarCursos();
      } else if (id === 'estudiantes') {
        cargarCursosEnFormulario();
        document.getElementById('formEstudiante').reset();
        editandoEstudianteId = null;
      } else if (id === 'cursos') {
        document.getElementById('formCurso').reset();
        editandoCursoId = null;
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('formEstudiante').addEventListener('submit', guardarEstudiante);
      document.getElementById('formCurso').addEventListener('submit', guardarCurso);
      
      cambiarVista('inicio');
    });