FROM oven/bun:latest

# Install the necessary packages
WORKDIR /app
COPY . .
RUN bun install
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN bunx prisma db push
RUN bunx prisma generate
CMD ["bun", "run", "dev"]

