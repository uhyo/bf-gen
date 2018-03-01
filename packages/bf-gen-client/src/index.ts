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
