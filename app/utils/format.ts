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

export function formatMoney(input: number | string): string{

  const money = Number(input)
  if (money >= 1_000_000_000) {
    return (money / 1_000_000_000).toFixed(2) + 'B'
  }

  if (money >= 1_000_000) {
    return (money / 1_000_000).toFixed(2) + 'M'
  }

  if (money >= 1_000) {
    return (money / 1_000).toFixed(2) + 'K'
  }

  return money.toFixed(2)
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

export function formatInputMoney(num: number, minFrac?: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: minFrac ?? 0,
    maximumFractionDigits: 2
  }).format(num)
}

export function parseNumber(str: string): number {
  return Number(str.replace(/[^\d.]/g,''))
}