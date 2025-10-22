import { app, logger } from "./app";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening on port: ${port}`);
});
