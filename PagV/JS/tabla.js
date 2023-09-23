// Variable global para mantener referencia a la tabla
const tableBody = document.getElementById("table-body");

// Función para cargar la tabla
function cargarTabla() {
  // URL de la API de productos
  const apiURL = "https://localhost:44312/api/Videojuego"; // Reemplaza esto con la URL real de tu API de productos

  // Realiza la solicitud a la API
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      // Borra el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Itera a través de los datos de la API y agrega filas a la tabla existente
      data.forEach(producto => {
        // Crea una nueva fila <tr>
        const fila = document.createElement("tr");

        const celdaIdV = document.createElement("td");
        celdaIdV.textContent = Videojuegos.IdV;
        fila.appendChild(celdaIdV);

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = Videojuegos.Nombre;
        fila.appendChild(celdaNombre);

        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = Videojuegos.Precio;
        fila.appendChild(celdaPrecio);

        // Agrega un botón para eliminar el producto (nueva modificación)
        const celdaEliminar = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("delete-button");
        botonEliminar.setAttribute("data-id", Videojuegos.IdV);
        celdaEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaEliminar);

        // Agrega la fila al cuerpo de la tabla
        tableBody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Hubo un error al obtener los datos de la API:", error);
    });
}

// Llama a la función para cargar la tabla al cargar la página
cargarTabla();

// Agrega un controlador de eventos para eliminar un producto
const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach(button => {
  button.addEventListener("click", function () {
    // Obtén el ID del producto desde el atributo data-id
    const VideojuegoId = this.getAttribute("data-id");

    // Realiza una solicitud DELETE para eliminar el producto de la base de datos
    // Utiliza el ID del Videojuego para identificar cuál eliminar
    fetch(`https://localhost:44312/api/Videojuego/eliminarV/${VideojuegoId}`, {
      method: "DELETE"
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud DELETE");
        }
      })
      .then(function () {
        // Después de eliminar el producto en la base de datos, actualiza la tabla
        cargarTabla(); // Llama a la función cargarTabla para actualizar la tabla
      })
      .catch(function (error) {
        // Manejar errores aquí
        console.error(error);
      });
  });
});



