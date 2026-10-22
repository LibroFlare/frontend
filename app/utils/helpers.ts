export const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`

  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(2)} KB`

  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(2)} MB`

  const gb = mb / 1024
  return `${gb.toFixed(2)} GB`
}

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const hoursStr = hours.toString().padStart(2, '0')
  const minutesStr = minutes.toString().padStart(2, '0')
  const secsStr = secs.toString().padStart(2, '0')

  return `${hoursStr}:${minutesStr}:${secsStr}`
}

export const isNumeric = (str: string) => !isNaN(Number(str))
