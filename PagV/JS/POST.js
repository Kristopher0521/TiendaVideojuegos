// Agrega un evento al formulario para manejar el envío de datos
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Obtener los valores de los campos del formulario
  var idP = document.getElementById("IdV").value;
  var Nombre = document.getElementById("Nombre").value;
  var Precio = document.getElementById("Precio").value;

  // Crear un objeto de datos JSON que deseas enviar
  var data = {
    IdV: IdV,
    Nombre: Nombre,
    Precio: Precio
  };

  // Realizar la solicitud POST utilizando la API fetch
  fetch("https://localhost:44312/api/Videojuego", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud POST");
    }
  })
  .then(function (responseData) {
    // Manejar la respuesta de la API aquí
    console.log(responseData);

    // Limpiar los campos del formulario después de agregar
    document.getElementById("IdV").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("Precio").value = "";

    // Actualizar la tabla después de registrar un producto
    cargarTabla(); // Llama a la función cargarTabla desde tabla.js para actualizar la tabla
  })
  .catch(function (error) {
    // Manejar errores aquí
    console.error(error);
  });
});

// Abre el formulario modal al hacer clic en el botón
document.getElementById("openModalBtn").addEventListener("click", function() {
  document.getElementById("form-container").style.display = "block";
});

// Cierra el formulario modal al hacer clic en el botón de cierre
document.getElementById("closeModalBtn").addEventListener("click", function() {
  document.getElementById("form-container").style.display = "none";
});

// Agrega un evento al formulario de eliminación para manejar la eliminación de productos
document.getElementById("delete-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Obtener el ID del producto a eliminar
  var productId = document.getElementById("delete-IdV").value;

  // Realizar la solicitud DELETE utilizando la API fetch
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
    cargarTabla(); // Llama a la función cargarTabla desde tabla.js para actualizar la tabla

    // Muestra un mensaje de éxito
    showMessage("Se eliminó un videojuego correctamente.");
  })
  .catch(function (error) {
    // Manejar errores aquí
    console.error(error);
    showMessage("Hubo un error al eliminar el videojuego.", true);
  });
});
