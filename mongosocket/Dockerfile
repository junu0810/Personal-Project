# 파일 빌드 부분
FROM openjdk:17-jdk-alpine as builder

# 작업 폴더 위치 설정
WORKDIR /usr/app/

# 실행시 필수 파일 복사
COPY gradlew ./
COPY build.gradle ./
COPY settings.gradle ./
COPY gradle ./gradle/

RUN ./gradlew -x test build || return 0

# 프로젝트 소스 폴더 복사
COPY src src

# gradlew 빌드
RUN chmod +x gradlew
RUN #./gradlew test
RUN ./gradlew bootjar

# Docker 이미지 실행
FROM openjdk:17-jdk-alpine
ENV TZ Asia/Seoul
WORKDIR /usr/app/

# 위에서 빌드한 파일을 test.jar 파일로 복사
COPY --from=builder /usr/app/build/libs/test_docker-0.0.1-SNAPSHOT.jar .

# 컨테이너는 8080 포트로 실행된다
EXPOSE 8080

# 컨테이너를 구동할 때 실행할 명령어 지정(명렁어를 스페이스로 나눈것과 같다)
ENTRYPOINT ["java","-jar","test_docker-0.0.1-SNAPSHOT.jar"]
