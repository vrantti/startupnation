#!/bin/bash

# Startup Nation - Deployment Script
# Cross-platform deployment automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    if command_exists npm; then
        npm install
    else
        print_error "npm is not installed. Please install Node.js first."
        exit 1
    fi
}

# Function to build project
build_project() {
    print_status "Building project for production..."
    if command_exists npm; then
        npm run build
    else
        print_warning "npm not found, skipping build step"
    fi
}

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists npx; then
        print_error "npx is not installed. Please install Node.js first."
        return 1
    fi
    
    install_dependencies
    build_project
    
    print_status "Deploying to Vercel..."
    npx vercel --prod
    
    print_success "Deployed to Vercel!"
    print_status "Your site will be available at: https://your-project.vercel.app"
}

# Function to deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command_exists npx; then
        print_error "npx is not installed. Please install Node.js first."
        return 1
    fi
    
    install_dependencies
    build_project
    
    print_status "Deploying to Netlify..."
    npx netlify deploy --prod --dir .
    
    print_success "Deployed to Netlify!"
    print_status "Your site will be available at: https://your-site.netlify.app"
}

# Function to deploy to Firebase
deploy_firebase() {
    print_status "Deploying to Firebase..."
    
    if ! command_exists npx; then
        print_error "npx is not installed. Please install Node.js first."
        return 1
    fi
    
    install_dependencies
    build_project
    
    print_status "Deploying to Firebase..."
    npx firebase deploy
    
    print_success "Deployed to Firebase!"
    print_status "Your site will be available at: https://your-project.firebaseapp.com"
}

# Function to start local preview
start_local() {
    print_status "Starting local preview..."
    
    if command_exists python3; then
        print_status "Opening launcher at: http://localhost:8000/launch.html"
        print_status "Press Ctrl+C to stop the server"
        python3 -m http.server 8000
    elif command_exists python; then
        print_status "Opening launcher at: http://localhost:8000/launch.html"
        print_status "Press Ctrl+C to stop the server"
        python -m http.server 8000
    else
        print_error "Python is not installed. Please install Python first."
        exit 1
    fi
}

# Function to show GitHub Pages instructions
github_pages() {
    print_status "GitHub Pages Deployment Instructions:"
    echo
    echo "1. Create a new repository on GitHub"
    echo "2. Upload all files to the repository"
    echo "3. Go to Settings > Pages"
    echo "4. Select source: Deploy from a branch"
    echo "5. Choose main branch"
    echo "6. Your site will be available at: https://username.github.io/repository-name"
    echo
    print_status "For automatic deployment, use GitHub Actions with the provided workflow."
}

# Function to build for production
build_production() {
    print_status "Building for production..."
    
    install_dependencies
    build_project
    
    print_status "Minifying CSS and JS..."
    if command_exists npm; then
        npm run minify
    fi
    
    print_status "Optimizing images..."
    if command_exists npm; then
        npm run optimize
    fi
    
    print_status "Generating sitemap..."
    if command_exists npm; then
        npm run generate:sitemap
    fi
    
    print_success "Production build complete!"
    print_status "Files are ready in the current directory."
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    if command_exists npm; then
        npm run test
    else
        print_warning "npm not found, skipping tests"
    fi
}

# Main menu
show_menu() {
    echo "========================================"
    echo "   Startup Nation - Deployment Script"
    echo "========================================"
    echo
    echo "Choose deployment option:"
    echo "1. Vercel (Recommended - Free)"
    echo "2. Netlify (Free)"
    echo "3. Firebase (Free)"
    echo "4. GitHub Pages (Free)"
    echo "5. Local Preview"
    echo "6. Build for Production"
    echo "7. Run Tests"
    echo "8. Exit"
    echo
}

# Main script
main() {
    while true; do
        show_menu
        read -p "Enter your choice (1-8): " choice
        
        case $choice in
            1)
                deploy_vercel
                ;;
            2)
                deploy_netlify
                ;;
            3)
                deploy_firebase
                ;;
            4)
                github_pages
                ;;
            5)
                start_local
                ;;
            6)
                build_production
                ;;
            7)
                run_tests
                ;;
            8)
                print_success "Thank you for using Startup Nation deployment script!"
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please try again."
                ;;
        esac
        
        echo
        read -p "Press Enter to continue..."
        echo
    done
}

# Run main function
main
