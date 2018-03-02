import * as React from 'react';
import { Share } from 'react-twitter-widgets';
import styled from 'styled-components';

declare var gapi: any;

export interface IPropShareWidgets {
  url: string;
}
export interface IStateShareWidgets {
  /**
   * Loaded Twitter Share Component.
   */
  TwitterShare: (typeof Share) | null;
}
/**
 * Asynchronous share widgets.
 */
export class ShareWidgets extends React.PureComponent<
  IPropShareWidgets,
  IStateShareWidgets
> {
  /**
   * Area for Hatena Bookmark button.
   */
  protected hatena: HTMLElement | null = null;
  /**
   * Area for Pocket button.
   */
  protected pocket: HTMLElement | null = null;
  /**
   * Area for G+.
   */
  protected google: HTMLElement | null = null;
  constructor(props: IPropShareWidgets) {
    super(props);

    this.state = {
      TwitterShare: null,
    };

    import('react-twitter-widgets').then(mod => {
      this.setState({
        TwitterShare: mod.Share,
      });
    });
  }
  public render() {
    const { props: { url }, state: { TwitterShare } } = this;
    return (
      <Wrapper>
        {TwitterShare != null ? <TwitterShare url={url} /> : null}
        <span ref={e => (this.hatena = e)} />
        <span ref={e => (this.google = e)} />
        <span ref={e => (this.pocket = e)} />
      </Wrapper>
    );
  }
  public componentDidMount() {
    // set up hatena area
    if (this.hatena != null) {
      this.hatena.insertAdjacentHTML(
        'afterbegin',
        `<a href="http://b.hatena.ne.jp/entry/" class="hatena-bookmark-button" data-hatena-bookmark-layout="basic-label-counter" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加">
          <img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" />
        </a>`,
      );
    }
    if (this.pocket != null) {
      this.pocket.insertAdjacentHTML(
        'afterbegin',
        `<a data-pocket-label="pocket" data-pocket-count="horizontal" class="pocket-btn" data-lang="en"></a>`,
      );
      const script = document.createElement('script');
      script.src = 'https://widgets.getpocket.com/v1/j/btn.js?v=1';
      script.async = true;
      this.pocket.appendChild(script);
    }
    if (this.google != null && 'undefined' !== typeof gapi) {
      gapi.plusone.render(this.google, { size: 'medium' });
    }
  }
  public componentWillUnmount() {
    // あとしまつ
    clean(this.hatena);
    clean(this.pocket);
    clean(this.google);
  }
}

const Wrapper = styled.div`
  > div,
  > span {
    display: inline-block;

    margin: 3px;
  }
`;

/**
 * Clean up given node.
 */
function clean(node: HTMLElement | null): void {
  if (node != null) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}
