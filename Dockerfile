FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

RUN npx playwright install --with-deps chromium

COPY . .

ENV CI=true

CMD ["npx", "playwright", "test", "--project=chromium"]