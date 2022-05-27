const express = require("express");
const mongodb = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new mongodb.MongoClient(uri);
const databaseName = 'Humanz';
const collectionName = 'Users';

const csv = require('csv-parser');
const fs = require('fs');



const PORT = process.env.PORT || 3001;

const app = express();


const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



client.connect((err) => {
  if (err) {
    console.log('***Connection with mongodb failed ');
    console.log(err);
  } else console.log('***Connection with mongodb created');

  const db = client.db(databaseName);


  db.collection(collectionName).insertMany([{ id: 0 }], function () {
    if (db.listCollections({ name: collectionName }).hasNext()) {
      db.dropCollection(collectionName, function (err) {
        if (err) console.log(err);
      });

      db.createCollection(collectionName, function (err, res) {
        if (err) throw err;
      });
    }

  fs.createReadStream('users.csv')
  .pipe(csv())
  .on('data', (row) => {
    
    db.collection(collectionName).insertOne(row);
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  });
});



app.get("/api", (req, res) => {

  const db = client.db(databaseName);

  db.collection(collectionName)
        .find()
        .toArray(function(err,resulst){
          console.log(resulst);
          //res.json({resulst});
          res.json({ message: resulst});
        });
});

app.delete(`/delete/:id`, (req, res) => {
  const db = client.db(databaseName);
  db.collection(collectionName)
        .deleteOne({ID :req.params.id})
        .then(()=>{
          res.json({ message: 'ok'});
        });
});

app.post(`/add`, (req, res) => {
 
  const db = client.db(databaseName);

  db.collection(collectionName)
  .findOne({ ID: req.body.ID})
  .then((a)=>{
    if(a==null){
      db.collection(collectionName)
        .insertOne({  Name: req.body.Name, ID: req.body.ID, Phone: req.body.Phone, IP: req.body.IP})
        .then(()=>{
          res.json({ message: 'ok'});
        });
    }else{
      res.json({ message: 'eror'});
    }
  });
  

});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

