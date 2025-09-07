pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                echo "🔹 Building Frontend..."
                dir('FrontEnd/timetable') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                echo "🔹 Deploying Frontend to Tomcat..."
                bat '''
                REM Remove old frontend folder if exists
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-Reactapp" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-Reactapp"
                )

                REM Create new folder
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-Reactapp"

                REM Copy build contents (not the folder) into Tomcat
                xcopy /E /I /Y FrontEnd\\timetable\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-Reactapp\\"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                echo "🔹 Building Backend..."
                dir('BackEnd/Timetable-backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                echo "🔹 Deploying Backend to Tomcat..."
                bat '''
                REM Remove old backend deployment if exists
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-SpringBoot.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-SpringBoot.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-SpringBoot" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-SpringBoot"
                )

                REM Copy new WAR file
                copy "BackEnd\\Timetable-backend\\target\\Timetable-SpringBoot.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\Timetable-SpringBoot.war"
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Pipeline Failed. Check Jenkins logs.'
        }
    }
}
