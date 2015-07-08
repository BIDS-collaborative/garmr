from .main import App
from .model import Guest, Root
from .collection import GuestCollection
from . import model, collection

@App.path(model=Root, path='/')
def get_root():
    return Root()

@App.path(model=GuestCollection, path='guests')
def get_guest_collection(offset=0, limit=10):
    return GuestCollection(offset, limit)
