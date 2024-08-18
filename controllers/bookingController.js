const bookingModel = require('../models/bookingModel');

function home(req, res) {
    res.render('index');
}

async function book(req, res) {
    const data = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        hora: req.body.hora
    };

    try{
        await bookingModel.bookAppointment(data);
        res.render('booking', { succes: true });
    } catch (err) {
        res.render('booking', { succes: false });
    }
}

module.exports = { home, book };