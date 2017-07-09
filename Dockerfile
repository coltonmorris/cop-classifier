FROM tensorflow/tensorflow:1.1.0

RUN mkdir /app
WORKDIR /app

# files for running
COPY ./bottlenecks /app/bottlenecks
COPY ./label_image.py /app/label_image.py
COPY ./retrained_graph.pb /app/retrained_graph.pb
COPY ./retrained_labels.txt /app/retrained_labels.txt
COPY ./tmp.jpg /app/tmp.jpg

# files for building
COPY ./README.md /app
COPY ./data /app/data
COPY ./inception /app/inception
COPY ./retrain.py /app/retrain.py

CMD python label_image.py tmp.jpg
