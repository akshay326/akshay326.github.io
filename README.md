# akshay326.github.io

My personal website — ML interpretability blog and projects (civerify.com, graph representation learning, LoRA dynamics).

Built with [Jekyll](https://jekyllrb.com) and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme, served by GitHub Pages.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Deploy

Push to `main` — GitHub Pages builds and serves automatically:

```bash
git push origin main
```

## Contents

- `_posts/` — blog posts (Markdown, Jekyll front matter)
- `_data/` — site data (e.g. `reading.yml` for the "Currently reading" list on Bookreads)
- `assets/images/` — post figures (WebP with width/height attributes)
- `llms.txt` — machine-readable site index for AI agents
- `robots.txt` — crawler policy (training bots blocked, search allowed)
- `privacy.markdown` — privacy policy (Google Analytics + consent banner)
