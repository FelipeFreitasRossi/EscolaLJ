from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: Literal["ok"]
    app: str
    environment: str
    database: Literal["connected", "not_configured", "error"]
