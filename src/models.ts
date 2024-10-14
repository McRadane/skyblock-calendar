import { createRenderEffect, createSignal } from 'solid-js';

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      modelYears: unknown;
    }
  }
}

export const modelYears = (el: HTMLInputElement, value: typeof createSignal) => {
  const [field, setField] = value();
  createRenderEffect(() => (el.value = String(field())));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  el.addEventListener('input', (e: any) => {
    const newValue = e?.target?.value ?? "2";

    setField(Number.parseInt(newValue));
  });
};
