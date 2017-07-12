# Cop Classifier
---

Fun fun fun

### Training
---
Just run:
```bash
python src/classifier/retrain.py \
  --bottleneck_dir=src/classifier/bottlenecks \
  --model_dir=src/classifier/inception \
  --output_graph=src/classifier/retrained_graph.pb \
  --output_labels=src/classifier/retrained_labels.txt \
  --image_dir=data
```

### Classifying
---
Just run:
```bash
python src/classifier/label_image.py src/classifier/tmp.jpg
```

### Notes
---
Currently only jpg's work.


Was having problem with a cop picture, and deleting the big ones helped:
rm cop105.jpg cop60.jpg cop47.jpg cop44.jpg cop194.jpg cop174.jpg cop153.jpg cop141.jpg cop139.jpg cop138.jpg cop155.jpg

loadbalancer connects to a deployment who then can route to other services using express.
when /classifier is hit, it is given a frontend website, which is then able to connect to the cop-classifier service. 
the cop-classifier service would only need to listen on 1 port and not worry about url stuff. it would not use express, but grpc

### Build Details
---
Different ways to connect this service:
  * User uploads file
  * File is saved to database
  * User clicks run
  * grpc sends classifier the images location.
  * grpc responds with the classification percentages

OR

  * User uploads a file
  * grpc sends classifier the file
  * grpc responds with the classification percentages

OR

  * User posts a URL
  * grpc sends classifier the URL
  * grpc downloads the URL
  * grpc responds with the classification percentages


### Current Way to Run
---
* First build and push the image: ```make build && make push```
* Make sure the old deployments and pods are deleted.
* Run ```make deploy```
* Find the ephemeral ip and hit it up

