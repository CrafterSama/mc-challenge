from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from shop.views import OrderViewSet, ProductViewSet, UserViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("orders", OrderViewSet, basename="order")
router.register("user", UserViewSet, basename="user")

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(),
    name='token_refresh'),
]
