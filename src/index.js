let express = require('express');
let path = require('path')
let app = express();
let port = process.env.PORT || 3000;
let data = require('../data/hotels.json');

app.use(express.json());

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


// Escuchando al puerto
app.listen(port, () => console.log(`Listening on Port ${port}...`))