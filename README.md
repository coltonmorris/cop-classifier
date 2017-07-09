# Cop Classifier
---

Fun fun fun

### Training
---
Just run:
```bash
python retrain.py \
  --bottleneck_dir=bottlenecks \
  --model_dir=inception \
  --output_graph=retrained_graph.pb \
  --output_labels=retrained_labels.txt \
  --image_dir=data
```

### Classifying
---
Just run:
```bash
python label_image.py tmp.jpg
```

### Notes
---
Currently only jpg's work.


Was having problem with a cop picture, and deleting the big ones helped:
rm cop105.jpg cop60.jpg cop47.jpg cop44.jpg cop194.jpg cop174.jpg cop153.jpg cop141.jpg cop139.jpg cop138.jpg cop155.jpg

