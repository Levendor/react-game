export function another(value: number) {
  return (value + 1) % 2;
}

export function compare(first: number, second: number, type: string): number {
  if (type === 'ascending') return first - second;
  else if (type === 'descending') return second - first;
  else if (type === 'random') return Math.random() - 0.5;
  return 0;
}