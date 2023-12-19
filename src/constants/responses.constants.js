module.exports = {
  // Éxito en una operación estándar.
  SUCCESS_200: { statusCode: 200, message: "Successful operation" },

  // Éxito al crear un recurso.
  SUCCESS_201: { statusCode: 201, message: "Resource created successfully" },

  // La solicitud se acepta para procesamiento futuro.
  SUCCESS_202: {
    statusCode: 202,
    message: "Request accepted, processing pending",
  },

  // Éxito, pero no se devuelve contenido.
  SUCCESS_204: { statusCode: 204, message: "No content" },

  // Recurso movido permanentemente.
  REDIRECT_301: { statusCode: 301, message: "Moved permanently" },

  // Recurso encontrado, redirección temporal.
  REDIRECT_302: { statusCode: 302, message: "Found" },

  // Solicitud malformada o con parámetros inválidos.
  ERROR_400: { statusCode: 400, message: "Bad request" },

  // Acceso no autorizado o falta de autenticación.
  ERROR_401: { statusCode: 401, message: "Unauthorized" },

  // El acceso está prohibido debido a permisos insuficientes.
  ERROR_403: { statusCode: 403, message: "Forbidden" },

  // El recurso solicitado no existe.
  ERROR_404: { statusCode: 404, message: "Resource not found" },

  // Método HTTP no permitido para el recurso.
  ERROR_405: { statusCode: 405, message: "Method not allowed" },

  // Conflicto, por ejemplo, al intentar crear un recurso que ya existe.
  ERROR_409: { statusCode: 409, message: "Conflict" },

  // Entidad no procesable debido a validación o reglas de negocio.
  ERROR_422: { statusCode: 422, message: "Unprocessable entity" },

  // Límite de velocidad de solicitudes excedido.
  ERROR_429: { statusCode: 429, message: "Too many requests" },

  // Error interno del servidor, falla inesperada.
  ERROR_500: { statusCode: 500, message: "Internal server error" },

  // Error en la puerta de enlace o servicio interno.
  ERROR_502: { statusCode: 502, message: "Bad gateway" },
};
