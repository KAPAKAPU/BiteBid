
from datetime import datetime

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.business_manager import BusinessManager
from models.campaign import Campaign


class Business(Base):
    __tablename__ = "businesses"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    name: Mapped[str] = mapped_column(
        String(200), nullable=False, index=True
    )

    city: Mapped[str] = mapped_column(
        String(100), nullable=False, index=True
    )

    website_url: Mapped[str | None] = mapped_column(String(500))
    instagram_url: Mapped[str | None] = mapped_column(String(500))
    description: Mapped[str | None] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    managers: Mapped[list["BusinessManager"]] = relationship(
        "BusinessManager",
        back_populates="business",
        cascade="all, delete-orphan",
    )

    campaigns: Mapped[list["Campaign"]] = relationship(
        "Campaign",
        back_populates="business",
    )
