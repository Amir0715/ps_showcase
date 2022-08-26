from django.views.generic import DetailView, ListView
from django.views.generic.base import View, TemplateView
from catalog.models import CategoryAttribute, Product, Category
from django.shortcuts import render
from catalog.filters import ProductFilter


class IndexView(ListView):
    template_name = "index/index.html"
    model = Product
    context_object_name = "games"

    def get_queryset(self):
        q = super().get_queryset().filter(available=True)
        self.new_games = list(
            q.filter(category__name__icontains="Новые игры"))[:8]
        self.best_games = list(
            q.filter(category__name__icontains="Лучшие игры"))[:8]
        self.soon_games = list(
            q.filter(category__name__icontains="Скоро в продаже"))[:8]
        self.game_category = list(
            Category.objects.filter(parent__name__icontains="Игры")
        )
        self.carousel_games = list(
            q.filter(incarousel=True))
        self.banner_games = list(
            q.filter(inbanner=True))[:2]
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
            parent__name__icontains="Игры"
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
    # filterset_class = ProductFilter

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["game_category"] = self.game_category
        context["category"] = self.category
        context["genres"] = self.genres
        return context

    def get_queryset(self):
        queryset = super().get_queryset()

        self.game_category = Category.objects.filter(
            parent__name__icontains="Игры"
        )

        self.category = Category.objects.get(
            slug=self.kwargs.setdefault("category", "games")
        )

        self.genres = CategoryAttribute.objects.get(name="Жанр").values.all()

        q = queryset.filter(available=True).filter(category=self.category)
        if self.request.GET:
            q = ProductFilter(self.request.GET, queryset=q).qs
        return q

# TODO: добавить страницу с инструкцией как купить

class HowBuy(TemplateView):
    template_name = "howbuy/how_buy.html"
