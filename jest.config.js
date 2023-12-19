module.exports = {
  // Directorios de búsqueda de pruebas
  roots: ["<rootDir>/"],

  // Extensión de archivos de pruebas
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js)$", // Cambia a .js

  // Módulos que deberían ser transformados
  transform: {
    "^.+\\.(jsx?|js)$": "babel-jest", // Cambia a babel-jest
  },

  // Extensiones de archivos permitidas
  moduleFileExtensions: ["js", "json", "jsx", "node"], // Elimina "ts" y "tsx"

  // Cobertura de código
  coverageReporters: ["json", "lcov", "text", "clover"],

  // Directorios que deben ignorarse
  coveragePathIgnorePatterns: ["/node_modules/"],

  // Configuración para mostrar resultados en la consola
  verbose: true,
};
