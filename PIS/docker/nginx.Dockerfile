FROM nginx:latest
RUN chmod +w /etc/nginx/conf.d/default.conf
RUN rm -rf /home/ubuntu/deploy/nginx/default.conf
RUN touch /home/ubuntu/deploy/nginx/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
