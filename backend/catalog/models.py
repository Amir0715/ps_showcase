from django.db import models
from django.db.models.deletion import CASCADE, RESTRICT
from django.conf import settings
from django.urls import reverse


def user_directory_path(instance, filename):
    """Метод формирования пути для изображений

    Args:
        instance (models.Model): экземпляр модели
        filename (string): название файла

    Returns:
        string: конечный путь для сохранения
    """
    return f"{instance.product.name}/{filename}"


class Category(models.Model):
    """
    Модель категории и подкатегорий
    """

    parent = models.ForeignKey(
        "self", on_delete=RESTRICT, null=True, blank=True, related_name="children"
    )  # Родительская категория

    name = models.CharField(verbose_name="Имя категории", max_length=255)
    slug = models.SlugField(unique=True)  # category/nootboki/ - slug поле

    def __str__(self) -> str:
        return self.name

    def count_of_games(self):
        return self.products.count()
    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]


class Gallery(models.Model):
    """
    Модель альбома для фотографий
    """

    image = models.ImageField(
        verbose_name="Изображение", upload_to=user_directory_path)
    is_cover = models.BooleanField(verbose_name="Обложка?", default=False)
    product = models.ForeignKey(
        "Product", verbose_name="Продукт", related_name="images", on_delete=CASCADE
    )

    def __str__(self):
        return self.product.name

    class Meta:
        verbose_name = "Альбом"
        verbose_name_plural = "Альбомы"


class Product(models.Model):
    """
    Модель продукта, для продажи
    """

    category = models.ManyToManyField(
        "Category", verbose_name="Категория", related_name="products"
    )  # игры, например
    name = models.CharField(verbose_name="Имя продукта",
                            max_length=255, db_index=True)
    slug = models.SlugField(unique=True)

    description = models.TextField(verbose_name="Описание")
    price = models.DecimalField(
        verbose_name="Цена", max_digits=9, decimal_places=2)

    stock = models.PositiveIntegerField(verbose_name="Количество")
    available = models.BooleanField(verbose_name="Доступно", default=True)

    incarousel = models.BooleanField(
        verbose_name="Показывать в карусели", default=False
    )
    inbanner = models.BooleanField(
        verbose_name="Показывать в баннере", default=False)

    created_at = models.DateTimeField(
        verbose_name="Создано", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Обновлено", auto_now=True)

    def get_cover(self):
        return list(self.images.filter(is_cover=True))[0]

    class Meta:
        ordering = ("name",)
        index_together = (("id", "slug"),)
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("catalog:detail", kwargs={"game": self.slug})


class CartProduct(models.Model):
    """
    Модель наименования продукта в корзине
    """

    cart = models.ForeignKey("Cart", verbose_name="Корзина", on_delete=CASCADE)
    product = models.ForeignKey(
        "Product",
        verbose_name="Продукт",
        on_delete=CASCADE,
        related_name="related_products",
    )
    qty = models.PositiveIntegerField(
        default=1
    )  # кол-во продукта одного наименования, например 10 яйиц
    final_price = models.DecimalField(
        verbose_name="Общая цена", max_digits=9, decimal_places=2
    )  # общая цена карточки корзины

    def __str__(self) -> str:
        return f"Продукт: {self.product.name} в корзине {self.cart.owner.firstname}"


class Cart(models.Model):
    """
    Модель корзины
    """

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name="Владелец", on_delete=CASCADE
    )  # владелец корзины
    products = models.ManyToManyField(
        "CartProduct", blank=True, related_name="related_cart"
    )  # карточки продуктов
    total_products = models.PositiveIntegerField(
        default=0
    )  # кол-во наименований продукта в корзине, например: яйца, хлеб, рис - 3
    final_price = models.DecimalField(
        verbose_name="Общая цена", max_digits=9, decimal_places=2
    )  # общая цена корзины

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"


class CategoryAttribute(models.Model):
    """
    Модель ключей для категории
    """

    category = models.ForeignKey(
        "Category",
        verbose_name="Категория",
        on_delete=models.CASCADE,
        related_name="attributes",
    )  # категория
    
    name = models.CharField(
        verbose_name="Название атрибута", max_length=255
    )  # названия атрибута, то бишь ключ

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Атрибут категории"
        verbose_name_plural = "Атрибуты категорий"


class AttributeValue(models.Model):
    """
    Модель значений для атрибутов категрии
    """

    attribute = models.ForeignKey(
        "CategoryAttribute",
        verbose_name="Атрибут",
        on_delete=models.CASCADE,
        related_name="values",
    )  # атрибут, ключ

    product = models.ForeignKey(
        "Product",
        verbose_name="Значение атрибута для продукта",
        on_delete=models.CASCADE,
        related_name="values",
    )  # продукт

    value = models.CharField(
        verbose_name="Значение атрибута", max_length=255
    )  # значение атрибута

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = "Значение атрибута"
        verbose_name_plural = "Значения атрибутов"
