export function formatMoney(amountCents: number): string {
  const amount = amountCents / 100;
  const sign = amount < 0 ? '-' : '';

  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}