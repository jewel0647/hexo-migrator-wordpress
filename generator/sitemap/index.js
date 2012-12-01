var util = hexo.util,
  file = util.file,
  extend = hexo.extend,
  xml = require('jstoxml');

extend.generator.register(function(locals, render, callback){
  var publicDir = hexo.public_dir,
    config = hexo.config,
    content = [];

  var arr = [].concat(locals.posts.toArray(), locals.pages.toArray()).sort(function(a, b){
    return b.updated - a.updated;
  });

  arr.forEach(function(item){
    content.push({
      url: {
        loc: item.permalink,
        lastmod: item.updated.toDate().toISOString()
      }
    });
  });

  var result = xml.toXML({
    _name: 'urlset',
    _attrs: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    },
    _content: content
  }, {header: true, indent: '  '});

  file.write(publicDir + 'sitemap.xml', result, callback);
});