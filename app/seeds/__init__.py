from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genres import seed_genres, undo_genres
from .drum_types import seed_drum_types, undo_drum_types
from .kits import seed_kits, undo_kits

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_genres()
    seed_drum_types()
    seed_kits()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_kits()
    undo_drum_types()
    undo_genres()
    undo_users()
    # Add other undo functions here
