import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { bind } from 'bind-decorator';
import styled from 'styled-components';

import { App as Preview } from '../app';

import { operators, operatorDesc } from '../bf/ops';

import { Store } from './store';

export function initApp(target: HTMLElement): void {
  const store = new Store();
  const elm = <App store={store} />;
  ReactDOM.render(elm, target);
}

export interface IPropApp {
  store: Store;
}
export interface IStateApp {
  preview: boolean;
}

@observer
export class App extends React.Component<IPropApp, IStateApp> {
  constructor(props: IPropApp) {
    super(props);
    this.state = { preview: false };
  }
  public render() {
    const {
      short_name,
      long_name,
      description,
      ops,
      language,
    } = this.props.store;
    const { preview } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Area>
            <p>プログラミング言語の名前を入力してください。</p>
            <p>
              <input
                autoComplete="off"
                required
                value={short_name}
                onChange={this.handleShortInput}
              />
            </p>
          </Area>
          <Area>
            <p>ページのタイトルを入力してください。</p>
            <p>
              <input
                autoComplete="off"
                required
                value={long_name}
                onChange={this.handleLongInput}
              />
            </p>
          </Area>
          <Area>
            <p>プログラミング言語の説明を入力してください。</p>
            <p>
              <textarea
                autoComplete="off"
                required
                rows={4}
                value={description}
                onChange={this.handleDescInput}
              />
            </p>
          </Area>
          <Area>
            <p>8つの命令を入力してください。</p>
            <OpTable>
              <tbody>
                {operators.map(op => (
                  <tr key={op}>
                    <td>
                      <code>{op}</code>
                    </td>
                    <td>
                      <input
                        data-op={op}
                        required
                        value={ops[op]}
                        onChange={this.handleOpInput}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </OpTable>
          </Area>
          <Area>
            <p>
              <SubmitButton type="submit">プレビュー</SubmitButton>
            </p>
          </Area>
        </Form>
        {preview ? (
          <div>
            <p>
              <b>プレビュー</b>:
            </p>
            <h1>{long_name}</h1>
            <p>{description}</p>
            <Preview language={language} />
          </div>
        ) : null}
      </>
    );
  }
  @bind
  protected handleShortInput(e: React.SyntheticEvent<HTMLInputElement>): void {
    this.props.store.update({
      short_name: e.currentTarget.value,
    });
  }
  @bind
  protected handleLongInput(e: React.SyntheticEvent<HTMLInputElement>): void {
    this.props.store.update({
      long_name: e.currentTarget.value,
    });
  }
  @bind
  protected handleDescInput(
    e: React.SyntheticEvent<HTMLTextAreaElement>,
  ): void {
    this.props.store.update({
      description: e.currentTarget.value,
    });
  }
  @bind
  protected handleOpInput(e: React.SyntheticEvent<HTMLInputElement>): void {
    const { currentTarget } = e;
    const op = currentTarget.dataset.op as any;
    this.props.store.update({
      ops: {
        [op]: currentTarget.value,
      },
    });
  }
  @bind
  protected handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({
      preview: true,
    });
  }
}

/**
 * main form.
 */
const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;

  p {
    margin: 0.3em 0;
  }
  input,
  textarea {
    width: 100%;
    padding: 8px 5px;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
  }
  input:invalid, textarea: invalid {
    background-color: #fff2f2;
    border: 1px solid #ffaaaa;
    outline-color: #ffaaaa;
  }
`;

/**
 * Submit button.
 */
const SubmitButton = styled.button`
  width: 100%;
  border: 1px solid #aaaaaa;
  border-radius: 6px;
  padding: 6px;

  color: #222222;
  font-size: 1.5em;
  background: linear-gradient(
    to bottom,
    #f2f2f2 0%,
    #ffffff 15%,
    #ffffff 80%,
    #f4f4f4
  );
`;

/**
 * One input area.
 */
const Area = styled.div`
  margin: 0.3em 0;
  padding: 0.3em 0;

  :not(:first-child) {
    border-top: 1px dashed #aaaaaa;
  }
`;

/**
 * Table of operators.
 */
const OpTable = styled.table`
  width: 100%;
`;
