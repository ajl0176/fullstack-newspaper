from django.urls import path


from .views import ArticleListCreateView, AdminArticleListCreateView, AdminListDetailView, UserArticleList, UserDetailList




urlpatterns = [
    path('', ArticleListCreateView.as_view()),
    path('admin/', AdminArticleListCreateView.as_view()),
    path('<int:pk>/', AdminListDetailView.as_view()),
    path('user/', UserArticleList.as_view()),
    path('user/<int:pk>', UserDetailList.as_view()),
]
