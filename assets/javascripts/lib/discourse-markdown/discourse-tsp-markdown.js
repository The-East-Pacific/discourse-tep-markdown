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
   inline_ruler.push('add', {
      tag: 'add',
      wrap: 'span.markdown-bill-add'
   });
   inline_ruler.push('remove', {
      tag: 'remove',
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
   block_ruler.push('bgblock', {
      tag: 'bgblock',
      wrap: function(token, tagInfo) {
         token.attrs = [['style', 'background-color: ' + tagInfo.attrs['_default']]];
         return true;
      }
   });
}
export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.registerOptions((opts)=>{
      opts.features['discourse-tep-markdown'] = true;
   });

   helper.allowList([
      'div.markdown-block',
      'div.markdown-bill',
      'span.markdown-bill-add',
      'span.markdown-bill-remove',
      'div[style=*]',
      'tr[align=*]',
      'tr[style=*]',
      'td[align=*]',
      'td[style=*]',
      'th[align=*]',
      'th[style=*]',
      'tr[rowspan=*]',
      'td[colspan=*]',
      'th[colspan=*]',
      'th[rowspan=*]',
      'table[style=*]',
      'span[style=*]'
   ]);
   helper.registerPlugin(setupMarkdownIt);
}
