import mongoose from 'mongoose';
import app from './app.js';
import "dotenv/config";

import { error } from "console";

const { DB_HOST, PORT = 3000 } = process.env; 

mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
  
// hGPSsOxecaJXWSZK - code