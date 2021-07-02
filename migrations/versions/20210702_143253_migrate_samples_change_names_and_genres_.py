"""migrate samples, change names and genres of test kits

Revision ID: 822dfb9decab
Revises: a0c0f7948be7
Create Date: 2021-07-02 14:32:53.176563

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '822dfb9decab'
down_revision = 'a0c0f7948be7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('samples',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('drum_type_id', sa.Integer(), nullable=False),
    sa.Column('kit_id', sa.Integer(), nullable=False),
    sa.Column('audio_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['drum_type_id'], ['drum_types.id'], ),
    sa.ForeignKeyConstraint(['kit_id'], ['kits.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('samples')
    # ### end Alembic commands ###
