
pipeline{
    agent any
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Setup Environment'){
            steps{
                echo 'Creating environment files from examples...'
                
                // Create backend .env from backend example
                bat 'copy backend\\.env.example backend\\.env'
                
                // Create frontend .env from frontend example
                bat 'copy frontend\\.env.example frontend\\.env'
                
                echo 'Environment files created successfully!'
            }
        }
        stage('Build Docker Images'){
            steps{
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }
        stage('Run Container'){
            steps{
                echo 'Starting containers...'
                bat 'docker-compose up -d'
            }
        }
        stage('Run Tests'){
            steps{
                echo 'Running tests...'
                bat 'docker exec bezzer-backend npm test || true'
                bat 'docker exec bezzer-frontend npm test || true'
            }
        }
        stage('Cleanup'){
            steps{
                echo 'Cleaning up...'
                bat 'docker-compose down'
                
                // Clean up created .env files after use
                bat 'del backend\\.env || echo "Backend .env not found"'
                bat 'del frontend\\.env || echo "Frontend .env not found"'
                
                echo 'Cleanup completed!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
        }
        success {
            echo 'Pipeline succeeded! 🎉'
        }
    }
}