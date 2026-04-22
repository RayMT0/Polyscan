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

export function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
  const startOfDayAfter = new Date(startOfTomorrow)
  startOfDayAfter.setDate(startOfDayAfter.getDate() + 1)

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  if (date >= startOfToday && date < startOfTomorrow) {
    return `Today, ${timeStr}`
  } else if (date >= startOfTomorrow && date < startOfDayAfter) {
    return `Tomorrow, ${timeStr}`
  } else {
    const dateFormatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    return `${dateFormatted}, ${timeStr}`
  }
}