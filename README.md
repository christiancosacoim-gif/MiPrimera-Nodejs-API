# Mi primera API con Node.js

API REST sencilla para consultar y administrar notas. Está construida con Node.js y Express; los datos se guardan en el archivo `db.json`.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

```bash
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. El comando de desarrollo usa Nodemon para reiniciar el servidor al detectar cambios.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Mensaje de bienvenida. |
| `GET` | `/notes` | Devuelve todas las notas. |
| `GET` | `/notes/:id` | Devuelve la nota con ese identificador. |
| `POST` | `/notes` | Crea una nota. |
| `PUT` | `/notes/:id` | Actualiza los campos de una nota. |
| `DELETE` | `/notes/:id` | Elimina una nota. |

Las notas usan esta estructura:

```json
{
  "id": 1,
  "title": "Mi primera nota",
  "content": "Contenido de la nota"
}
```

### Ejemplos

Crear una nota:

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi primera nota","content":"Contenido de ejemplo"}'
```

Consultar todas las notas:

```bash
curl http://localhost:3000/notes
```

Actualizar una nota:

```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"content":"Contenido actualizado"}'
```

Eliminar una nota:

```bash
curl -X DELETE http://localhost:3000/notes/1
```

También puedes probar solicitudes desde un cliente HTTP usando `requests.http`.
