pipeline {
    agent {
        docker {
            image 'node:10-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('build') {
            steps {
                sh 'node -v'
                sh 'npm install -g yarn'
                sh 'yarn -v'
                sh 'yarn'
                sh 'yarn build'
            }
        }
    }
}