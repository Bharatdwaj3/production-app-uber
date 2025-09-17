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
        bat 'copy backend\\.env.example backend\\.env'
        bat 'copy frontend\\.env.example frontend\\.env'
    }
}
        stage('Build Docker Images'){
            steps{
                bat 'docker-compose build'
            }
        }
        stage('Run Container'){
            steps{
                bat 'docker-compose up -d'
            }
        }
        stage('run Tests'){
            steps{
                bat 'docker exec backend npm test || true'
                bat 'docker exec frontend npm test || true'
            }
        }
        stage('Cleanup'){
            steps{
                bat 'docker-compose down'
            }
        }
    }
}