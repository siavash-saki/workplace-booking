from sqlalchemy.orm import Session
from . import models

SAMPLE_DESKS = [
    ("Desk A1", "North Wing"),
    ("Desk A2", "North Wing"),
    ("Desk A3", "North Wing"),
    ("Desk B1", "East Wing"),
    ("Desk B2", "East Wing"),
    ("Desk B3", "East Wing"),
    ("Desk C1", "South Wing"),
    ("Desk C2", "South Wing"),
    ("Desk D1", "West Wing"),
    ("Desk D2", "West Wing"),
]


def seed_workplaces(db: Session) -> None:
    existing = db.query(models.Workplace).count()
    if existing > 0:
        return
    for name, location in SAMPLE_DESKS:
        wp = models.Workplace(name=name, location=location, is_booked=False)
        db.add(wp)
    db.commit()
