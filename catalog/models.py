from django.db import models
from django.db.models.deletion import CASCADE, RESTRICT
from django.conf import settings
from django.contrib.contenttypes.models import ContentType

def user_directory_path(instance, filename):
    """Метод формирования пути для изображений

    Args:
        instance (models.Model): экземпляр модели
        filename (string): название файла

    Returns:
        string: конечный путь для сохранения 
    """
    return f'{instance.product.name}/{filename}'

class Category(models.Model):

    parent_category = models.ForeignKey('self', on_delete=RESTRICT, null=True, blank=True) # Родительская категория
    
    name = models.CharField(verbose_name='Имя категории', max_length=255)
    slug = models.SlugField(unique=True) # category/nootboki/ - slug поле 

    image = models.ImageField(verbose_name='Изображение категории')

    def __str__(self) -> str:
        return self.name

    class Meta: 
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']

class Gallery(models.Model):
    """
        Модель альбома для фотографий
    """
    image = models.ImageField(verbose_name='Изображение', upload_to=user_directory_path)
    is_cover = models.BooleanField(verbose_name='Обложка?', default=False) 
    product = models.ForeignKey('Product', verbose_name='Игра', on_delete=CASCADE, related_name='images')
    
    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name = 'Альбом'
        verbose_name_plural = 'Альбомы'


class Product(models.Model):
    """
        Модель продукта, для продажи
    """
    category = models.ForeignKey('Category', verbose_name='Категория', on_delete=RESTRICT)
    name = models.CharField(verbose_name='Имя продукта', max_length=255, db_index=True)
    slug = models.SlugField(unique=True)

    description = models.TextField(verbose_name='Описание')
    price = models.DecimalField(verbose_name='Цена', max_digits=9, decimal_places=2)

    stock = models.PositiveIntegerField(verbose_name='Количество')
    available = models.BooleanField(verbose_name='Доступно', default=True)

    created_at = models.DateTimeField(verbose_name='Создано', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Обновлено', auto_now=True)

    class Meta:
        ordering = ('name',)
        index_together = (('id', 'slug'),)
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.name

class CartProduct(models.Model):

    cart = models.ForeignKey('Cart', verbose_name='Корзина', on_delete=CASCADE)
    product = models.ForeignKey('Product', verbose_name='Продукт', on_delete=CASCADE, related_name='related_producs')
    qty = models.PositiveIntegerField(default=1)
    final_price = models.DecimalField(verbose_name='Общая цена', max_digits=9, decimal_places=2) # общая цена карточки корзины

    def __str__(self) -> str:
        return f"Продукт: {self.product.name} в корзине {self.cart.owner.firstname}"


class Cart(models.Model):

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Владелец', on_delete=CASCADE)
    products = models.ManyToManyField('CartProduct', blank=True, related_name='related_cart') # карточки продуктов
    total_products = models.PositiveIntegerField(default=0) # кол-во наименований продукта
    final_price = models.DecimalField(verbose_name='Общая цена', max_digits=9, decimal_places=2) # общая цена корзины 

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"

class CategoryAttribute(models.Model):

    category = models.ForeignKey("Category", verbose_name="Атрибут категории", on_delete=models.CASCADE, related_name="attributes")
    
    name = models.CharField(verbose_name="Название атрибута", max_length=255)

    class Meta:
        verbose_name = "Атрибут категории"
        verbose_name_plural = "Атрибуты категорий"


class AttributeValue(models.Model):
    attribute = models.ForeignKey("CategoryAttribute", verbose_name="Атрибут", on_delete=models.CASCADE, related_name="values")
    product = models.ForeignKey("Product", verbose_name="Значение атрибута для продукта", on_delete=models.CASCADE, related_name="values")
    value = models.CharField(verbose_name="Значение атрибута", max_length=255)

    class Meta: 
        verbose_name = "Значение атрибута"
        verbose_name_plural = "Значения атрибутов"