from django.contrib import admin
from django.db.models import fields
from django.utils.safestring import mark_safe
from .models import (
    AttributeValue,
    Gallery,
    Product,
    Category,
    Cart,
    CartProduct,
    CategoryAttribute,
)
from django.urls import reverse
from django.utils.http import urlencode


class GalleryInline(admin.TabularInline):
    model = Gallery
    readonly_fields = ["image_preview", ]

    def image_preview(self, obj):
        return mark_safe('<img src="{}" style="max-width: 500px;" />'.format(obj.image.url))


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = [
        "product",
        "is_cover",
        "image_tag",
    ]

    list_editable = [
        "is_cover"
    ]

    list_filter = [
        "product",
        "is_cover",
    ]

    fieldsets = (
        (None, {
            "fields": (
                "image",
                ("product",
                 "is_cover",),
                "image_preview",
            ),
        }),
    )

    readonly_fields = ["image_preview", ]

    def image_preview(self, obj):
        return mark_safe('<img src="{}" style="max-width: 1200px;" />'.format(obj.image.url))

    def image_tag(self, obj):
        return mark_safe('<img src="{}" width="100px" />'.format(obj.image.url))

    image_tag.short_description = 'Изображение'


class AttributeValueInline(admin.TabularInline):
    model = AttributeValue


class CategoryAttributeInline(admin.TabularInline):
    model = CategoryAttribute


@admin.register(CategoryAttribute)
class CategoryAttributeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "category_url",
    ]

    def category_url(self, obj):
        return mark_safe('<a href="{}">{}</a>'.format(
            reverse("admin:catalog_category_change", args=(obj.category.pk, )),
            obj.category
        ))

    category_url.short_description = 'category'


@admin.register(AttributeValue)
class AttributeValueAdmin(admin.ModelAdmin):
    list_display = [
        "attribute_url",
        "product_url",
        "value",
        "attribute_category_url"
    ]

    fieldsets = ((None, {
        "fields": (
            ("attribute",
             "value"),
            "product",
        )},
    ),)

    list_display_links = [
        "value",
    ]

    def product_url(self, obj):
        return mark_safe('<a href="{}">{}</a>'.format(
            reverse("admin:catalog_product_change", args=(obj.product.pk, )),
            obj.product
        ))

    product_url.short_description = 'Продукт'

    def attribute_category_url(self, obj):
        return mark_safe('<a href="{}">{}</a>'.format(
            reverse("admin:catalog_category_change",
                    args=(obj.attribute.category.pk, )),
            obj.attribute.category
        ))

    attribute_category_url.short_description = 'Категория'

    def attribute_url(self, obj):
        return mark_safe('<a href="{}">{}</a>'.format(
            reverse("admin:catalog_categoryattribute_change",
                    args=(obj.attribute.pk, )),
            obj.attribute
        ))

    attribute_url.short_description = 'Ключ'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "price",
        "stock",
        "available",
        "incarousel",
        "inbanner",
        "updated_at",
    ]
    list_display_links = [
        "name",
    ]
    list_filter = [
        "category",
        "available",
        "incarousel",
        "inbanner",
        "created_at",
        "updated_at",
    ]

    search_fields = ['name', 'category__name']

    inlines = [AttributeValueInline, GalleryInline]

    list_editable = ["price", "stock", "available", "inbanner", "incarousel"]
    filter_horizontal = ("category", )
    readonly_fields = ("created_at", "updated_at",)

    fieldsets = (
        (None, {
            "fields": (
                "name",
                "description",
                "slug",
            ),
        }),
        ("Числа", {
            "fields": (
                ("price",
                 "stock",),
            ),
        }),
        (None, {
            "fields": (
                "category",
            ),
        }),
        ("Выбор", {
            "fields": (
                ("available",
                 "incarousel",
                 "inbanner",),
            ),
        }),
        ("Даты", {
            "fields": (
                "created_at",
                "updated_at",
            ),
        }),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "parent",
        "count_of_games",
    ]

    list_display_links = [
        "name",
    ]

    list_filter = [
        "parent",
    ]

    list_editable = ["parent", ]

    search_fields = ['name']

    inlines = [CategoryAttributeInline, ]


admin.site.register(CartProduct)
admin.site.register(Cart)
