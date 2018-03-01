import { action, observable, computed } from 'mobx';
import { LanguageDefinition, Operator } from '@uhyo/bf-gen-defs';
import { operators } from '../bf/ops';

/**
 * Create a language store.
 */
export class Store {
  /**
   * Long name of language.
   */
  @observable protected long_name_inner: string = '';
  /**
   * Flag to auto-generate long name.
   */
  @observable protected long_name_auto: boolean = true;
  /**
   * short name of language.
   */
  @observable public short_name: string = '';
  /**
   * Descriptions of language.
   */
  @observable protected description_inner: string = '';
  @observable protected description_auto: boolean = true;
  /**
   * Def. of operators.
   */
  @observable
  public ops: Record<Operator, string> = {
    '+': '',
    '-': '',
    '<': '',
    '>': '',
    '.': '',
    ',': '',
    '[': '',
    ']': '',
  };
  /**
   * Computed long name.
   */
  @computed
  public get long_name() {
    if (this.long_name_auto) {
      if (!this.short_name) {
        return '';
      } else {
        return `最強のプログラミング言語「${this.short_name}」`;
      }
    } else {
      return this.long_name_inner;
    }
  }
  /**
   * Computed description.
   */
  @computed
  public get description() {
    if (this.description_auto) {
      if (!this.short_name) {
        return '';
      } else {
        return `プログラミング言語「${
          this.short_name
        }」は僕が考えた最強の言語です。`;
      }
    } else {
      return this.description_inner;
    }
  }
  /**
   * Language.
   */
  @computed
  public get language(): LanguageDefinition {
    return {
      name: this.long_name,
      name_short: this.short_name,
      description: this.description,
      ops: this.ops,
    };
  }
  /**
   * Update action.
   */
  @action
  public update(query: UpdateQuery): void {
    if (query.short_name != null) {
      this.short_name = query.short_name;
    }
    if (query.long_name != null) {
      this.long_name_inner = query.long_name;
      this.long_name_auto = false;
    }
    if (query.description != null) {
      this.description_inner = query.description;
      this.description_auto = false;
    }
    if (query.ops != null) {
      for (const op of operators) {
        const o = query.ops[op];
        if (o != null) {
          this.ops[op] = o;
        }
      }
    }
  }
}

export interface UpdateQuery {
  short_name?: string;
  long_name?: string;
  description?: string;
  ops?: { [P in Operator]?: string };
}
