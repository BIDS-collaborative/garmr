from .main import App
from . import model

@App.path(path='')
class Root(object):
    pass
