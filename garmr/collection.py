from .model import Guest, Event
from .main import Session
from sqlalchemy import desc

MAX_LIMIT = 10

class GuestCollection(object):
    def __init__(self, offset=0, limit=MAX_LIMIT):
        self.offset = offset
        self.limit = min(limit, MAX_LIMIT)

    def query(self):
        return Session.query(Guest).order_by(desc(Guest.id)).offset(self.offset).limit(self.limit)

    def add(self, name, title, department, email, date, event):
        session = Session()
        guest = Guest(name=name, title=title, department=department, email=email, date=date, event=event)
        session.add(guest)
        session.flush()
        return guest

    def previous(self):
        if self.offset == 0:
            return None
        new_offset = max(self.offset - self.limit, 0)
        return GuestCollection(new_offset, self.limit)

    def next(self):
        count = Session.query(Guest.id).count()
        new_offset = self.offset + self.limit
        if new_offset >= count:
            return None
        return GuestCollection(new_offset, self.limit)

class GuestCollectionByEvent(object):
    def __init__(self, eventID, offset=0, limit=MAX_LIMIT):
        self.offset = offset
        self.limit = min(limit, MAX_LIMIT)
        self.eventID = eventID

    def query(self):
        return Session.query(Guest).order_by(desc(Guest.id)).filter_by(event=self.eventID).offset(self.offset).limit(self.limit)

    def previous(self):
        if self.offset == 0:
            return None
        new_offset = max(self.offset - self.limit, 0)
        return GuestCollectionByEvent(new_offset, self.limit)

    def next(self):
        count = Session.query(Guest.id).count()
        new_offset = self.offset + self.limit
        if new_offset >= count:
            return None
        return GuestCollectionByEvent(new_offset, self.limit)

class EventCollection(object):
    def __init__(self, offset=0, limit=MAX_LIMIT):
        self.offset = offset
        self.limit = min(limit, MAX_LIMIT)

    def query(self):
        return Session.query(Event).order_by(desc(Event.id)).offset(self.offset).limit(self.limit)

    def add(self, name, description, date, time):
        session = Session()
        event = Event(name=name, description=description, date=date, time=time)
        session.add(event)
        session.flush()
        return event

    def previous(self):
        if self.offset == 0:
            return None
        new_offset = max(self.offset - self.limit, 0)
        return EventCollection(new_offset, self.limit)

    def next(self):
        count = Session.query(Event.id).count()
        new_offset = self.offset + self.limit
        if new_offset >= count:
            return None
        return EventCollection(new_offset, self.limit)
