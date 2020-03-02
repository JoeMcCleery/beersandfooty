var ghpages = require('gh-pages')

ghpages.publish('dist', {
    branch: 'master',
    repo: 'https://github.com/JoeMcCleery/beersandfooty.git',
    user: {
      name: 'joemccleery',
      email: 'mccleery.joseph@gmail.com'
    }
  }, deployed());

function deployed () {
    return;
}
