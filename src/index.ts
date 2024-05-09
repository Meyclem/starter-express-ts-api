import dotenv from "dotenv";
import server from "./server.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🤖 Server is running on http://localhost:${PORT}`);
});
