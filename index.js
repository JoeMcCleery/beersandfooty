var ghpages = require('gh-pages')

ghpages.publish('dist', {
    branch: 'master',
    repo: 'https://github.com/JoeMcCleery/beersandfooty.git'
  }, deployed());

function deployed () {
    return;
}
