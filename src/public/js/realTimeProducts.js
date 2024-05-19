const socket = io();

socket.on('productosActualizados', (productos) => {
    actualizarListaProductos(productos);
});


function actualizarListaProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');

    listaProductos.innerHTML = '';


    productos.forEach((producto) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - ${producto.precio}`;
        listaProductos.appendChild(listItem);
    });
}
