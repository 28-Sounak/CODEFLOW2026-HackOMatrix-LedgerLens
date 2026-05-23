from fastapi import FastAPI
from app.api.routes import upload, analyze, insights

app = FastAPI(title="Finsight AI Backend")

app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(analyze.router, prefix="/analyze", tags=["Analyze"])
app.include_router(insights.router, prefix="/insights", tags=["Insights"])


@app.get("/")
def root():
    return {"message": "Finsight AI Backend Running"}