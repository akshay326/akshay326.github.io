# akshay326.github.io
My personal website


# install rbenv
sudo apt-get update
sudo apt-get install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build


# install ruby version 2.2.5
rbenv install 2.2.5
rbenv global 2.2.5
ruby -v                # verify ruby version


# how to serve blog locally
cd ~/Projects/akshay326
bundle exec jekyll serve

# how to upload blog to s3 using aws cli
cd ~/Projects/akshay326
bundle exec jekyll build
aws s3 sync _site/ s3://akshay326.com --delete --acl public-read

# removing cache from cloudfront
create a new invalidation with path "/*" and wait for it to complete