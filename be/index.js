const app = require("../be/app");
const { PORT } = require("../be/utils/config");

app.listen(PORT, () => {
  console.log("Server is open");
});
