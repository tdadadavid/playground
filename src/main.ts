import app from "./app";

app.listen(3000, () => {
  console.log("Api up and running on port 3000");
});

/**
 * Handle all the stress I don't wanna handle!
 */
process.on('uncaughtException', (error: Error) => {
  console.log(error.message);
  process.exit(1);
});
process.on('unhandledRejection', (error: Error) => {
  console.log(error.message);
  process.exit(1);
});
