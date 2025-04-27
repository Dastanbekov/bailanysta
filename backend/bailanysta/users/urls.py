from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    # path('users/', include(router.urls)),
	path('reg/', views.CreateUserView.as_view(), name = 'user-create'),
    path('posts/', views.PostListCreate.as_view(), name ='post-list-create'),
	path('post-delete/<int:pk>', views.PostDelete.as_view(), name = 'delete-post'),
	path('post/<int:pk>', views.PostRetrieve.as_view(), name = 'post-retr'),
]
