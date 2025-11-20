from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas


def get_workplaces(db: Session) -> List[schemas.WorkplaceOut]:
    workplaces = db.query(models.Workplace).all()
    result: List[schemas.WorkplaceOut] = []
    for wp in workplaces:
        booking_id: Optional[int] = wp.booking.id if wp.booking else None
        result.append(
            schemas.WorkplaceOut(
                id=wp.id,
                name=wp.name,
                location=wp.location,
                is_booked=wp.is_booked,
                booking_id=booking_id,
            )
        )
    return result


def create_booking(db: Session, booking: schemas.BookingCreate) -> models.Booking:
    workplace = db.query(models.Workplace).filter(models.Workplace.id == booking.workplace_id).first()
    if not workplace:
        raise HTTPException(status_code=404, detail="Workplace not found")
    if workplace.is_booked:
        raise HTTPException(status_code=400, detail="Workplace already booked")
    workplace.is_booked = True
    db_booking = models.Booking(workplace_id=booking.workplace_id, user=booking.user)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    db.refresh(workplace)
    return db_booking


def get_bookings(db: Session) -> List[models.Booking]:
    return db.query(models.Booking).all()


def delete_booking(db: Session, booking_id: int) -> None:
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    workplace = booking.workplace
    if workplace:
        workplace.is_booked = False
    db.delete(booking)
    db.commit()
