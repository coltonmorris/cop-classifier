FROM tensorflow/tensorflow:1.1.0

RUN mkdir /app
WORKDIR /app

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs

# for serving
COPY ./README.md /app
COPY ./server.js /app
COPY ./package.json /app
COPY ./node_modules /app/node_modules
EXPOSE 8080

# for classifying after model is built
COPY ./bottlenecks /app/bottlenecks
COPY ./label_image.py /app/label_image.py
COPY ./retrained_graph.pb /app/retrained_graph.pb
COPY ./retrained_labels.txt /app/retrained_labels.txt
COPY ./tmp.jpg /app/tmp.jpg

# for building
# COPY ./data /app/data
# COPY ./inception /app/inception
# COPY ./retrain.py /app/retrain.py

# CMD python label_image.py tmp.jpg
CMD ["node", "server.js"]

