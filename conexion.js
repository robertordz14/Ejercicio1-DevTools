const mysql = require('mysql');

var conexion = mysql.createConnection({
    host: '192.168.64.2',        
    database: 'retoUno',  
    user: 'root',
    password: '',
    port: '3306'        
});
    
conexion.connect(function(error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexión exitosa");
    }
});    

module.exports = conexion;