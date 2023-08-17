export const formatDate = (date: number) => new Date(date)
  .toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })