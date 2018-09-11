##  Copyright 2017-2018
##  Myriota Pty Ltd
##  Myriota Confidential

include $(ROOTDIR)/apps/app.mk
include $(ROOTDIR)/devops/stacks/roles.mk

BUCKET_NAME=static.myriota.com

build-prod: node_modules package.json
	@rm -rf dist
	@npm run build

do-deploy:
	@echo Deploying contents ....
	aws s3 cp dist/ s3://$(BUCKET_NAME)/ --recursive --exclude '*.html' --exclude '*.map' 
	@echo Deploying html files...
	aws s3 cp dist/ s3://$(BUCKET_NAME) --recursive --cache-control 'max-age=0' --exclude '*' --include '*.html'

deploy: build-prod
	@$(WITH_ROLE) $(TEST_ADMIN_ROLE) $(MAKE) do-deploy

myriota_test:
	@echo "No test"
