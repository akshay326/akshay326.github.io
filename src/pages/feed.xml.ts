import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import type { APIContext } from 'astro';
import {
  sortPostsDesc,
  postRoute,
  postDate,
  firstParagraph,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from '../lib/post';

export async function GET(context: APIContext) {
  const posts = sortPostsDesc(
    await getCollection('blog', ({ data }) => !data.draft)
  );

  const items = await Promise.all(
    posts.map(async (post) => {
      let content = '';
      try {
        await render(post);
        content = post.rendered?.html ?? '';
      } catch {
        content = '';
      }
      return {
        title: post.data.title,
        pubDate: postDate(post),
        description: firstParagraph(post.body ?? ''),
        content,
        link: new URL(postRoute(post), SITE_URL).href,
      };
    })
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? SITE_URL,
    items,
  });
}
