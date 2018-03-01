/**
 * Definition of language.
 */
export interface LanguageDefinition {
  /**
   * Name of language.
   */
  name: string;
  /**
   * Short name of language.
   */
  name_short: string;
  /**
   * Description of language.
   */
  description: string;
  /**
   * Definition of operators.
   */
  ops: Operators;
}

export interface Operators {
  '+': string;
  '-': string;
  '<': string;
  '>': string;
  '.': string;
  ',': string;
  '[': string;
  ']': string;
}
