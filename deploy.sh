# abort on errors
set -e

# build
npm run build

# get latest version and push commits
git fetch
git pull
git push

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'beersandfooty.com' > CNAME

cd -

npm run deploy
