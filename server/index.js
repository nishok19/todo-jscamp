const app = require("./app");
const { PORT } = require("./config/env.config");

app.listen(PORT, () => console.log(`Server is running in the port - ${PORT}`));
