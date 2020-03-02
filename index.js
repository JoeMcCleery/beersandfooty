var ghpages = require('gh-pages')

ghpages.publish('dist', {
    branch: 'master',
    repo: 'git+https://'+{
      repo: 'https://' + process.env.GH_TOKEN+':x-oauth-basic@github.com/joemccleery/beersandfooty.git',
    silent: true,
    user: {
      name: 'joemccleery',
      email: 'mccleery.joseph@gmail.com'
    }
  }, deployed());

function deployed () {
    return;
}
