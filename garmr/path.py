from .main import App, Session
from .model import Guest, Event, Root
from .collection import GuestCollection, EventCollection, GuestCollectionByEvent
from . import model, collection

@App.path(model=Root, path='/')
def get_root():
    return Root()

@App.path(model=GuestCollection, path='guests')
def get_guest_collection(offset=0, limit=10):
    return GuestCollection(offset, limit)

@App.path(model=GuestCollectionByEvent, path='guests-by-event/{eventID}', converters={'eventID': int})
def get_guest_collection_by_event(eventID, offset=0, limit=10):
    return GuestCollectionByEvent(eventID, offset, limit)


@App.path(model=Event, path='events/{id}', converters={'id': int})
def get_event(id):
    session = Session()
    return session.query(Event).filter(Event.id == id).first()

@App.path(model=EventCollection, path='events')
def get_event_collection(offset=0, limit=10):
    return EventCollection(offset, limit)
