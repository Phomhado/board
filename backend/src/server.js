const express = require('express');
const app = express();

app.use(express.json());

const taskRoutes = require('./routes/tasks');

app.use('/tasks', taskRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 API to-do rodando no localhost:${PORT}`);
});
