FROM nginx:latest
RUN chmod +w /etc/nginx/conf.d/default.conf
RUN rm -rf /home/${{ secrets.REMOTE_USER }}/deploy/nginx/default.conf
RUN touch /home/${{ secrets.REMOTE_USER }}/deploy/nginx/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
