import DOMPurify from 'dompurify';
import marked from 'marked';

const formatMarkdown = (markdown) => (
  DOMPurify.sanitize(marked(markdown, { gfm: true, breaks: true })
    .replace(/<a/g, '<a target="_blank"'))
);

export {
  formatMarkdown as default
};
