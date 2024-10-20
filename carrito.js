let carrito=JSON.parse(localStorage.getItem("carrito"))||{};function agregarProducto(o,r,t,e){if(o&&r&&t&&e){let a=parseFloat(t);isNaN(a)&&(a=0,console.warn(`Precio no válido para el producto ${r}. Se establece en 0.`)),carrito[o]?carrito[o].quantity++:carrito[o]={id:o,name:r,price:a,image:e,quantity:1},actualizarLocalStorage(),cargarCarrito()}else console.error("Datos del producto no válidos:",{id:o,name:r,price:t,image:e})}function eliminarProducto(a){carrito[a]&&(delete carrito[a],actualizarLocalStorage(),cargarCarrito())}function actualizarLocalStorage(){localStorage.setItem("carrito",JSON.stringify(carrito))}function decrementarCantidad(a){carrito[a]&&1<carrito[a].quantity?(carrito[a].quantity--,actualizarLocalStorage(),cargarCarrito()):carrito[a]&&1===carrito[a].quantity&&eliminarProducto(a)}function incrementarCantidad(a){carrito[a]&&(carrito[a].quantity++,actualizarLocalStorage(),cargarCarrito())}function cargarCarrito(){var a=document.getElementById("carrito");if(a)if(console.log("Contenido del carrito:",carrito),0===Object.keys(carrito).length)console.log("El carrito está vacío"),a.innerHTML="<p>El carrito está vacío</p>";else{let o="",r=0;for(var t in carrito){var e=carrito[t];if(console.log("Procesando producto:",e),e&&e.name&&e.image){let a=parseFloat(e.price);isNaN(a)&&(a=0,console.warn(`Precio no válido para el producto ${e.name}. Se establece en 0.`),e.price=0,carrito[t]=e),o+=`
                <div class="producto-carrito">
                    <img src="${e.image}" alt="${e.name}" class="imagen-producto" onerror="this.src='ruta/imagen/por/defecto.jpg'">
                    <div class="info-producto">
                        <h3>${e.name}</h3>
                        <p>Price: $${a.toFixed(2)}</p>
                        <div class="cantidad">
                            <button class="btn-cantidad" onclick="decrementarCantidad('${t}')">-</button>
                            <span class="cantidad-valor">${e.quantity}</span>
                            <button class="btn-cantidad" onclick="incrementarCantidad('${t}')"> +</button>
                        </div>
                        <button class="btn-eliminar" onclick="eliminarProducto('${t}')">Eliminar</button>
                    </div>
                </div>
            `,r+=a*e.quantity}}o+=`
        <div class="total-carrito">
            <h3>Total: $${r.toFixed(2)}</h3>
            <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
        </div>
    `,a.innerHTML=o}else console.error("El contenedor del carrito no se encontró")}function finalizarCompra(){var a=document.getElementById("nombre").value,o=document.getElementById("telefono").value,r=document.getElementById("email").value,t=document.getElementById("documento").value,e=document.getElementById("direccion").value,i=document.querySelector('input[name="metodo-pago"]:checked').value;a&&o&&r&&t&&e?(console.log("Datos de la compra:",{nombre:a,telefono:o,email:r,documento:t,direccion:e,metodoPago:i,carrito:carrito}),alert("¡Compra finalizada con éxito! Gracias por su compra."),carrito={},actualizarLocalStorage(),document.getElementById("formulario-comprador").reset(),document.getElementById("formulario-pago").reset(),cargarCarrito()):alert("Por favor, complete todos los campos del formulario.")}window.onload=cargarCarrito;