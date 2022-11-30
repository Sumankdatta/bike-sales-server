const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f1hhq8d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const categoriesCollection = client.db('bikeSales').collection('categories')
    const productCollection = client.db('bikeSales').collection('salesCollection')
    const bookingsCollection = client.db('bikeSales').collection('bookings')
    const userCollection = client.db('bikeSales').collection('users')

    app.get('/categories',async(req,res)=>{

      const query={}
      const category=await categoriesCollection.find(query).toArray();
      res.send(category)
    })

    app.get('/category/:id',async(req,res)=>{
      const id=req.params.id;
      const query={category_id:id}
      const result=await productCollection.find(query).toArray();
      res.send(result)
     
    })

    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      console.log(email)
      const query = { email: email }
      const booking = await bookingsCollection.find(query).toArray();
      res.send(booking)
  })

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      console.log(booking)

      const result = await bookingsCollection.insertOne(booking);
            res.send(result)
        })
  }
  finally {

  }
}
run().catch(console.log)

app.get('/', async (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => {
  console.log(`bike sales running on port ${port}`)
})