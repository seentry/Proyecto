FROM nginx:latest
RUN chmod +w /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
