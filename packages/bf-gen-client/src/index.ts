import { LanguageDefinition } from '@uhyo/bf-gen-defs';

import { initApp } from './app';

/**
 * Init the language page view.
 */
export function init(obj: LanguageDefinition): void {
  const apparea = document.getElementById('app');
  if (apparea == null) {
    return;
  }

  initApp(apparea, obj);
}

/**
 * Initialize the creation page.
 */
export async function create(): Promise<void> {
  const apparea = document.getElementById('app');
  if (apparea == null) {
    return;
  }

  const { initApp } = await import('./create');

  initApp(apparea);
}
