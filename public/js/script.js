let carrito = [];
const clp = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
});

// Catálogo
const cargarProductos = async () => {
    const contenedor = document.getElementById('productos');
    try {
        const r = await fetch('http://localhost:4000/api/articulos');
        const data = await r.json();

        contenedor.innerHTML = data.map(p => {
            const sinStock = p.stock <= 0;
            const btnTexto = sinStock ? 'Agotado' : 'Agregar';
            const btnClase = sinStock ? 'btn-add agotado' : 'btn-add';
            const btnAtributo = sinStock ? 'disabled' : `onclick="agregar(${p.id}, '${p.nombre}', ${p.precio})"`;

            return `
                <div class="card ${sinStock ? 'card-sin-stock' : ''}">
                    <img src="${p.url_imagen || 'https://picsum.photos/200/150'}" alt="${p.nombre}" style="${sinStock ? 'filter: grayscale(1);' : ''}">
                    <h4>${p.nombre}</h4>
                    <p style="color: #27ae60; font-weight: bold;">${clp.format(p.precio)}</p>
                    <p><small>Disponibles: ${p.stock}</small></p>
                    <button class="${btnClase}" ${btnAtributo}>${btnTexto}</button>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error("Error al cargar productos:", e);
        contenedor.innerHTML = "<p>Error al conectar con el servidor.</p>";
    }
};

// Carrito
const agregar = (id, nombre, precio) => {
    const existe = carrito.find(item => item.id_articulo === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id_articulo: id, nombre, precio, cantidad: 1 });
    }
    renderCarrito();
    mostrarToast(`${nombre} añadido al carrito`);
};

const renderCarrito = () => {
    const div = document.getElementById('items-carrito');
    const total = carrito.reduce((acc, cur) => acc + (cur.precio * cur.cantidad), 0);
    div.innerHTML = carrito.map(i => `<div style="display: flex; justify-content: space-between; font-size: 0.9em;"><span>${i.nombre} x${i.cantidad}</span><span>${clp.format(i.precio * i.cantidad)}</span></div>`).join('');
    document.getElementById('totales').innerHTML = `<strong>Total: ${clp.format(total)}</strong>`;
};

// Autenticación
const ejecutarLogin = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        const r = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await r.json();
        if (r.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            mostrarToast(`¡Bienvenido/a, ${data.usuario.nombre}!`);
            actualizarInterfazAuth();
        } else { mostrarToast(data.error, 'error'); }
    } catch (e) { mostrarToast("Error de conexión", 'error'); }
};

const actualizarInterfazAuth = () => {
    const user = JSON.parse(localStorage.getItem('usuario'));
    document.getElementById('login-form').style.display = user ? 'none' : 'block';
    document.getElementById('user-logged').style.display = user ? 'block' : 'none';
    if(user) {
        document.getElementById('user-name').innerText = `Hola, ${user.nombre}`;
        cargarHistorial();
    }
};

const logout = () => { localStorage.clear(); location.reload(); };

// Comprar
const comprar = async () => {
    if (carrito.length === 0) return mostrarToast("El carrito está vacío", 'error');
    const token = localStorage.getItem('token');
    if (!token) return mostrarToast("Debes iniciar sesión", 'error');

    try {
        const r = await fetch('http://localhost:4000/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ items: carrito })
        });
        const res = await r.json();
        if (r.ok) {
            mostrarToast(`¡Venta Exitosa! Orden #${res.id_venta}`, 'success');
            carrito = [];
            renderCarrito();
            cargarProductos();
            cargarHistorial();
        } else { mostrarToast(res.error, 'error'); }
    } catch (e) { mostrarToast("Error en la compra", 'error'); }
};

// Historial
const cargarHistorial = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const r = await fetch('http://localhost:4000/api/ventas/usuario', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const ventas = await r.json();
        const contenedor = document.getElementById('historial');
        
        if (!ventas || ventas.length === 0) {
            contenedor.innerHTML = "<div class='mensaje-vacio'>Aún no tienes compras registradas.</div>";
            return;
        }

        contenedor.innerHTML = `
            <table class="tabla-historial">
                <thead>
                    <tr><th>Pedido #</th><th>Fecha</th><th style="text-align: right;">Total</th></tr>
                </thead>
                <tbody>
                    ${ventas.map(v => `
                        <tr>
                            <td>#${v.id}</td>
                            <td>${new Date(v.fecha).toLocaleDateString('es-CL')}</td>
                            <td class="monto-total">${clp.format(v.total)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`;
    } catch (e) { console.error("Error cargando historial", e); }
};

const mostrarToast = (mensaje, tipo = 'success') => {
    const container = document.getElementById('toast-container');
    if(!container) return; 
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `<span>${tipo === 'success' ? '✅' : '❌'}</span> <span>${mensaje}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
};

window.onload = () => { cargarProductos(); actualizarInterfazAuth(); };
