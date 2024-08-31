pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/netflix-clone'  // Docker image name
        AWS_CREDENTIALS = credentials('aws-credentials-id') // Jenkins AWS credentials
        SONARQUBE_SERVER = 'SonarQube'  // SonarQube server name
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/yourusername/netflix-clone.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE_SERVER) {
                    sh 'sonar-scanner'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                sh 'docker login -u your-dockerhub-username -p $DOCKERHUB_PASSWORD'
                sh 'docker push $DOCKER_IMAGE'
            }
        }
        stage('Deploy to AWS') {
            steps {
                sh 'terraform init'
                sh 'terraform apply -auto-approve'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}

