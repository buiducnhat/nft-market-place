# Build contracts
yarn install
yarn hardhat compile

# Build frontend
cd frontend
bun install
bun run build
cd ..
