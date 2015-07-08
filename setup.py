import os
from setuptools import setup, find_packages

setup(name='garmr',
  packages=find_packages(),
  include_package_data=True,
  zip_safe=False,
  install_requires=[
    'setuptools',
    'morepath',
    'waitress',
    'transaction',
    'more.transaction',
    'zope.sqlalchemy >= 0.7.4',
    'sqlalchemy >= 0.9',
    'more.static',
  ],
  entry_points={
    'console_scripts': [
    'garmr-start = garmr.main:main'
    ]
  })
