const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-d5mked5actks73bu5vmg-a',
    user: 'renderdb_5tpn_user',
    password: 'SqT9rwuCKIAnf3c6hFOcrMLQm9GlUXtb',
    database: 'renderdb_5tpn'
  }
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res)=> { res.send('Success') })

//another method >see signin.js as well
app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })


app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
