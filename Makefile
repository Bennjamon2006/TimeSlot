FRONTEND_BUILD_DIR=frontend/dist
BACKEND_BUILD_DIR=backend/dist



prepare:
	@echo "Installing dependencies for frontend and backend..."
	npm install
	@echo "Dependencies installed."
	@echo "Starting Docker container..."
	docker compose up -d
	@echo "Docker container started."
	@echo "Preparing prisma migrations..."
	cd backend && npx prisma generate
	@echo "Prisma migrations prepared."
	@echo "Copying .env.example to .env in backend..."
	cp backend/.env.example backend/.env
	@echo "Environment variables set up."

build: prepare
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Frontend built."
	@echo "Building backend..."
	cd backend && npm run build	
	@echo "Backend built."

start: build
	@echo "Starting backend server..."
	cd backend && npm start

dev:
	@echo "Starting development server with hot reloading..."
	npm run dev