#Food items competing for paid leaderboard placement
from datetime import datetime

from sqlalchemy import (
BigInteger,
CheckConstraint,
DateTime,
ForeignKey,
Index,
String,
Text,
UniqueConstraint,
func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.business import Business
from models.contribution import Contribution

class Campaign(Base):
    __tablename__ = "campaigns"

__table_args__ = (
    CheckConstraint(
        "scope IN ('city', 'national')",
        name="ck_campaign_scope",
    ),
    CheckConstraint(
        "status IN ('pending', 'active', 'paused', 'ended')",
        name="ck_campaign_status",
    ),
    CheckConstraint(
        "total_contribution_paise >= 0",
        name="ck_campaign_contribution_nonnegative",
    ),
    UniqueConstraint(
        "business_id",
        "food_item_name",
        "scope",
        "city",
        name="uq_campaign_business_item_scope_city",
    ),
    Index("ix_campaign_scope_city_status", "scope", "city", "status"),
)
id: Mapped[int] = mapped_column(primary_key=True, index=True)
business_id: Mapped[int] = mapped_column(
    ForeignKey("businesses.id", ondelete="RESTRICT"),
    nullable=False,
    index=True,
)
food_item_name: Mapped[str] = mapped_column(
    String(200), nullable=False
)
description: Mapped[str | None] = mapped_column(Text)
scope: Mapped[str] = mapped_column(
    String(20), nullable=False, default="city"
)
city: Mapped[str] = mapped_column(String(100), nullable=False)
status: Mapped[str] = mapped_column(
    String(20), nullable=False, default="pending"
)
# Store money as integer paise to avoid floating-point rounding.
total_contribution_paise: Mapped[int] = mapped_column(
    BigInteger, nullable=False, default=0
)
created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), nullable=False
)
business: Mapped["Business"] = relationship(back_populates="campaigns")
contributions: Mapped[list["Contribution"]] = relationship(
    back_populates="campaign"
)