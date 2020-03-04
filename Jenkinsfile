pipeline {
    agent none
    stages {
        stage('Node-Install') {
        	agent {
		        docker {
		            image 'node:10.19.0-alpine3.9'
		        }
		    }
            steps {
                sh 'npm install'
            }
        }
    }
}
