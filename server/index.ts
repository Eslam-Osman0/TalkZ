import app from "./src/app";
import { prisma } from "./src/config/prisma";
import { createServer } from "http";

const PORT = process.env.PORT || 3030;
const httpServer = createServer(app);

prisma.$connect().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
