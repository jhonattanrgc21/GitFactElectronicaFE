pipeline {
    agent none
    stages {
        stage('Node-Install') {
        	agent {
		        docker {
		            image 'node:lts-slim'
		        }
		    }
            steps {
                sh 'npm install'
            }
        }
    }
}
