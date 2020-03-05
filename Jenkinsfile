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
        stage('Ng-Build') {
        	agent {
		        docker {
		            image 'node:10.19.0-alpine3.9'
		        }
		    }
            steps {
                sh 'npm install -g @angular/cli@7.3.6'
                sh 'ng build --configuration=qa --aot'
            }
        }
    }
}
