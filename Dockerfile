FROM mcr.microsoft.com/playwright:v1.48.2-focal 
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "test"]