# Generated by Django 3.2.5 on 2021-07-22 21:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0002_auto_20210722_2128'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductAttribute',
            new_name='CategoryAttribute',
        ),
        migrations.DeleteModel(
            name='Genre',
        ),
    ]
