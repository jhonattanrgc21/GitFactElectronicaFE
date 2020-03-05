pipeline {
    agent none
    stages {
        stage('Node-Install') {
        	agent {
		        docker {
		            image "${nodeImage}"
		        }
		    }
            steps {
                sh 'npm install'
            }
        }
        stage('Ng-Build') {
        	agent {
		        docker {
		            image "${nodeImage}"
		        }
		    }
            steps {
                sh 'npm install -g @angular/cli@' + "${angularCliVersion}"
                sh 'ng build --configuration=' + "${environment}" + ' --aot'
            }
        }
    }
}
