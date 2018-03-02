import * as React from 'react';
import styled from 'styled-components';
import { bind } from 'bind-decorator';

import { LanguageDefinition, Operator } from '@uhyo/bf-gen-defs';
import { withProps } from '../util/styled';
import { run } from '../bf';

import { bfSamples } from './samples';

export interface IPropInterpreter {
  language: LanguageDefinition;
}
export interface IStateInterpreter {
  /**
   * Whether interpreter is running.
   */
  running: boolean;
  /**
   * Whether waiting on input.
   */
  waiting: boolean;
  /**
   * Whether result is open.
   */
  result: boolean;
  /**
   * Whether the output is erroneous.
   */
  error: boolean;
  /**
   * Output of interpreter.
   */
  output: string;
}
/**
 * Component of BF interpreter.
 */
export class Interpreter extends React.PureComponent<
  IPropInterpreter,
  IStateInterpreter
> {
  constructor(props: IPropInterpreter) {
    super(props);
    this.state = {
      running: false,
      waiting: false,
      result: false,
      error: false,
      output: '',
    };
  }
  /**
   * Ref to code area.
   */
  protected textarea: HTMLTextAreaElement | null = null;
  /**
   * Ref to input area.
   */
  protected input: HTMLInputElement | null = null;
  /**
   * Function to call when user input comes.
   */
  protected inputCallback: ((str: string) => void) | null = null;
  public render() {
    const { running, waiting, error, output, result } = this.state;
    return (
      <div>
        <p>
          サンプル：
          <select onChange={this.handleSampleChange}>
            <option>----</option>
            {bfSamples.map(({ name }, i) => (
              <option key={name} value={String(i)}>
                {name}
              </option>
            ))}
          </select>
        </p>
        <CodeArea innerRef={e => (this.textarea = e)} />
        <RunButton type="button" onClick={this.handleClick} disabled={running}>
          実行
        </RunButton>
        {result ? (
          <ResultWrapper>
            <div>{running ? '実行中' : '実行結果'}</div>
            <ResultArea error={error} onClick={this.handleResultClick}>
              {output}
              {waiting ? (
                <ConsoleInput
                  innerRef={e => (this.input = e)}
                  onChange={this.handleInput}
                  onKeyDown={this.handleKeyDown}
                />
              ) : null}
            </ResultArea>
          </ResultWrapper>
        ) : null}
      </div>
    );
  }
  public componentDidUpdate(_: IPropInterpreter, prevState: IStateInterpreter) {
    // if input is opened...
    if (!prevState.waiting && this.state.waiting && this.input != null) {
      this.input.focus();
    }
  }
  @bind
  protected handleSampleChange(
    e: React.SyntheticEvent<HTMLSelectElement>,
  ): void {
    // sample select is changed.
    if (this.textarea != null) {
      const { currentTarget: { value } } = e;
      const { language: { ops } } = this.props;
      const idx = Number(value);
      if (!isFinite(idx)) {
        return;
      }
      const code = bfSamples[idx].code;
      // 今の言語に置換
      let result = '';
      for (const op of code) {
        if (op === '\n') {
          result += '\n';
        } else if (op in ops) {
          result += ops[op as Operator];
        }
      }
      this.textarea.value = result;
    }
  }
  @bind
  protected async handleClick(): Promise<void> {
    const { textarea } = this;
    if (textarea == null) {
      return;
    }
    // initialize the state.
    this.setState({
      running: true,
      result: true,
      error: false,
      output: '',
    });

    const code = textarea.value;

    try {
      for await (const char of run(
        this.props.language,
        this.inputSource,
        code,
      )) {
        const str = String.fromCharCode(char);
        this.setState({
          output: this.state.output + str,
        });
      }
      this.setState({
        running: false,
      });
    } catch (e) {
      this.setState({
        running: false,
        error: true,
        output: String(e),
      });
    }
  }
  @bind
  protected handleInput(e: React.SyntheticEvent<HTMLInputElement>): void {
    // 入力されたらそれを送る
    const input = e.currentTarget;
    if (input.value !== '' && this.inputCallback != null) {
      const value = input.value;
      this.setState({
        waiting: false,
        output: this.state.output + value,
      });
      this.inputCallback(value);
    }
  }
  /**
   * Handle some special key input.
   */
  @bind
  protected handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.inputCallback != null) {
        this.inputCallback('\n');
      }
    } else if (e.key === 'd' && e.ctrlKey) {
      e.preventDefault();
      if (this.inputCallback != null) {
        this.inputCallback('\0');
      }
    }
  }
  /**
   * Handler of click event on result area.
   */
  @bind
  protected handleResultClick(): void {
    if (this.input != null) {
      this.input.focus();
    }
  }
  /**
   * Input source provided by the component.
   */
  @bind
  protected inputSource(): Promise<string> {
    return new Promise(resolve => {
      this.inputCallback = resolve;
      this.setState({
        waiting: true,
      });
    });
  }
}

/**
 * Interpreter textarea.
 */
const CodeArea = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 14em;
`;

/**
 * Run button.
 */
const RunButton = styled.button`
  display: inline-block;
  width: 100%;

  font-size: 1.2em;
`;

/**
 * Wrapper of result area.
 */
const ResultWrapper = styled.div`
  margin: 8px;
`;

interface IPropResultArea {
  error: boolean;
}
/**
 * Result area.
 */
const ResultArea = withProps<IPropResultArea>()(styled.pre)`
  background-color: ${props => (props.error ? '#ffdddd' : '#f2f2f2')};
  border: 4px dashed ${props => (props.error ? '#ffaaaa' : '#888888')};
  color: ${props => (props.error ? '#ff0000' : '#000000')};
  margin: 2px 0;
  padding: 8px;
  font-size: 1rem;
  white-space: pre-wrap;
`;

/**
 * Input for console.
 */
const ConsoleInput = styled.input`
  display: inline-block;
  width: 1.5em;

  border: none;
  background: none;
  outline: none;
`;
