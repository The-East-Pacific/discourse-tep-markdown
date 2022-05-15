function setupMarkdownIt(md) {
   const inline_ruler = md.inline.bbcode.ruler;
   const block_ruler = md.block.bbcode.ruler;

   inline_ruler.push('nation', {
      tag: 'nation',
      wrap: function(startToken, endToken, tagInfo, content) {
         const url = (tagInfo.attrs['_default'] || content).trim();
         startToken.type = 'link_open';
         startToken.tag = 'a',
         startToken.attrs = [['href', 'https://www.nationstates.net/nation=' + url], ['data-bbcode', 'true']];
         startToken.content = '';
         startToken.nesting = 1;

         endToken.type = 'link_close';
         endToken.tag = 'a';
         endToken.content = '';
         endToken.nesting = -1;
      }
   });
   inline_ruler.push('region', {
      tag: 'region',
      wrap: function(startToken, endToken, tagInfo, content) {
         const url = (tagInfo.attrs['_default'] || content).trim();
         startToken.type = 'link_open';
         startToken.tag = 'a',
         startToken.attrs = [['href', 'https://www.nationstates.net/region=' + url], ['data-bbcode', 'true']];
         startToken.content = '';
         startToken.nesting = 1;

         endToken.type = 'link_close';
         endToken.tag = 'a';
         endToken.content = '';
         endToken.nesting = -1;
      }
   });
   inline_ruler.push('bill-add', {
      tag: 'bill-add',
      wrap: 'span.markdown-bill-add'
   });
   inline_ruler.push('bill-remove', {
      tag: 'bill-add',
      wrap: 'span.markdown-bill-remove'
   });
   block_ruler.push('bill', {
      tag: 'bill',
      wrap: 'div.markdown-bill'
   });
   block_ruler.push('box', {
      tag: 'box',
      wrap: 'div.markdown-block'
   });
   block_ruler.push('background-block', {
      tag: 'background-block',
      wrap: function(token, tagInfo) {
         token.attrs = [['style', tagInfo.attrs['_default']]];
         return true;
      }
   });
}
export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.registerOptions((opts,siteSettings)=>{
      opts.features.['discourse-tsp-markdown'] = !!siteSettings.tspmarkdown_enabled;
   });

   helper.allowList([
      'div.markdown-box',
      'div.markdown-bill',
      'span.markdown-bill-add',
      'span.markdown-bill-remove'
   ]);

   helper.registerPlugin(setupMarkdownIt);
}