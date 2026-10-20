// 1. Importación de modulos.
// Importamos express para la creacion del servidor y el enrutamiento
import express from 'express';
//Se importa el modulo nativo de Node.js para leer y escribir archivos
import fs from 'fs';
// Importamos body-parser, aunque en este codigo usamos express.json() directamente
import bodyParser from 'body-parser';

// 2. Iniciamos con la configuración de la aplicación
const app = express();
// Permitimos que nuestra API entienda y pueda procesar datos en formatos json
app.use(express.json());

// 3. Comenzamos con las funciones auxiliares para la base de datos (db.json)
// Función para leer los datos del archivo db.json
const readData = () => {
    try {
        // Lee el archivo de manera sincrónica
    const data = fs.readFileSync('db.json');
    // Convierte el texto JSON en un objeto de JavaScript y lo retorna
    return JSON.parse(data);
} catch (error) {
    // Si es que algun archivo n o existe o llegase haber un error en la lectura se muestra la consola
    console.error(error);
}
};

// Función para guardar los datos modificados en el archivo db.json
const writeData = (data) => {
    try {
        // Convierte el objeto de JavaScript y lo guarda en el archivo
    fs.writeFileSync('db.json', JSON.stringify(data));
    } catch (error) {
        // Muestra los errores si no se puede escribir en el archivo
      console.error(error);
    }
};

// 4. Comenzamos con la definición de rutas
// Ruta raiz o inicio, verifica que el servidor este respondiendo correctamente
app.get('/', (req, res) => {
    res.send('Hola Bienvenidos a mi primera api con Nodejs!');
});

// GET/notes, obtiene y devuelve el listado completo
app.get('/notes', (req, res) => {
    const data = readData(); // Leemos el JSON actual
    res.json(data.notes); // Responde al cliente con el arreglo de notas
});

// GET/notes/:id, obtiene y devuelve una nota específica según su id
app.get('/notes/:id', (req, res) => {
    const data = readData();
    // Se convierte el parametro  en id de texto a numero entero para poder comparalo
    const id = parseInt(req.params.id);
    // Se busca dentro de la lista la nota que coincida exactamente con el id recibido
    const note = data.notes.find((note) => note.id === id);
    res.json(note); // Se devuelve la nota encontrada
});

// POST/notes, crea una nueva nota y la almacena
app.post('/notes', (req, res) => {
    const data = readData();
    const body = req.body; // Se captura la información enviada en el cuwrpo de la request
    const newNote = {
        id: data.notes.length + 1,
        ...body // Copia todas las propiedades recibidas
    };
    data.notes.push(newNote); //se agrega una nueva nota al array actual
    writeData(data);          // Se guardan los cambios en el archivo db.json
    res.json(newNote);        // Se responde confirmando la nota creada
});

// PUT/notes/:id, actualiza una nota existente según su id
app.put('/notes/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const body = req.body;
    // Busca la posición de la nota dentro del arreglo
    const noteIndex = data.notes.findIndex((note) => note.id === id);
    // Se reemplazan los datos antiguos fusionandolos con los nuevos
    data.notes[noteIndex] = {
      ...data.notes[noteIndex],
      ...body,
    };
    writeData(data); // Se guarda la actualización de la lista en db.json
    res.json({ message: 'Note updated successfully' }); // Se responde con un mensaje de exito 
});

// DELETE/notes/:id, elimina una nota según su id
app.delete('/notes/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    // Busca el indice de la nota a que se quiere eliminar
    const noteIndex = data.notes.findIndex((note) => note.id === id);
    // Este metodo elimina 1 elemento de la posición especificada por noteIndex
    data.notes.splice(noteIndex, 1);
    writeData(data);            // Se guarda la base de datos actualizada sin la nota eliminada
    res.json({ message: 'Note deleted successfully' }); // Se responde con un mensaje de exito
});
// 5. Iniciamos el servidor en el puerto 3000 para que pueda recibir peticiones HTTP
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});