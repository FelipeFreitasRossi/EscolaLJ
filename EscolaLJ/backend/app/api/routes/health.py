from fastapi import APIRouter

from app.core.config import get_settings
from app.database import mongodb
from app.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Verifica se a API está no ar e se o banco está acessível."""
    settings = get_settings()
    return HealthResponse(
        status="ok",
        app=settings.app_name,
        environment=settings.environment,
        database=await mongodb.ping(),
    )
