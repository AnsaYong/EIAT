from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class UserTests(APITestCase):

    def setUp(self):
        # Create a user to use in tests
        self.user_data = {
            "email": "testuser@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password123",
            "password_confirmation": "password123",
            "role": "admin",
        }
        self.register_url = reverse("register-list")
        self.login_url = reverse("login")  # Adjust if you have a specific login URL

    def test_user_registration(self):
        """Test the user registration."""
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["email"], self.user_data["email"])

    def test_user_login(self):
        """Test the user login."""
        # First, register the user
        self.client.post(self.register_url, self.user_data, format="json")
        # Now, login
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in response.data)

    def test_user_permissions(self):
        """Test the permissions of the user."""
        # First, register and login the user
        self.client.post(self.register_url, self.user_data, format="json")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        response = self.client.post(self.login_url, login_data, format="json")
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Test accessing a protected resource
        user_list_url = reverse("user-list")
        response = self.client.get(user_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_sync_queue_creation(self):
        """Test creating a sync queue entry."""
        # Create a user and login
        self.client.post(self.register_url, self.user_data, format="json")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        response = self.client.post(self.login_url, login_data, format="json")
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Create sync queue
        sync_queue_data = {
            "action_type": "create",
            "data_type": "project",
            "data": {"project_name": "Test Project"},
        }
        sync_queue_url = reverse("sync-queue-list")
        response = self.client.post(sync_queue_url, sync_queue_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class RoleChangeTests(APITestCase):

    def setUp(self):
        self.user_data = {
            "email": "testuser@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password123",
            "password_confirmation": "password123",
            "role": "project_developer",
        }
        self.register_url = reverse("register-list")
        self.login_url = reverse("login")  # Adjust if you have a specific login URL

    def test_role_change_request(self):
        """Test the role change request process."""
        # Register and login the user
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }
        response = self.client.post(self.login_url, login_data, format="json")
        token = response.data["token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Request role change
        role_change_data = {"requested_role": "consultant"}
        role_change_url = reverse("role-change-request-list")
        response = self.client.post(role_change_url, role_change_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["requested_role"], "consultant")
