from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','password','first_name','last_name']
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'short_bio']

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at', 'likes']
        extra_kwargs = {'author':{'read_only':True}}
        