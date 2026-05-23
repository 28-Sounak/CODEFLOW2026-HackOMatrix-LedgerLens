import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME = "Finsight AI"
    ENV = os.getenv("ENV", "development")

settings = Settings()