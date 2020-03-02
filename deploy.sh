# abort on errors
set -e

git remote add origin 'git+https://'$GH_TOKEN':x-oauth-basic@github.com/joemccleery/beersandfooty.git'
git config --global git.protocol git+https
git config --global user.email "mccleery.joseph@gmail.com"
git config --global user.name "joemccleery"

# # get latest version
# git pull
# git add .
# git commit
# git push

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'beersandfooty.com' > CNAME

cd -

npm run deploy
