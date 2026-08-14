import app from "./src/app.js"
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";


const startServer = async () => {
  const PORT = config.PORT || 5000;

  connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startServer()