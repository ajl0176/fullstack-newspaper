from django.urls import include, path

app_name = 'api'

urlpatterns = [
    # path('', include('accounts.urls')),
    path('profile/', include('accounts.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('rest-auth/login/', view.CustomAuthToken.as_view(), name='login'),
    path('articles/', include('articles.urls')),
]
