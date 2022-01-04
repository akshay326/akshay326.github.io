# akshay326.github.io

## Installation on Mac
- Pre-requisites
```
brew install openssl
gem install eventmachine -- --with-cppflags=-I$(brew --prefix openssl)/include
gem install jekyll
```

- Comment `gem "jekyll"` & uncomment `# gem "github-pages"` in Gemfile
- Install libraries `bundle install`

## To serve locally
```
bundle exec jekyll serve
```