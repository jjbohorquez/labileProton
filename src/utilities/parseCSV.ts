/**
 * This function returns an array of arrays containing numbers from a CSV file.
 * @param data the CSV file as string.
 * @returns the spectra.
 */
export function parseCSV(data: string): number[][] {
  const lines = data.split('\n');
  return lines.map((line) => line.split(',').map(Number));
}
