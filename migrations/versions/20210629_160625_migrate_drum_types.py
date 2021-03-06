"""migrate_drum_types

Revision ID: c5bb4c4f6a56
Revises: b85fc152b55c
Create Date: 2021-06-29 16:06:25.788557

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c5bb4c4f6a56'
down_revision = 'b85fc152b55c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('drum_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('drum_types')
    # ### end Alembic commands ###
