"""Conexão com o MongoDB Atlas.

Enquanto MONGODB_URI estiver vazio, a API sobe normalmente e apenas
informa que o banco ainda não foi configurado.
"""

from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase

from app.core.config import get_settings

_client: AsyncMongoClient | None = None


async def connect() -> None:
    global _client
    settings = get_settings()
    if settings.mongodb_uri:
        _client = AsyncMongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)


async def disconnect() -> None:
    global _client
    if _client is not None:
        await _client.close()
        _client = None


def get_database() -> AsyncDatabase | None:
    if _client is None:
        return None
    return _client[get_settings().mongodb_db_name]


async def ping() -> str:
    """Retorna 'connected', 'not_configured' ou 'error'."""
    if _client is None:
        return "not_configured"
    try:
        await _client.admin.command("ping")
        return "connected"
    except Exception:
        return "error"
