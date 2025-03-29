# JAVA 11
FROM openjdk:11-jdk-slim

# Directory for the application in the container
WORKDIR /app

# Copy the jar file to the container
COPY target/Mony-0.0.1-SNAPSHOT.jar app.jar

# Expose the port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT  ["java", "-jar", "app.jar"]