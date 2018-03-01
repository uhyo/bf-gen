import { LanguageDefinition } from '@uhyo/bf-gen-defs';
import { BFInterpreter, RunResult, InputSource } from './interpreter';

/**
 * Run a given language with given source code.
 */
export async function* run(
  language: LanguageDefinition,
  source: InputSource,
  code: string,
): AsyncIterableIterator<number> {
  const ipt = new BFInterpreter(language.ops, source);

  yield* ipt.run(code);
}
