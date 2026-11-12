"""Configurações da aplicação, lidas do arquivo .env.

Nenhum segredo fica escrito no código: tudo vem de variáveis de ambiente.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Escola de Futebol LJ API"
    environment: str = "development"
    cors_origins: str = "http://localhost:5173"

    mongodb_uri: str = ""
    mongodb_db_name: str = "escola_lj"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
