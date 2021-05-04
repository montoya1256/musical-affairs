"""empty message

Revision ID: 953e4cf06ae6
Revises: 176a4cb563a9
Create Date: 2021-05-03 20:39:50.706890

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '953e4cf06ae6'
down_revision = '176a4cb563a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'state')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('state', sa.VARCHAR(length=2), autoincrement=False, nullable=False))
    # ### end Alembic commands ###