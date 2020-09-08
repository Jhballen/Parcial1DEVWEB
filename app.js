const express = require ('express');
const appServer = express();

//Por: Jhon Jairo Ballen Agudelo COD: 1810010725 
//     Valentina Calderon Barrera COD: 1810010945



let games = [];

appServer.listen(3000, ()=> {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

appServer.use(express.json());
const myGame = require ('./game');

//Crear nuevo videojuego no ingresar nombres repetidos, ni id repetidas.
appServer.post('/addGame',
        (req,res) => {

            const newGame = req.body;
            let añadir = games.push(newGame);
            res.send('POST GAME ADDED');
        });

//eliminar el videojuego por el id enviado como parametro
appServer.delete('/deleteGame/:idGame', 
        (req,res)=> {
            var idGame = req.params.idGame;
            games.forEach(function(elemento,indice,games) {
                if (parseInt(idGame,10) == games[indice]["idGame"]) {
                    games.splice(indice,1);
                    console.log("Videojuego eliminado");
                }
            })
            res.send('Game eliminado');
        });

//Mostar todos los videojuegos
appServer.get('/getGames',
        (req,res) => {

            res.json(games);
            games.forEach(function(elemento, indice, games) {
            console.log(elemento,indice);
            });
});

//Traer un videojuego por id enviado como parametro
appServer.get('/getGameId/:idGame',
        (req,res) => {

            var idGame = req.params.idGame;
            games.forEach(function(elemento,indice,games){
                if(parseInt(idGame,10) == games[indice]["idGame"]) {
                    console.log("El juego con el id: " + (indice+1) + " es:");
                    res.json(games[indice]);
                }
            })
        });

//Traer un videojuego por nombre enviado como parametro
appServer.get('/getGame/:titulo',
    (req, res)=>{
        var titulo =req.params.titulo;
        games.forEach(function(elemento, indice, games){
            if(titulo == games[indice]["titulo"]){
                console.log(elemento, indice)
                res.json(games[indice]);
            }
        })
    }
);

//Traer todos los videojuegos menosres a un año de lanzamiento enviado como parametro
appServer.get('/getgamemenor/:ano',
        (req,res)=> {
                let gameAño = [];
                var ano = req.params.ano;
                games.forEach(function(elemento,indice,games){
                    if(parseInt(ano,10) > games[indice]["año_lanzamiento"]){
                        let añadir = gameAño.push(games[indice]);
                        console.log("juego menor que" + ano);
                        console.log(elemento, indice);
                    }
                })
        res.json(gameAño);

        });