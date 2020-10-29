from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied


from .models import Article
from .serializers import ArticleSerializer





class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AdminArticleListCreateView(generics.ListCreateAPIView):
    permission_class = (permissions.IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class AdminListDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_class = (permissions.IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class UserArticleList(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(user=user)


class UserDetailList(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated)
    serializer_class = ArticleSerializer

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(user=user)
