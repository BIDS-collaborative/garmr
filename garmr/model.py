from sqlalchemy import (
    Column,
    Integer,
    Text,
    DateTime,
    ForeignKey,
    )
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Root(object):
    pass

class Guest(Base):
    __tablename__ = 'guest'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    title = Column(Text)
    department = Column(Text)
    email = Column(Text)
