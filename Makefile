-include ../ubuntu-lamp/overrides.mk

install:
	npm install

build:
	npm run build

serve:
	npm run dev
