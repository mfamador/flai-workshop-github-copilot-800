from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='spiderman@marvel.com',
            name='Peter Parker',
            age=22
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Peter Parker')
        self.assertEqual(self.user.email, 'spiderman@marvel.com')
        self.assertEqual(self.user.age, 22)

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Peter Parker')


class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='wolverine@xmen.com',
            name='Logan',
            age=200
        )
        self.team = Team.objects.create(name='Team X-Men')
        self.team.members.add(self.user)

    def tearDown(self):
        Team.objects.all().delete()
        User.objects.all().delete()

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team X-Men')

    def test_team_members(self):
        self.assertIn(self.user, self.team.members.all())

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team X-Men')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='flash@dc.com',
            name='Barry Allen',
            age=28
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=10.0,
            date=date(2024, 1, 1)
        )

    def tearDown(self):
        Activity.objects.all().delete()
        User.objects.all().delete()

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 10.0)

    def test_activity_str(self):
        self.assertIn('Barry Allen', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='aquaman@dc.com',
            name='Arthur Curry',
            age=35
        )
        self.entry = Leaderboard.objects.create(user=self.user, score=750)

    def tearDown(self):
        Leaderboard.objects.all().delete()
        User.objects.all().delete()

    def test_leaderboard_entry(self):
        self.assertEqual(self.entry.score, 750)

    def test_leaderboard_str(self):
        self.assertIn('Arthur Curry', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Aquaman Swim Circuit',
            description='Underwater resistance training for oceanic endurance.',
            duration=45.0
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Aquaman Swim Circuit')
        self.assertEqual(self.workout.duration, 45.0)

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Aquaman Swim Circuit')


class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='thor@avengers.com',
            name='Thor Odinson',
            age=1500
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user(self):
        url = reverse('user-detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Thor Odinson')


class TeamAPITest(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Avengers')

    def tearDown(self):
        Team.objects.all().delete()

    def test_list_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='greenarrow@dc.com',
            name='Oliver Queen',
            age=34
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Archery',
            duration=60.0,
            date=date(2024, 3, 1)
        )

    def tearDown(self):
        Activity.objects.all().delete()
        User.objects.all().delete()

    def test_list_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='blackpanther@marvel.com',
            name='T\'Challa',
            age=38
        )
        self.entry = Leaderboard.objects.create(user=self.user, score=980)

    def tearDown(self):
        Leaderboard.objects.all().delete()
        User.objects.all().delete()

    def test_list_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Black Panther Agility Drill',
            description='Vibranium-powered agility and reflexes training.',
            duration=55.0
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_list_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
