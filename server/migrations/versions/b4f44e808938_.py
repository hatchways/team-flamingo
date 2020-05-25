"""Use Postgres types for funding_goal and photos

Revision ID: b4f44e808938
Revises: a0c20a78eb62
Create Date: 2020-05-23 01:51:17.140494

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b4f44e808938'
down_revision = 'a0c20a78eb62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project', 'funding_goal',
                    existing_type=postgresql.DOUBLE_PRECISION(precision=53),
                    type_=postgresql.MONEY(),
                    existing_nullable=True,
                    postgresql_using="funding_goal::numeric::money")
    op.alter_column('project', 'location',
                    existing_type=sa.TEXT(),
                    type_=sa.String(length=64),
                    existing_nullable=True)
    op.alter_column('project', 'photos',
                    existing_type=sa.TEXT(),
                    type_=postgresql.ARRAY(sa.TEXT()),
                    existing_nullable=True,
                    postgresql_using="photos::text[]")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('project', 'location',
                    existing_type=sa.String(length=64),
                    type_=sa.TEXT(),
                    existing_nullable=True,)
    op.alter_column('project', 'funding_goal',
                    existing_type=postgresql.MONEY(),
                    type_=postgresql.DOUBLE_PRECISION(precision=53),
                    existing_nullable=True,
                    postgresql_using="funding_goal::numeric::double precision")
    op.alter_column('project', 'photos',
                    existing_type=postgresql.ARRAY(sa.TEXT()),
                    type_=sa.TEXT(),
                    existing_nullable=True)
    # ### end Alembic commands ###
