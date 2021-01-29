const express = require('express')
const app = express()
const port = process.env.PORT;



app.listen(port, (error) => {
    if (error) throw error;
})

app.get('/', (req, res) => {
   
            res.send("hello this is only try");

        })

  
