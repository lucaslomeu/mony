# BUILD APP
FROM maven:3.8.6-openjdk-11-slim AS builder
WORKDIR /build
COPY . .    
RUN mvn clean package -DskipTests


# RUN APP
FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=builder /build/target/Mony-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT  ["java", "-jar", "app.jar"]