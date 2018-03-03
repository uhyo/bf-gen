import { action, observable, computed } from 'mobx';
import { LanguageDefinition, Operator, Limits } from '@uhyo/bf-gen-defs';
import { operators } from '../bf/ops';

/**
 * Create a language store.
 */
export class Store {
  /**
   * Provided limits of user input.
   */
  protected limits: Limits;
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
  constructor(limits: Limits) {
    this.limits = limits;
  }

  /**
   * Computed long name.
   */
  @computed
  public get long_name() {
    if (this.long_name_auto) {
      if (!this.short_name) {
        return '';
      } else {
        const v = `最強のプログラミング言語「${this.short_name}」`;
        if (v.length <= this.limits.name) {
          return v;
        } else {
          return this.short_name;
        }
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
        const v = `プログラミング言語「${
          this.short_name
        }」は僕が考えた最強の言語です。`;
        if (v.length <= this.limits.description) {
          return v;
        } else {
          return '';
        }
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
   * Validation of ops.
   */
  @computed
  public get opValidation(): boolean {
    // 一方が他方のprefixになっていたらだめ
    for (const left of operators) {
      for (const right of operators) {
        if (left === right) {
          continue;
        }
        const leftstr = this.ops[left];
        const rightstr = this.ops[right];
        if (leftstr && rightstr && leftstr.indexOf(rightstr) === 0) {
          return false;
        }
      }
    }
    return true;
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
      const next = {
        ...this.ops,
      };
      for (const op of operators) {
        const o = query.ops[op];
        if (o != null) {
          next[op] = o;
        }
      }
      this.ops = next;
    }
  }
}

export interface UpdateQuery {
  short_name?: string;
  long_name?: string;
  description?: string;
  ops?: { [P in Operator]?: string };
}
