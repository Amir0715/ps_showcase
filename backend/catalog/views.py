from django.views.generic import DetailView, ListView
from django.views.generic.base import View
from catalog.models import Product, Category
from django.shortcuts import render


class IndexView(ListView):
    template_name = "index/index.html"
    model = Product
    context_object_name = "games"

    def get_queryset(self):
        q = super().get_queryset().filter(available=True)
        self.new_games = list(
            q.filter(category__name__icontains="Новые игры"))[:4]
        self.best_games = list(
            q.filter(category__name__icontains="Лучшие игры"))[:4]
        self.soon_games = list(q.filter(category__name__icontains="Скоро в продаже"))[
            :4
        ]
        self.carousel_games = list(q.filter(incarousel=True))
        self.banner_games = list(q.filter(inbanner=True))[:2]
        self.game_category = list(
            Category.objects.filter(parent_category__name__icontains="Игры")
        )
        return q

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["new_games"] = self.new_games
        context["best_games"] = self.best_games
        context["soon_games"] = self.soon_games
        context["carousel_games"] = self.carousel_games
        context["banner_games"] = self.banner_games
        context["game_category"] = self.game_category
        return context


class GameDetailView(View):
    template_name = "game/game_detail.html"
    model = Product

    def get_context_data(self, **kwargs):
        context = {}
        context["game_category"] = Category.objects.filter(
            parent_category__name__icontains="Игры"
        )
        context["game"] = self.get_queryset()
        return context

    def get_queryset(self):
        q = Product.objects.filter(available=True)
        return q.get(slug=self.kwargs.get("game", ""))

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, self.get_context_data())


class GameListView(ListView):
    template_name = "game/game_list.html"
    model = Product
    context_object_name = "games"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["game_category"] = self.game_category
        context["category"] = self.category
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        self.game_category = Category.objects.filter(
            parent_category__name__icontains="Игры"
        )
        self.category = Category.objects.get(
            slug=self.kwargs.setdefault("category", "games")
        )
        queryset.filter(category=self.category)
        return queryset.filter(available=True)