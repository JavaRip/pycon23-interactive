import fs from 'fs';

export default class PredictionGenerator {
    constructor() {
        this.usedPredictions = new Set();
        this.predictions = this._loadPredictions();
    }

    _loadPredictions() {
        const data = fs.readFileSync('predictions.csv', 'utf-8');
        const rows = data.split('\n').slice(1); // Skip header row
        const predictions = rows.map(row => row.split(',')).filter(row => row.length > 1); // Skip possibly empty last row
        return predictions;
    }

    predictionExists(prediction) {
        return this.usedPredictions.has(JSON.stringify(prediction));
    }

    generatePrediction() {
        if (this.predictions.length === this.usedPredictions.size) {
            throw new Error('No more unique predictions available');
        }

        let prediction;
        do {
            prediction = this.predictions[Math.floor(Math.random() * this.predictions.length)];
        } while (this.predictionExists(prediction));
        
        this.usedPredictions.add(JSON.stringify(prediction));
        
        return {
            division: prediction[0],
            district: prediction[1],
            upazila: prediction[2],
            union: prediction[3],
            mouza: prediction[4],
            depth: prediction[5],
            arsenic: prediction[6],
            prediction: prediction[7],
            label: prediction[8],
        };
    }
}
