from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    # path('users/', include(router.urls)),
	path('register/', views.CreateUserView.as_view(), name = 'user-create'),
	path('profile/', views.ProfileView.as_view(), name='profile'),
    path('posts/', views.PostListCreate.as_view(), name ='post-list-create'),
	path('post-delete/<int:pk>', views.PostDelete.as_view(), name = 'delete-post'),
	path('post/<int:pk>', views.PostRetrieve.as_view(), name = 'post-retr'),
	path('posts/<int:post_id>/like/', views.PostLikeToggle.as_view(), name='toggle-like'),
	path('posts/<int:post_id>/comments/', views.CommentListCreate.as_view(), name='list-create-comment'),
]
