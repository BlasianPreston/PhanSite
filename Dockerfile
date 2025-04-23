# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./ 
RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy built app and install only production deps
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Port the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]

# Start up commands
# docker build -t phansite .
# docker run -p 3000:3000 phansite