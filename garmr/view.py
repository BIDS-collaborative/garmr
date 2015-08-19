from morepath import redirect
from .model import Guest, Event, Root
from .main import App, Session
from .collection import GuestCollection, EventCollection, GuestCollectionByEvent

@App.html(model=Root)
def root_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/main.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.html(model=GuestCollection, name="view")
def guest_collection_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/guests.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.html(model=GuestCollectionByEvent, name="view")
def guest_collection_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/guestsByEvent.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.html(model=EventCollection, name="new")
def event_collection_new_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('datetimepicker')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/eventsNew.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.html(model=EventCollection, name="view")
def event_collection_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/events.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.html(model=Event, name="new-guest")
def event_new_guest_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
    request.include('normalize-css')
    request.include('toastr')
    request.include('skeleton/skeleton.css',
                    '<link rel="stylesheet" type="text/css" href="{url}">')
    request.include('static/eventsMain.js.jsx',
                    '<script type="text/jsx" src="{url}"></script>')
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Garmr</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''

@App.json(model=Guest)
def guest_default(self, request):
    return {
        'id': self.id,
        'name': self.name,
        'title': self.title,
        'department': self.department,
        'email': self.email,
        'date': self.date,
        'event': self.event
    }

@App.json(model=Event)
def event_default(self, request):
    return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'date': self.date,
        'time': self.time
    }

@App.json(model=GuestCollection)
def guest_collection_default_json(self, request):
    return {
        'guests': [request.view(guest) for guest in self.query()],
        'previous': request.link(self.previous(), default=None),
        'next': request.link(self.next(), default=None),
        'add': request.link(self, 'add'),
        }

@App.json(model=GuestCollectionByEvent)
def guest_collection_by_event_default_json(self, request):
    return {
        'guests': [request.view(guest) for guest in self.query()],
        'previous': request.link(self.previous(), default=None),
        'next': request.link(self.next(), default=None),
        'add': request.link(self, 'add'),
        }

@App.json(model=EventCollection)
def event_collection_default_json(self, request):
    return {
        'events': [request.view(event) for event in self.query()],
        'previous': request.link(self.previous(), default=None),
        'next': request.link(self.next(), default=None),
        'add': request.link(self, 'add'),
        }

@App.json(model=GuestCollection, name='add', request_method='POST')
def guest_collection_add(self, request):
    name = request.json.get('name')
    title = request.json.get('title')
    department = request.json.get('department')
    email = request.json.get('email')
    date = request.json.get('date')
    event = request.json.get('event')
    guest = self.add(name, title, department, email, date, event)
    return request.view(self)

@App.json(model=EventCollection, name='add', request_method='POST')
def event_collection_add(self, request):
    name = request.json.get('name')
    description = request.json.get('description')
    date = request.json.get('date')
    time = request.json.get('time')
    event = self.add(name, description, date, time)
    return request.view(self)

