const { server } = require('./app');
const config = require('./config/env');

const PORT = config.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
