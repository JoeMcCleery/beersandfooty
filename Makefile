-include ../ubuntu-lamp/overrides.mk

install:
	npm install

deploy:
	npm run build
	npm run start

serve:
	npm run dev
