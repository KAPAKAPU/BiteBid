#Verified payments that affect rankings
from datetime import datetime

from sqlalchemy import (
BigInteger,
CheckConstraint,
DateTime,
ForeignKey,
String,
func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base
from models.campaign import Campaign

class Contribution(Base):
    __tablename__ = "contributions"

__table_args__ = (
    CheckConstraint("amount_paise > 0", name="ck_contribution_positive"),
    CheckConstraint(
        "status IN ('pending', 'confirmed', 'failed', 'refunded')",
        name="ck_contribution_status",
    ),
)
id: Mapped[int] = mapped_column(primary_key=True, index=True)
campaign_id: Mapped[int] = mapped_column(
    ForeignKey("campaigns.id", ondelete="RESTRICT"),
    nullable=False,
    index=True,
)
amount_paise: Mapped[int] = mapped_column(
    BigInteger, nullable=False
)
status: Mapped[str] = mapped_column(
    String(20), nullable=False, default="pending", index=True
)
# Set only when the payment provider confirms the payment.
confirmed_at: Mapped[datetime | None] = mapped_column(
    DateTime(timezone=True)
)
created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), nullable=False
)
campaign: Mapped["Campaign"] = relationship(
    back_populates="contributions"
)