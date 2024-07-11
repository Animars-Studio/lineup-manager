#!/bin/bash

# Clean previous builds
rm -rf dist
rm -rf .serverless
rm -rf .build

# Compile TypeScript to JavaScript
npx tsc

# Create the .serverless directory
mkdir -p .serverless

# Copy the .graphql files from src to the dist directory
cp src/operations.graphql dist/
cp src/schema.graphql dist/

# Copy the compiled files to the .serverless directory
cp -r dist/* .serverless/

# Package the serverless application
serverless package
