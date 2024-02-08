import { Record } from './models/game';

// Sort records based on record numbers in ascending order
export function sortRecords(records: Record[]): Record[] {
  return [...records].sort((a, b) => a.record - b.record);
}

export function getPosition(
  records: Record[],
  number: number
): number {
  let index = 0;
  for (const record of records) {
    if (record.record >= number) {
      return index + 1;
    }
    index++;
  }
  // If no record with the specified number or higher exists, return the length of the array + 1
  return records.length + 1;
}