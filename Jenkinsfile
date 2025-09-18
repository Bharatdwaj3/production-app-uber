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
                bat 'copy backend\\.env.example backend\\.env'
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
        echo 'Running backend tests...'
        script {
            try {
                bat 'docker exec bezzer-backend npm test'
            } catch (Exception e) {
                echo "Backend tests failed or not configured: ${e.getMessage()}"
                currentBuild.result = 'UNSTABLE'
            }
        }
        
        echo 'Running frontend tests...'
        script {
            try {
                bat 'docker exec bezzer-frontend npm test'
            } catch (Exception e) {
                echo "Frontend tests failed or not configured: ${e.getMessage()}"
                currentBuild.result = 'UNSTABLE'
            }
        }
        
        echo 'Running Selenium E2E tests...'
        script {
            try {
                bat 'docker-compose run --rm tests'
            } catch (Exception e) {
                echo "Selenium tests failed: ${e.getMessage()}"
                currentBuild.result = 'UNSTABLE'
            }
        }
    }
}e:\Prog_Lang_Sem_2_MCA\production-app\tests
        stage('Cleanup'){
            steps{
                echo 'Cleaning up...'
                bat 'docker-compose down'
                
                // Clean up created .env files
                script {
                    try {
                        bat 'del backend\\.env'
                    } catch (Exception e) {
                        echo 'Backend .env cleanup: file not found'
                    }
                    
                    try {
                        bat 'del frontend\\.env'
                    } catch (Exception e) {
                        echo 'Frontend .env cleanup: file not found'
                    }
                }
                
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
        unstable {
            echo 'Pipeline completed with warnings (tests may not be configured).'
        }
    }
}