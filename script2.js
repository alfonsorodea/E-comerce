function irAlCarrito() {
    window.location.href = 'carrito.html';
}

function toggleCarrito() {
    const carrito = document.getElementById('carritoContainer');
    const container = document.querySelector('.container');

    if (carrito.style.left === '0px') {
        carrito.style.left = '-400px'; // Oculta el carrito
        container.style.marginLeft = '0';
    } else {
        carrito.style.left = '0px'; // Muestra el carrito
        container.style.marginLeft = '400px';
    }
}

function agregarAlCarrito(producto, precio) {
    const tabla = document.getElementById('tablaProductos');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${producto}</td>
        <td>$${precio.toFixed(2)}</td>
        <td><button onclick="eliminarProducto(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function eliminarProducto(boton) {
    const fila = boton.parentNode.parentNode;
    fila.remove();
}

$(document).ready(function () {
    const carritoTable = $('#carritoTable').DataTable();

    $('#searchBar').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase();
        $('.product').each(function () {
            const productText = $(this).text().toLowerCase();
            $(this).toggle(productText.includes(searchTerm));
        });
    });

    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoTable.clear();
        carrito.forEach((item, index) => {
            carritoTable.row.add([
                item.nombre,
                `$${item.precio}`,
                `<button onclick="eliminarDelCarrito(${index})">Eliminar</button>`
            ]).draw();
        });
    }

    window.agregarAlCarrito = function (nombre, precio) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push({ nombre, precio });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`El producto "${nombre}" ha sido agregado al carrito.`);
        cargarCarrito();
    };

    window.eliminarDelCarrito = function (index) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto eliminado del carrito.');
        cargarCarrito();
    };

    cargarCarrito();
});
