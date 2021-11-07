import django_filters

from catalog.models import Product


class ProductFilter(django_filters.FilterSet):
    price = django_filters.RangeFilter()
    # искать не по категрии а по жанру
    genre = django_filters.CharFilter(field_name='values__value')

    class Meta:
        model = Product
        fields = ['price', 'genre']