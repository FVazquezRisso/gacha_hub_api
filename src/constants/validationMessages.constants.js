module.exports = {
  // Mensajes generales
  IS_EMPTY: "Este campo no debe estar vacío",
  IS_STRING: "Este campo debe ser una cadena de texto",
  IS_INT: "Este campo debe ser un número entero",
  IS_FLOAT: "Este campo debe ser un número decimal",
  IS_BOOLEAN: "Este campo debe ser un valor booleano",
  IS_EMAIL: "Este campo debe ser una dirección de correo electrónico válida",
  IS_DATE: "Este campo debe ser una fecha válida",
  IS_URL: "Este campo debe ser una URL válida",
  IS_JSON: "Este campo debe ser una cadena JSON válida",
  IS_ARRAY: "Este campo debe ser un arreglo",
  IS_ALPHA: "Este campo debe contener solo letras",
  IS_ALPHANUMERIC: "Este campo debe contener solo letras y números",
  IS_HEX: "Este campo debe ser un valor hexadecimal",
  IS_IPV4: "Este campo debe ser una dirección IPv4 válida",
  IS_IPV6: "Este campo debe ser una dirección IPv6 válida",
  IS_UUID: "Este campo debe ser un UUID válido",
  IS_ENUM: "Este campo debe ser uno de los valores permitidos",

  // Mensajes para longitud
  IS_LENGTH_MIN: (min) => `Este campo debe tener al menos ${min} caracteres`,
  IS_LENGTH_MAX: (max) => `Este campo debe tener como máximo ${max} caracteres`,
  IS_LENGTH_RANGE: (min, max) =>
    `Este campo debe tener entre ${min} y ${max} caracteres`,

  // Mensajes para comparaciones
  IS_EQUAL_TO: (eq) => `Este campo debe ser igual a ${eq}`,
  IS_NOT_EQUAL_TO: (neq) => `Este campo no debe ser igual a ${neq}`,
  IS_GREATER_THAN: (gt) => `Este campo debe ser mayor que ${gt}`,
  IS_LESS_THAN: (lt) => `Este campo debe ser menor que ${lt}`,

  // Mensajes para validaciones de usuario
  IS_USERNAME:
    "El nombre de usuario sólo puede contener letras mayúsculas, letras minúsculas, números y guiones bajos",
  IS_PASSWORD:
    "La contraseña debe contener al menos una letra y un número",
};
