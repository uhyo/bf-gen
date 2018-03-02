import { LanguageDefinition, Limits, Owner } from '@uhyo/bf-gen-defs';

import { initApp } from './app';

/**
 * Init the language page view.
 */
export function init(obj: LanguageDefinition, owner: Owner): void {
  const apparea = document.getElementById('app');
  if (apparea == null) {
    return;
  }

  initApp(apparea, obj, owner);
}

/**
 * Initialize the creation page.
 */
export async function create(
  token: string,
  limits: Limits,
  owner: Owner,
): Promise<void> {
  const apparea = document.getElementById('app');
  if (apparea == null) {
    return;
  }

  const { initApp } = await import('./create');

  initApp(apparea, token, limits, owner);
}
