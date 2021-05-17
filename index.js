const conexion = require('./conexion');
const cors =  require('cors');
const PORT = process.env.PORT || 3000;
const express = require ('express'), 
      bodyParser = require ('body-parser'), 
      jwt = require ('jsonwebtoken'), 
      config = require('./configs/config');
      app = express ();
const router = express.Router();


  

// 1
app.set('llave', config.llave);
// 2 
app.use (bodyParser.urlencoded ({extended: true}));
// 3 
app.use (bodyParser.json ());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
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

///////////////RETO 3///////////////////

app.get ('/', function (req, res) { 
    res.send ('Inicio'); 
});

app.post ('/autenticar', (req, res) => { 
    if (req.body.usuario === "roberto" && req.body.contrasena === "holamundo") { 
  const payload = { 
   check: true 
  }; 
  const token = jwt.sign (payload, app.get ('llave'), { 
   expiresIn: 1440 
  }); 
  res.json ({ 
   mensaje: 'Autenticación correcta', 
   token: token 
  }); 
    } else { 
        res .json ({mensaje: "Usuario o contraseña incorrecta"}) 
    } 
})


const rutasProtegidas = express.Router (); 
rutasProtegidas.use ((req, res, next) => { 
    const token = req.headers ['access-token']; 
 
    if (token) { 
      jwt.verify (token, app.get ('llave'), (err , decoded) => {       
        if (err) { 
          return res.json ({mensaje: 'Token inválida'});     
        } else { 
          req.decoded = decoded;     
          next (); 
        } 
      }); 
    } else { 
      res.send ( { 
          mensaje: 'Token no proveída.' 
      }); 
    } 
});


app.get('/datos', rutasProtegidas, (req, res) => {
    const datos = [
     { id: 1, nombre: "roberto" },
     { id: 2, nombre: "joy" },
     { id: 3, nombre: "ivan" },
     { id: 3, nombre: "jose" }

    ];
    
    res.json(datos);
   });

///////////////RETO 2///////////////////

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

