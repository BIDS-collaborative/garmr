from morepath import redirect
from .model import Guest, Root
from .main import App, Session
from .collection import GuestCollection

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

@App.json(model=Guest)
def guest_default(self, request):
    return {
        'id': self.id,
        'name': self.name,
        'title': self.title,
        'department': self.department,
        'email': self.email,
    }

@App.json(model=GuestCollection)
def guest_collection_default_json(self, request):
    return {
        'guests': [request.view(guest) for guest in self.query()],
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
    guest = self.add(name, title, department, email)
    return request.view(self)
