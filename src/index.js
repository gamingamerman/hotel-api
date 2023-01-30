let express = require('express');
let path = require('path')
let app = express();
let port = process.env.PORT || 3000;
let data = require('../data/hotels.json');

//Middleware
app.use(express.json());

//GET / GET's
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
})

// (GET) Recoger los datos de los hoteles
app.get('/api/hoteles', (req, res) => {
    res.send(data)
})

app.get('/api/hoteles/:id_hotel', (req, res) => {
    let hotel = data.find(hotel => hotel.id == parseInt(req.params.id_hotel))

    // 404 si el hotel no existe
    if (!hotel) return res.status(404).send('El hotel que se intenta buscar no se encutentra');

    // Retorna el hotel con el id buscado
    res.send(hotel)
})

//POST
app.post('/api/hoteles', ( req, res) => {
    let hotel = req.body
    if (hotel.name && hotel.postal_code && hotel.address && hotel.n_clients) {
        hotel.id = data.length + 1
        data.push(hotel);
        res.status(200).json(hotel);
    } else {
        res.status(400).json("Error: " + res)
    }
})

//DELETE
app.delete('/api/hoteles/:id_hotel', (req, res) => {
    let id = req.params.id_hotel;
    let index = data.map(i => i.id).indexOf(parseInt(id));
    if ( index != 0) {
        res.status(200).json(data.splice(index,1)[0]);
    } else {
        res.status(400).json("Error: El hotel con el id " + id + " no existe.")
    }
})

//PUT
app.put('/api/hoteles/:id_hotel', (req, res) => {
    let id = req.params.id_hotel;
    let hotel = req.body;
    if (hotel.name && hotel.postal_code && hotel.address && hotel.n_clients) {
        let hotel_original = data.filter(i => i.id == id);
        if (hotel_original.length > 0 ) {
            hotel.id = id;
            hotel_original[0] = hotel;
            res.status(200).json(hotel);
        } else {
            res.status(404).json('Error: El id ' + id + ' no se ha encontrado para actualizar.')
        }
    } else {
        res.status(400).json('Error: Faltan parámetros obligatorios.')
    }
})

// Escuchando al puerto
app.listen(port, () => console.log(`Listening on Port ${port}...`))