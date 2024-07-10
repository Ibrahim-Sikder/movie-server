import app from "./app";
import mongoose from "mongoose";
import config from "./config";

main().catch(err => console.log(err));

async function main() {
  try{
    await mongoose.connect(process.env.DATABASE_URL as string );
  app.listen(config.port, () => {
    console.log(`Apollow flix server is runnong on port ${config.port}`)
  })
  }catch(err){
    console.log(err)
  }
}

