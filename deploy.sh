# abort on errors
set -e

# build
npm run build

# commit changes
git commit -m 'deploy'

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'beersandfooty.com' > CNAME

git init
git add -A
git commit -m 'deploy'

cd -

git push

npm run deploy
