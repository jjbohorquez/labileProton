import { readFileSync } from 'fs';

import * as tf from '@tensorflow/tfjs-node';

import { model } from './setup.js';
import { parseCSV } from './utilities/parseCSV.js';

const dataPath = new URL(`../data/test_data.csv`, import.meta.url);
const data = readFileSync(dataPath, { encoding: 'utf8' });
const parsedData = parseCSV(data);

console.log({ i: predictLability(parsedData[2]) })

export function predictLability(
  spectrum: number[],
  options: { length?: number } = {},
) {
  const { length = 1024 } = options;
  if (spectrum.length !== 1024) {
    throw new Error(
      `The spectrum must be of ${length} bug got ${spectrum.length}`,
    );
  }
  if (spectrum.some((point) => isNaN(point))) {
    throw new Error(`There are some points NaN`);
  }
  const tensor = tf.tensor3d(spectrum, [1, 1024, 1]);
  const prediction = model.predict(tensor) as tf.Tensor<tf.Rank>;
  return prediction.arraySync()[0];
}
