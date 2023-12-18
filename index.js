const server =  require("express");

const app = server()

app.get('/', (req, res) => res.send('Ruta inicial'))

app.listen(3000)
