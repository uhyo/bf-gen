import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { LanguageDefinition } from '@uhyo/bf-gen-defs';

import { operators, operatorDesc } from '../bf/ops';

import { Interpreter } from './interpreter';

/**
 * Initialize an app.
 */
export function initApp(target: HTMLElement, obj: LanguageDefinition): void {
  const elm = <App language={obj} />;
  ReactDOM.render(elm, target);
}

export interface IPropApp {
  language: LanguageDefinition;
}

/**
 * Class of application.
 */
export class App extends React.PureComponent<IPropApp, {}> {
  public render() {
    const { language: { name_short, ops } } = this.props;
    return (
      <div>
        <section>
          <h2>{name_short}の説明</h2>
          <p>
            <b>{name_short}</b>は以下の8つの命令を持つBrainf&#x2588;ck系プログラミング言語です。処理系はメモリ（バイト列）とメモリ上の位置を指すポインタを1つ持ちます。メモリは最初全て0で初期化されており、ポインタも0で初期化されています。
          </p>
          <dl>
            {operators.map(op => {
              const desc = interpolate(operatorDesc[op], type => {
                if (type === 'opener') {
                  return <code>{ops['[']}</code>;
                } else if (type === 'closer') {
                  return <code>{ops[']']}</code>;
                } else {
                  return null;
                }
              });
              return (
                <React.Fragment key={ops[op]}>
                  <dt>
                    <code>{ops[op]}</code>
                  </dt>
                  <dd>{desc}</dd>
                </React.Fragment>
              );
            })}
          </dl>
        </section>
        <section>
          <h2>{name_short}を試す</h2>
          <Interpreter language={this.props.language} />
        </section>
      </div>
    );
  }
}

/**
 * simple interpolation
 */
function interpolate(
  str: string,
  interpolator: (type: string) => React.ReactNode,
): React.ReactNode {
  const re = /\{\{(\w+)\}\}/g;
  let lastIndex = 0;
  let r;
  const result: Array<React.ReactNode> = [];

  while ((r = re.exec(str))) {
    result.push(str.slice(lastIndex, r.index));
    result.push(
      <React.Fragment key={r[1]}>{interpolator(r[1])}</React.Fragment>,
    );
    lastIndex = re.lastIndex;
  }
  result.push(str.slice(lastIndex));
  return result;
}
