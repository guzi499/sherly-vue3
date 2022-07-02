pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm install -g yarn -registry=https://registry.npm.taobao.org'
                sh 'yarn -v'
                sh 'yarn install --pure-lockfile'
                sh 'yarn run build'
            }
        }
    }
}