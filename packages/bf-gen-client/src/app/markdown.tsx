import * as React from 'react';
import * as MarkdownIt from 'markdown-it';

export interface IPropMarkdown {
  source: string;
}
/**
 * Render markdown source.
 */
export class Markdown extends React.PureComponent<IPropMarkdown, {}> {
  public render() {
    const { source } = this.props;

    const md = new (MarkdownIt as any)({
      linkify: true,
    });
    const html = { __html: md.render(source) };
    return <div dangerouslySetInnerHTML={html} />;
  }
}
