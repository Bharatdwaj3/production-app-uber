pipeline{
    agent any
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Build Docker Images'){
            steps{
                sh 'docker-compose build'
            }
        }
        stage('Run Container'){
            steps{
                sh 'docker-compose up -d'
            }
        }
        stage('run Tests'){
            steps{
                sh 'docker exec backend npm test || true'
                sh 'docker exec frontend npm test || true'
            }
        }
        stage('Cleanup'){
            steps{
                sh 'docker-compose down'
            }
        }
    }
}