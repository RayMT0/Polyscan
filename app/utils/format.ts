export function buildParams(paramsObj: Record<string, any>) {
  const searchParams = new URLSearchParams();

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

export function formatVolume(volume: number): string{
  if (volume >= 1_000_000_000) {
    return (volume / 1_000_000_000).toFixed(2) + 'B'
  }

  if (volume >= 1_000_000) {
    return (volume / 1_000_000).toFixed(2) + 'M'
  }

  if (volume >= 1_000) {
    return (volume / 1_000).toFixed(2) + 'K'
  }

  return volume.toFixed(2)
}

export function formatGameScore(score: string, team: number): string {
  const scores = score.split('|')[1] || ' '

  if(team === 1) return scores.split('-')[0] || ' '
  if(team === 2) return scores.split('-')[1] || ' '
  return score;
}