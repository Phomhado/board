declare module 'jest-bdd' {
  export function feature(description: string, callback: () => void): void;
  export function scenario(description: string, callback: () => void): void;
  export function given(description: string, callback: () => void): void;
  export function when(description: string, callback: () => void): void;
  export function then(description: string, callback: () => void): void;
}
