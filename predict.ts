import { readFileSync } from 'fs';

import * as tf from '@tensorflow/tfjs-node';

import { model } from './setup.js';
import { parseCSV } from './utilities/parseCSV.js';
import { tensor3d } from '@tensorflow/tfjs-node';

const datum = tf.tensor3d(new Array(1024).fill(0), [1, 1024, 1]);

const dataPath = new URL(`../data/test_data.csv`, import.meta.url);
const data = readFileSync(dataPath, { encoding: 'utf8'});
const parsedData = parseCSV(data);

console.log(parsedData)

const flatArray = parsedData.slice(1, 11).flat();
const tensor = tensor3d(flatArray, [10, 1024, 1])

const prediction = model.predict(tensor) as tf.Tensor<tf.Rank>;
console.log(prediction.arraySync())
