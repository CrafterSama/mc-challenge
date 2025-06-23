# DRF Test Project

This project demonstrates a basic Django REST Framework setup with a few models.

## Seeding the Database

A management command is provided to populate the database with a couple of
sample products and a demo order. Each product includes a public image URL.
Run the following after applying migrations:

```bash
python manage.py seed
```

Running the command again when data already exists will print a warning and
leave the data unchanged.

