import { pb } from "../services/apiPocketbase";

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

export const validateNumberInput = (event) => {
  const input = event.target;
  console.log(input);
  if (input.value && isNaN(input.value)) {
    input.value = input.value.replace(/[^0-9]/g, "");
  }
};
