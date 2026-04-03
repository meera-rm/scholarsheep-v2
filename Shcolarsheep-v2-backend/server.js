require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`ScholarSheep v2 API running on port ${PORT}`);
});
