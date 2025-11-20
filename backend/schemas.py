from typing import Optional
from pydantic import BaseModel


class WorkplaceBase(BaseModel):
    name: str
    location: str
    is_booked: bool = False
    booking_id: Optional[int] = None


class WorkplaceOut(WorkplaceBase):
    id: int

    class Config:
        orm_mode = True


class BookingBase(BaseModel):
    workplace_id: int
    user: str


class BookingCreate(BookingBase):
    pass


class BookingOut(BaseModel):
    id: int
    workplace_id: int
    user: str

    class Config:
        orm_mode = True


class LoginRequest(BaseModel):
    username: str


class LoginResponse(BaseModel):
    token: str
    user: str
