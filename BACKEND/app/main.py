from fastapi import FastAPI

from app.api.routes.upload import router as upload_router
from app.api.routes.analyze import router as analyze_router
from app.api.routes.insights import router as insights_router

app = FastAPI(
    title="Finsight AI Backend",
    version="1.0"
)

app.include_router(upload_router, prefix="/upload", tags=["Upload"])
app.include_router(analyze_router, prefix="/analyze", tags=["Analyze"])
app.include_router(insights_router, prefix="/insights", tags=["Insights"])


@app.get("/")
def home():
    return {"message": "Finsight AI Backend Running"}