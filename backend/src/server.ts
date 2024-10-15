import app from "./services/expressApp.services";
import dbConnection from "./services/dbConnection.services";
import env from "./utils/validateEnv";

const port = env.PORT;

// Connect to MongoDB
dbConnection();

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});