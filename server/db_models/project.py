from app import db
from sqlalchemy.dialects.postgresql import MONEY, ARRAY, TIMESTAMP

project_industries_map = db.Table(
    "project_industries_map",
    db.Column("industry_id", db.Integer, db.ForeignKey(
        'industry.id'), primary_key=True),
    db.Column("project_id", db.Integer, db.ForeignKey(
        'project.id'), primary_key=True)
)


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "user.id"), nullable=False)
    subtitle = db.Column(db.Text)
    # "Toxi" Configuration
    industry = db.relationship(
        "Industry", secondary=project_industries_map,
        lazy="select", backref=db.backref("project", lazy="select"))
    location = db.Column(db.String(64))
    photos = db.Column(ARRAY(db.Text))
    funding_goal = db.Column(MONEY)
    deadline = db.Column(TIMESTAMP)

    def __repr__(self):
        return "{0} created by {1}".format(self.title, self.User_id)
