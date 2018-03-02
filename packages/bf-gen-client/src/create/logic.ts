import { LanguageDefinition } from '@uhyo/bf-gen-defs';

/**
 * Call the API to publish a new language.
 */
export async function publish(
  token: string,
  lang: LanguageDefinition,
): Promise<void> {
  const resp = await fetch('/new/publish', {
    body: JSON.stringify({
      lang,
    }),
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'same-origin',
  });
  if (resp.status === 401) {
    // Session expired. Redirect to the new page.
    location.href = '/new';
    return;
  }
  if (resp.ok) {
    // OK!
    const json = await resp.json();
    if (json.exists) {
      // 重複していた
      const ans = window.confirm(
        '既に同じ言語が存在します。その言語のページに移動してよろしいですか？',
      );
      if (!ans) {
        return;
      }
    }
    location.href = `/lang/${json.id}`;
    return;
  }
  // It's an error. Read text.
  console.error(resp.status);
  const text = await resp.text();
  alert(text);
}
