import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { bind } from 'bind-decorator';
import styled from 'styled-components';
import { Limits } from '@uhyo/bf-gen-defs';

import { App as Preview } from '../app';

import { operators, operatorDesc } from '../bf/ops';

import { Store } from './store';
import { publish } from './logic';

import { Button, Input, TextArea } from '../parts/form';

export function initApp(
  target: HTMLElement,
  token: string,
  limits: Limits,
): void {
  const store = new Store(limits);
  const elm = <App limits={limits} token={token} store={store} />;
  ReactDOM.render(elm, target);
}

export interface IPropApp {
  limits: Limits;
  /**
   * Token that should be sent back to server.
   */
  token: string;
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
      limits,
      store: { short_name, long_name, description, ops, language },
    } = this.props;
    const { preview } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Area>
            <p>プログラミング言語の名前を入力してください。</p>
            <p>
              <Input
                autoComplete="off"
                required
                value={short_name}
                maxLength={limits.name}
                onChange={this.handleShortInput}
              />
            </p>
          </Area>
          <Area>
            <p>ページのタイトルを入力してください。</p>
            <p>
              <Input
                autoComplete="off"
                required
                value={long_name}
                maxLength={limits.name}
                onChange={this.handleLongInput}
              />
            </p>
          </Area>
          <Area>
            <p>プログラミング言語の説明を入力してください。</p>
            <p>
              <TextArea
                autoComplete="off"
                required
                rows={4}
                value={description}
                maxLength={limits.description}
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
                      <Input
                        data-op={op}
                        required
                        value={ops[op]}
                        maxLength={limits.op}
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
              <Button type="submit">プレビュー</Button>
            </p>
          </Area>
        </Form>
        {preview ? (
          <div>
            <p>
              <b>プレビュー</b>を確認してページ下部の「公開」ボタンを押してください。
            </p>
            <h1>{long_name}</h1>
            <p>{description}</p>
            <Preview language={language} />
            <p>
              <Button onClick={this.handlePublish}>公開</Button>
            </p>
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
  @bind
  protected handlePublish(): void {
    publish(this.props.token, this.props.store.language).catch(err =>
      alert(err),
    );
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
