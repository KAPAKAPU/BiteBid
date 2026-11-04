from fastapi import FastAPI

app = FastAPI(
title="BiteBid API",
description="Backend API for the BiteBid food leaderboard platform",
version="0.1.0",
)

@app.get("/")
def root():
    return {
    "message": "Welcome to BiteBid!",
    "status": "running",
    }

@app.get("/health")
def health_check():
    return {
    "status": "healthy",
    }