import app from "./src/app";
import { prisma } from "./src/config/prisma";

const PORT = process.env.PORT || 3030;

prisma.$connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  })
});
