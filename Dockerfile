FROM tensorflow/tensorflow:1.1.0

RUN mkdir -p /app/src
WORKDIR /app

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs

# for serving
COPY ./README.md /app
COPY ./Makefile /app
COPY ./src/server.js /app/src
COPY ./src/handlers.js /app/src
COPY ./package.json /app
COPY ./node_modules /app/node_modules
COPY ./proto /app/proto

EXPOSE 8080

# for classifying after model is built
# COPY ./src/classifier/bottlenecks /app/src/classifier/bottlenecks
# COPY ./src/classifier/label_image.py /app/src/classifier/label_image.py
# COPY ./src/classifier/retrained_graph.pb /app/src/classifier/retrained_graph.pb
# COPY ./src/classifier/retrained_labels.txt /app/src/classifier/retrained_labels.txt
# COPY ./src/classifier/tmp.jpg /app/src/classifier/tmp.jpg
COPY ./src/classifier /app/src/classifier
COPY ./tmp.jpg /app

# for building
# COPY ./data /app/data
# COPY ./src/classifier/inception /app/src/classifier/inception
# COPY ./src/classifier/retrain.py /app/src/classifier/retrain.py

# CMD python label_image.py tmp.jpg
CMD ["node", "src/server.js"]

