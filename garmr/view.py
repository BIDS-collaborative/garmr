from morepath import redirect
from .main import App
from . import model, path

@App.html(model=path.Root)
def root_default(self, request):
    request.include('jquery')
    request.include('react/react.js')
    request.include('react/JSXTransformer.js')
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
