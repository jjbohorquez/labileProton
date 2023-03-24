import * as tf from '@tensorflow/tfjs-node';

export const rootFolder = new URL('../', import.meta.url);
export const srcFolder = new URL('.', import.meta.url);
export const modelFolder = new URL('../models/js/', import.meta.url);

export const model = await tf.loadGraphModel(
  new URL('model.json', modelFolder).href,
);
