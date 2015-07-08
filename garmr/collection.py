from .model import Guest
from .main import Session

MAX_LIMIT = 10

class GuestCollection(object):
    def __init__(self, offset=0, limit=MAX_LIMIT):
        self.offset = offset
        self.limit = min(limit, MAX_LIMIT)

    def query(self):
        return Session.query(Guest).offset(self.offset).limit(self.limit)

    def add(self, name, title, department, email):
        session = Session()
        guest = Guest(name=name, title=title, department=department, email=email)
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
