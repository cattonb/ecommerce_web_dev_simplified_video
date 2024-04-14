const CURRENCY_FORMATTER = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("en-GB").format(number);
}
