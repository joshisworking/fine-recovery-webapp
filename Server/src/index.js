const server = require('./server');

const PORT = 5000;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
