def row2dict(row):
    '''
    Converts object of type (dbModel) into dictionary 
    '''
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d
