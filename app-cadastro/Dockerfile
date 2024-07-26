# Dockerfile para Aplicação Spring Boot
FROM openjdk:17-jdk-alpine

# Diretório de trabalho
WORKDIR /app

# Copia o projeto para o container
COPY . .

# Instala o Maven (necessário para o build)
RUN apk add --no-cache maven

# Compila o projeto e gera o JAR
RUN ./mvnw clean package -DskipTests

# Copia o JAR gerado para um local conhecido no container
COPY target/*.jar app.jar

# Comando para iniciar a aplicação
CMD ["java", "-jar", "/app/app.jar"]
