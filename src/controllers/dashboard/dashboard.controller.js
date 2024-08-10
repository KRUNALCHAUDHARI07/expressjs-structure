const { path } = require("../../configs/constants");

const dashboard = async (req, res) => {
  res.sendFile(path.join(__dirname, "../../view/dashboard", "dashboard.html"));
};
module.exports = { dashboard };
