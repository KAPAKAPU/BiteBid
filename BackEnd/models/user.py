
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.business_manager import BusinessManager


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    phone_number: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False, index=True
    )

    phone_verified: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    business_memberships: Mapped[list["BusinessManager"]] = relationship(
        "BusinessManager",
        back_populates="user",
    )
