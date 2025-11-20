from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Workplace(Base):
    __tablename__ = "workplaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    is_booked = Column(Boolean, default=False)

    booking = relationship("Booking", back_populates="workplace", uselist=False)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    workplace_id = Column(Integer, ForeignKey("workplaces.id"), nullable=False)
    user = Column(String, nullable=False)

    workplace = relationship("Workplace", back_populates="booking")
