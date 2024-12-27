from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class CustomTokenAuthentication(TokenAuthentication):
    keyword = "Bearer"
