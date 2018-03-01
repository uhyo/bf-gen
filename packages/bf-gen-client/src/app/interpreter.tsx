import * as React from 'react';
import styled from 'styled-components';
import { bind } from 'bind-decorator';

import { LanguageDefinition } from '@uhyo/bf-gen-defs';
import { run } from '../bf';

export interface IPropInterpreter {
  language: LanguageDefinition;
}
export interface IStateInterpreter {
  /**
   * Whether interpreter is running.
   */
  running: boolean;
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
      error: false,
      output: '',
    };
  }
  /**
   * Ref to code area.
   */
  protected textarea: HTMLTextAreaElement | null = null;
  public render() {
    const { running, error, output } = this.state;
    return (
      <div>
        <CodeArea innerRef={e => (this.textarea = e)} />
        <RunButton type="button" onClick={this.handleClick} disabled={running}>
          実行
        </RunButton>
        <div>実行結果</div>
        <ResultArea>{output}</ResultArea>
      </div>
    );
  }
  @bind
  protected async handleClick(): Promise<void> {
    const { textarea } = this;
    if (textarea == null) {
      return;
    }
    // initialize the state.
    this.setState({
      error: false,
      output: '',
    });

    const code = textarea.value;

    for await (const char of run(this.props.language, this.inputSource, code)) {
      const str = String.fromCharCode(char);
      this.setState({
        output: this.state.output + str,
      });
    }
  }
  /**
   * Input source provided by the component.
   */
  @bind
  protected inputSource(): Promise<number> {
    // TODO
    return Promise.resolve(0);
  }
}

/**
 * Interpreter textarea.
 */
const CodeArea = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 10em;
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
 * Result area.
 */
const ResultArea = styled.pre`
  background-color: #f2f2f2;
  border: 4px dashed #888888;
  margin: 2px 0;
  padding: 8px;
`;
