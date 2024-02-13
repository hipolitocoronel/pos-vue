export const formatMoney = (amount) => {
  // Se utiliza el objeto Intl.NumberFormat para formatear el número
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS", // Código de moneda para pesos argentinos
    minimumFractionDigits: 0, // Número mínimo de decimales
  });

  // Se utiliza toLocaleString para dar formato al número
  return formatter.format(amount);
};
