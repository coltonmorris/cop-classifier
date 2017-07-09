# VERSION = $(eval awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
VERSION = 0.1.0
IMAGE = gcr.io/my-website-169905/cop-classifier
# IMAGEID = 

all: build push deploy

.PHONY: build
build:
	# docker tag [IMAGE_ID] [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	docker build -t $(IMAGE):latest -t $(IMAGE):$(VERSION) .

push:
	# gcloud docker -- push [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	gcloud docker -- push $(IMAGE):latest

deploy:
	kubectl apply -f ./kubernetes

classify:
	python label_image.py tmp.jpg
