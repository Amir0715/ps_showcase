from django.db import models
from django.db.models.deletion import CASCADE, RESTRICT
from django.urls import reverse_lazy

def user_directory_path(instance, filename):
    """Метод формирования пути для изображений

    Args:
        instance (models.Model): экземпляр модели
        filename (string): название файла

    Returns:
        string: конечный путь для сохранения 
    """
    return f'{instance.product.name}/{filename}'


class Genre(models.Model):
    """
        Модель жанра для игр
    """
    name = models.CharField(verbose_name='Название', max_length=200, db_index=True)
    slug = models.SlugField(verbose_name='Алиас',max_length=200, db_index=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'

    def __str__(self):
        return self.name

class Gallery(models.Model):
    """
        Модель альбома для фотографий
    """
    image = models.ImageField(verbose_name='Изображение', upload_to=user_directory_path)
    is_cover = models.BooleanField(verbose_name='Обложка?', default=False) 
    class Meta:
        abstract = True
        verbose_name = 'Альбом'
        verbose_name_plural = 'Альбомы'

class GameGallery(Gallery):
    product = models.ForeignKey(to='Game', verbose_name='Игра', on_delete=CASCADE, related_name='images')
    
    def __str__(self):
        return self.product.name
    
    class Meta:
        verbose_name = 'Альбом игр'
        verbose_name_plural = 'Альбомы игр'

class ConsoleGallery(Gallery):
    product = models.ForeignKey(to='Console', verbose_name='Консоль', on_delete=CASCADE, related_name='images')

    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name = 'Альбом консолей'
        verbose_name_plural = 'Альбомы консолей'

class ConsoleModel(models.Model):
    name = models.CharField(verbose_name='Название', max_length=25, db_index=True)
    slug = models.SlugField(verbose_name='Алиас',max_length=25, db_index=True)
    
    class Meta:
        verbose_name = 'Модель консоли'
        verbose_name_plural = 'Модель консоли'

    def __str__(self):
        return self.name

class Product(models.Model):
    """
        Модель продукта, для продажи
    """
    name = models.CharField(verbose_name='Название', max_length=200, db_index=True)
    
    description = models.TextField(verbose_name='Описание', blank=True)
    price = models.DecimalField(verbose_name='Цена', max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(verbose_name='Количество')
    available = models.BooleanField(verbose_name='Доступно', default=True)

    created_at = models.DateTimeField(verbose_name='Создано', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Обновлено', auto_now=True)
    in_carousel = models.BooleanField(verbose_name='В карусели', default=False)
    class Meta:
        abstract=True
        ordering = ('name',)
        index_together = (('id', 'slug'),)
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.name

class Console(Product):
    
    volume = models.PositiveIntegerField(verbose_name='Объем памяти') 
    number_of_gamepads = models.PositiveIntegerField(verbose_name='Количество геймпадов', default=1)
    console_model = models.ForeignKey('ConsoleModel', related_name='consoles', on_delete=RESTRICT)
    class Meta:
        ordering = ('name',)
        verbose_name = 'Консоль'
        verbose_name_plural = 'Консоли'

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse_lazy("catalog:console_view", kwargs={"console_pk": self.pk})

class Game(Product):

    GAME_TYPE = [
        (0, 'Unknown'),
        (1, 'Blu-ray Disc'), 
        (2, 'Digital copies')
    ]

    genres = models.ManyToManyField('Genre', related_name='games')
    console_model = models.ForeignKey('ConsoleModel', related_name='games', on_delete=RESTRICT)
    type = models.IntegerField(choices=GAME_TYPE)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Игра'
        verbose_name_plural = 'Игры'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse_lazy("catalog:game_view", kwargs={"game_pk": self.pk})
