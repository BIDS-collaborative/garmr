from setuptools import setup, find_packages

setup(name='garmr',
  packages=find_packages(),
  include_package_data=True,
  zip_safe=False,
  install_requires=[
    'morepath',
    'more.static'
  ],
  entry_points={
    'console_scripts': [
    'garmr-start = garmr.main:main'
    ]
  })
