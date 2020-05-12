-include ../ubuntu-lamp/overrides.mk

install:
	npm install
	touch ./.env
	make serve

serve:
	npm run dev
