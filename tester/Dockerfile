# Use an official Ubuntu base image
FROM ubuntu:20.04

# Install curl and jq
RUN apt-get update && \
    apt-get install -y curl jq && \
    rm -rf /var/lib/apt/lists/*


ARG ACCOUNT_SERVICE_URL=http://account
ARG ACCOUNT_SERVICE_PORT=3000
ARG STATS_SERVICE_URL=http://statistics
ARG STATS_SERVICE_PORT=3001

# Set the working directory
WORKDIR /app

# Copy the test script into the container
COPY test_script.sh /app

# Make the test script executable
RUN chmod +x /app/test_script.sh

ENV ACCOUNT_SERVICE_URL=$ACCOUNT_SERVICE_URL
ENV ACCOUNT_SERVICE_PORT=$ACCOUNT_SERVICE_PORT

ENV STATS_SERVICE_URL=$STATS_SERVICE_URL
ENV STATS_SERVICE_PORT=$STATS_SERVICE_PORT


# Command to run on container start
CMD ["/app/test_script.sh"]
