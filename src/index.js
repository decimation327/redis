const express=require('express')
const axios=require('axios')
const responseTime=require('response-time')
const redis=require('redis')
const {promisify}=require('util')

 const client = redis.createClient
({
    host:'127.0.0.1',
    port:'6379'
})


const GET_ASYNC =promisify(client.get).bind(client)

const SET_ASYNC =promisify(client.set).bind(client)

const app=express()

app.use(responseTime());

app.get('/character',async (req,res)=>{


  try {
    

    
   const reply= await GET_ASYNC('characters')

   if(reply)
   return res.json(JSON.parse(reply));


    const response =await axios.get('https://rickandmortyapi.com/api/character');
   

  
    
     await SET_ASYNC('characters', JSON.stringify(reponse.data))
     res.json(response.data)
  } catch (error) {
    console.log(error)
  }
 
 
    })




  
    









app.listen(3000)

console.log('server on port 3000');