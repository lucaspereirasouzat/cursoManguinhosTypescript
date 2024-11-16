import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Mapeia @ para src
      '@/tests': path.resolve(__dirname, './tests') // Mapeia @/tests para tests
    }
  },
  test: {
    coverage: {
      exclude: ['node_modules', 'tests',"src/main/*", '**/index.ts'],
      include: ['src/**/*.ts'],
    },
    clearMocks: true, // Limpa mocks entre os testes
    globals: true, // Permite utilizar funções globais como `describe`, `it`
    environment: 'node', // Configuração do ambiente de teste (pode ser jsdom para apps web)
  
    alias: {
      '@': path.resolve(__dirname, './src'), // Mapeia @ para src
      '@/tests': path.resolve(__dirname, './tests') // Mapeia @/tests para tests
    }
    // Configurações do Vitest, se necessário
  }
});
