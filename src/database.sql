CREATE DATABASE tienda_portafolio;

CREATE TABLE articulos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL
);

CREATE TABLE venta_items (
    id SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id),
    id_producto INTEGER REFERENCES articulos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

INSERT INTO articulos (nombre, precio, stock) VALUES 
('Zapatillas Runner', 25990, 12),
('Jeans Regular', 12990, 8),
('Polera Básica', 5990, 25),
('Chaqueta Parka', 39990, 5),
('Gorro Invierno', 4990, 30),
('Calcetines Pack x3', 3990, 18),
('Mochila Urbana', 21990, 10),
('Polerón Hoodie', 18990, 7);

ALTER TABLE articulos ADD COLUMN url_imagen VARCHAR(500);

UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' WHERE nombre = 'Zapatillas Runner';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246' WHERE nombre = 'Jeans Regular';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' WHERE nombre = 'Polera Básica';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1544923246-77307dd654ca' WHERE nombre = 'Chaqueta Parka';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' WHERE nombre = 'Gorro Invierno';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2' WHERE nombre = 'Calcetines Pack x3';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' WHERE nombre = 'Mochila Urbana';
UPDATE articulos SET url_imagen = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7' WHERE nombre = 'Polerón Hoodie';

UPDATE articulos
SET url_imagen = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea' 
WHERE nombre = 'Chaqueta Parka';

UPDATE articulos 
SET url_imagen = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62' 
WHERE nombre = 'Mochila Urbana';

UPDATE articulos 
SET url_imagen = 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop' 
WHERE nombre = 'Gorro Invierno';

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    creado_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    id_articulo INTEGER REFERENCES articulos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 1,
    UNIQUE(id_usuario, id_articulo) 
);

ALTER TABLE ventas ADD COLUMN id_usuario INTEGER REFERENCES usuarios(id);

ALTER TABLE articulos ADD COLUMN usuario_id INTEGER REFERENCES usuarios(id);

UPDATE articulos SET usuario_id = 1 WHERE usuario_id IS NULL;

ALTER TABLE usuarios ADD CONSTRAINT unique_email UNIQUE (email);

UPDATE articulos 
SET url_imagen = 'https://images.unsplash.com/photo-1613151848917-80e67f421fff?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
WHERE nombre = 'Calcetines Pack x3';

UPDATE articulos
SET url_imagen = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400' 
WHERE nombre = 'Cámara Vintage';

SELECT * FROM articulos;