
const {MongoClient} = require("mongodb");
const express = require("express");
const server = require("express")();
const path = require("path");
const colors = require("colors");
const cors = require("cors");


//union de react con express
server.use(express.static(path.resolve("./build")));
server.get("/",(req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});

server.use(express.json());//para leer json
server.use(cors());//permite todas la conecciones conecciones

 //ruta pagina Home
server.get("/home", (req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});
server.post("/home",(req,res)=>{
    console.log(req.body);
});

//ruta pagina admin
server.get("/adminProy", (req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});

 //ruta pagina login
 server.get("/login", (req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});

server.post("/login",(req,res)=>{
    console.log(req.body);
});


 //ruta pagina logup
 server.get("/logup", (req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});

server.post("/logup",(req,res)=>{
    console.log(req.body);
});

 //ruta pagina inicio
 server.get("/inicio", (req,res)=>{
    res.sendFile(path.resolve("./build/index.html"));
});

//conectar la base de datos de kongodb con el servidor
const connection = new MongoClient("mongodb://localhost:27017");

async function iniciarDB(){
    try {
        let user= {
            nombre: "Sandra",
            apellido: "Diaz",
        };
    
        await connection.connect();
    //insertando un usuario 
       await connection.db("icetex").collection("user").insertOne(user);
    } catch(e){
        console.log(e);
    }

}
iniciarDB();

//Empleando una API(servidor) para que devuelva todos los usuarios que hay en la base de datos
//consulta de usuarios
server.get("/user",async (req,res)=>{
    let resultado = await connection.db("icetex").collection("user").find({}).toArray();
    res.send(JSON.stringify({resultado: resultado}));
}); 

//ruta para productos
server.get("/productos", (req,res)=>{
    res.sendFile(path.resolve("./productos.html"));
})

//ruta para post, guarda la informacion que se envia por formualario en la base de datos
server.post("/productos", async (req,res)=>{
    let result = await connection.db("icetex").collection("productos").insertOne(req.body);
    res.send("Se guardo el producto");  
});





//servidor escuche por el puerto
server.listen(3000,()=>{
    console.log(`Server inicializado on port:${"3000".green}`);
});
