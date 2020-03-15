const iban = require('iban')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const validator = require("email-validator");
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server lauscht auf Port %s', server.address().port)    
})

class Bildungsgangfach{
    constructor(){
        this.Hardware        
    }
}

app.get('/',(req, res, next) => {   
    res.render('index.ejs', {                              
    })
})

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

const dbVerbindung = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.db
})

var kennung = config.kennung
console.log("Kennung " + kennung)

dbVerbindung.connect(function(fehler){
    dbVerbindung.query('CREATE table bildungsgangfach(fach VARCHAR(45), bildungsgang VARCHAR(45), hardwareausstattung VARCHAR(250), PRIMARY KEY(fach,bildungsgang));', function (fehler) {
        if (fehler) {
            if(fehler.code == "ER_TABLE_EXISTS_ERROR"){
                console.log("Tabelle bildungsgangfach existiert bereits und wird nicht angelegt.")
            }else{
                console.log("Fehler: " + fehler )
            }
        }else{
            console.log("Tabelle bildunsgangfach erfolgreich angelegt.")
        }
    })
})

app.get('/login',(req, res, next) => {         
    res.cookie('istAngemeldetAls', '')       
    res.render('login.ejs', {                    
    })
})

app.post('/',(req, res, next) => {       
    
    var änderung = false;
    
    if(req.body.losung == kennung){            
        console.log("Der Cookie wird gesetzt:")
        res.cookie('istAutorisiert', kennwort)
    }

    if(req.body.hardwareausstattung != bildungsgangfach.hardwareausstattung){
        bildungsgangfach.Hardwareausstattung = req.body.hardwareausstattung  
        änderung = true
        console.log("Änderung: Hardware: " + req.body.hardwareausstattung )
    }

    if(änderung){        
        if(req.cookies['istAutorisiert']){
            //todo: writetodb
        }else{
            res.render('login.ejs', {                    
            })
        }        
    }else{            
        console.log("Es ligt keine Änderung an.")       
    }
})

