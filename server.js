import express from 'express';
import chalk from 'chalk';
import path from 'path';

import NameGenerator from './classes/NameGenerator.js'
import PredictionGenerator from './classes/PredictionGenerator.js';

const app = express();
const port = 3000;
const ng = new NameGenerator();
const pg = new PredictionGenerator();

app.use(express.static(path.join('./static')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/generateName', (_req, res) => {
    res.send(ng.generateName());
});

app.get('/getPrediction', (_req, res) => {
    res.send(pg.generatePrediction())
});

app.post('/reportPrediction', (req, res) => {
  const { prediction, name } = req.body; // Extract both prediction and name from req.body

  const label = prediction.label; // Retrieve the true label
  const predicted = prediction.prediction; // Retrieve the predicted label

  let status;
  if (label === "polluted" && predicted === "polluted") {
    status = "True Positive";
    console.log(chalk.green(`Prediction Name: ${name}, Status: ${status}`));
  } else if (label === "polluted" && predicted === "safe") {
    status = "False Negative";
    console.log(chalk.red(`Prediction Name: ${name}, Status: ${status}`));
  } else if (label === "safe" && predicted === "polluted") {
    status = "False Positive";
    console.log(chalk.yellow(`Prediction Name: ${name}, Status: ${status}`));
  } else {
    status = "True Negative";
    console.log(chalk.green(`Prediction Name: ${name}, Status: ${status}`));
  }

  res.send({ message: "Prediction reported successfully", status });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});