import process from "process";

import { app } from "./server.js";

// Set up web app
const HOST = process.env.IP || "127.0.0.1";
const PORT = parseInt(process.env.PORT || "8800");

// start server
app.listen(PORT, HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
}
);