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
/**
 * Definition of owner.
 */
export interface Owner {
  /**
   * Twitter ID.
   */
  id: string;
  /**
   * display name.
   */
  displayName: string;
  /**
   * Profile image.
   */
  profileImage: string;
}

/**
 * Definition of each operators.
 */
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

/**
 * Type of operators.
 */
export type Operator = keyof Operators;

/**
 * Interface of limits definition.
 */
export interface Limits {
  /**
   * Max length of language name.
   */
  name: number;
  /**
   * Max length of language description.
   */
  description: number;
  /**
   * Max length of op.
   */
  op: number;
}
