/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (process.env.NODE_ENV !== 'production') {
//   (global as any).$RefreshReg$ = () => {};
//   (global as any).$RefreshSig$ = () => () => {};
//   (globalThis as any).$RefreshReg$ = () => {};
//   (globalThis as any).$RefreshSig$ = () => () => {};
// }
