import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Adiciona os matchers do testing-library ao Vitest
expect.extend(matchers);

// Limpa após cada teste
afterEach(() => {
  cleanup();
});