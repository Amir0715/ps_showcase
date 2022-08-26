import django_filters

from catalog.models import Product

# TODO: Не работает филтрация по имени
class ProductFilter(django_filters.FilterSet):
    price = django_filters.RangeFilter()
    # искать не по категрии а по жанру
    genre = django_filters.CharFilter(field_name='values__value')
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    class Meta:
        model = Product
        fields = ['price', 'genre', 'name']
