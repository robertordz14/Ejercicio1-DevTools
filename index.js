const conexion = require('./conexion');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors =  require('cors');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/api', router);


const swaggerUi = require('swagger-ui-express');
const { request } = require('express');
swaggerDocument = require('./swager.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use((req, res, next) => {
    next();
})

router.route('/tutor').get((req, res) => {
    conexion.query("SELECT * FROM tutor", (err, result, fields) => {
        if(!err){
            res.json(result);
        }else{
            console.log(err);
        }
    });
});

router.route('/newTutor').post((req, res) => {
    conexion.query("INSERT INTO tutor SET ?", req.body, (err, result, fields) => {
        if(!err){
            res.json(result);
        }else{
            console.log(err);
        }
    }); 
});

router.route('/changeTutor/:id').put((req, res) => {
    const id = req.params.id;
    conexion.query("UPDATE tutor SET ? WHERE id = ?", [req.body, Number.parseInt(id)], (err, result, fields) => {
        if(!err){
            res.json(result);
        }else{
            console.log(err);
        }
    }); 
});

router.route('/deleteTutor/:id').delete((req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM tutor WHERE id = ?", Number.parseInt(id), (err, result, fields) => {
        if(!err){
            res.json(result);
        }else{
            console.log(err);
        }
    }); 
});


app.listen(
    PORT, 
    () => console.log(`Corriendo en:localhost:${PORT}`)
)

