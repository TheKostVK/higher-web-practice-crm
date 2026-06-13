import '@testing-library/jest-dom/vitest';

const getComputedStyle = window.getComputedStyle;

window.getComputedStyle = (element: Element) => getComputedStyle(element);

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
