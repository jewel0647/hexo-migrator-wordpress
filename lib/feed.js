'use strict';

/* !
 * Ported from feed-furious 1.0.0 to support async-ed camaro v4+
 * Licensed MIT (c) 2017 Tuan Anh Tran <https://tuananh.org/>
 * https://github.com/tuananh/feed-furious
 */

const { transform } = require('camaro');

const template = {
  wp: {
    items: ['//item', {
      title: 'title',
      link: 'link',
      date: 'wp:post_date|pubDate',
      description: 'excerpt:encoded|description',
      id: 'wp:post_id',
      content: 'content:encoded',
      comment: 'wp:comment_status',
      slug: 'wp:post_name',
      status: 'wp:status',
      type: 'wp:post_type',
      tags: ['category', '.']
    }]
  }
};

const detectFeedType = async xml => {
  const sample = await transform(xml, {
    wp: 'rss/channel/title'
  });

  if (sample.wp) return 'wp';
  throw new Error('invalid format');
};

const parseFeed = async xml => {
  const type = await detectFeedType(xml);
  const output = await transform(xml, template[type]);
  return output;
};

module.exports = parseFeed;