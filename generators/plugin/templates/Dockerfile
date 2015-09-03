#FROM xolocalvendors/nodebox:latest
FROM node:latest

MAINTAINER reharik@gmail.com

ENV PLUGIN_HOME /opt/app/current

RUN npm install mocha -g
RUN npm install babel -g
<% if (ports.length>0) { ports.forEach(function(port){ %>
EXPOSE <%= port %><% })} %>

RUN mkdir -p /opt/app/current

WORKDIR $PLUGIN_HOME

ADD ./package.json $PLUGIN_HOME/package.json

RUN npm install
RUN mv node_modules ../

ADD . $PLUGIN_HOME
