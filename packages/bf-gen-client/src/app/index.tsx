import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import { LanguageDefinition, Owner } from '@uhyo/bf-gen-defs';

import { operators, operatorDesc } from '../bf/ops';

import { Interpreter } from './interpreter';
import { Markdown } from './markdown';

/**
 * Initialize an app.
 */
export function initApp(
  target: HTMLElement,
  obj: LanguageDefinition,
  owner: Owner,
): void {
  const elm = <App language={obj} owner={owner} />;
  ReactDOM.render(elm, target);
}

export interface IPropApp {
  className?: string;
  owner: Owner;
  language: LanguageDefinition;
}

/**
 * Class of application.
 */
class AppInner extends React.PureComponent<IPropApp, {}> {
  public render() {
    const {
      className,
      language: { name, name_short, description, ops },
      owner,
    } = this.props;
    return (
      <div className={className}>
        <section>
          <h1>{name}</h1>
          <Owner owner={owner} />
          <Markdown source={description} />
          <section>
            <h2>{name_short}の仕様</h2>
            <p>
              <b>{name_short}</b>は以下の8つの命令を持つBrainf*ck系プログラミング言語です。処理系はメモリ（バイト列）とメモリ上の位置を指すポインタを1つ持ちます。メモリは最初全て0で初期化されており、ポインタも0で初期化されています。
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
            <h2>{name_short} Webインタプリタ</h2>
            <p>
              <b>{name_short}</b>をブラウザ上で実行することができます。
            </p>
            <Interpreter language={this.props.language} />
          </section>
        </section>
      </div>
    );
  }
}
export const App = styled(AppInner)`
  h1 {
    font-size: 2em;
  }
`;

interface IPropOwner {
  className?: string;
  owner: Owner;
}
/**
 * Owner of language box.
 */
class OwnerInner extends React.PureComponent<IPropOwner, {}> {
  public render() {
    const { className, owner: { id, displayName, profileImage } } = this.props;
    return (
      <div className={className}>
        <div>作成者</div>
        <a
          href={`https://twitter.com/intent/user?user_id=${id}`}
          target="_blank"
          rel="external"
        >
          <div>
            <img src={profileImage} width={48} height={48} alt={displayName} />
            <span>{displayName}</span>
          </div>
        </a>
      </div>
    );
  }
}
const Owner = styled(OwnerInner)`
  float: right;
  margin: 0.8em;
  padding: 3px;

  background-color: #f4f4f4;

  font-size: 0.85em;
  color: #666666;

  img {
    padding: 3px;
  }
  span {
    vertical-align: top;
    line-height: 48px;
  }
  a {
    color: #0075c4;
    text-decoration: none;
  }
`;

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
