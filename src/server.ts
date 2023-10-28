import app from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
