from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users...')
        users_data = [
            {'email': 'ironman@avengers.com', 'name': 'Tony Stark', 'age': 45},
            {'email': 'captainamerica@avengers.com', 'name': 'Steve Rogers', 'age': 105},
            {'email': 'blackwidow@avengers.com', 'name': 'Natasha Romanoff', 'age': 38},
            {'email': 'thor@avengers.com', 'name': 'Thor Odinson', 'age': 1500},
            {'email': 'hulk@avengers.com', 'name': 'Bruce Banner', 'age': 49},
            {'email': 'batman@dc.com', 'name': 'Bruce Wayne', 'age': 40},
            {'email': 'superman@dc.com', 'name': 'Clark Kent', 'age': 35},
            {'email': 'wonderwoman@dc.com', 'name': 'Diana Prince', 'age': 3000},
            {'email': 'flash@dc.com', 'name': 'Barry Allen', 'age': 28},
            {'email': 'greenlantern@dc.com', 'name': 'Hal Jordan', 'age': 36},
        ]
        users = {}
        for ud in users_data:
            user = User.objects.create(**ud)
            users[ud['email']] = user
            self.stdout.write(f"  Created user: {user.name}")

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel')
        team_marvel.members.set([
            users['ironman@avengers.com'],
            users['captainamerica@avengers.com'],
            users['blackwidow@avengers.com'],
            users['thor@avengers.com'],
            users['hulk@avengers.com'],
        ])
        self.stdout.write(f"  Created team: {team_marvel.name}")

        team_dc = Team.objects.create(name='Team DC')
        team_dc.members.set([
            users['batman@dc.com'],
            users['superman@dc.com'],
            users['wonderwoman@dc.com'],
            users['flash@dc.com'],
            users['greenlantern@dc.com'],
        ])
        self.stdout.write(f"  Created team: {team_dc.name}")

        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': users['ironman@avengers.com'], 'activity_type': 'Running', 'duration': 30.0, 'date': date(2024, 1, 1)},
            {'user': users['captainamerica@avengers.com'], 'activity_type': 'Cycling', 'duration': 45.0, 'date': date(2024, 1, 2)},
            {'user': users['blackwidow@avengers.com'], 'activity_type': 'Yoga', 'duration': 60.0, 'date': date(2024, 1, 3)},
            {'user': users['thor@avengers.com'], 'activity_type': 'Weightlifting', 'duration': 50.0, 'date': date(2024, 1, 4)},
            {'user': users['hulk@avengers.com'], 'activity_type': 'Swimming', 'duration': 40.0, 'date': date(2024, 1, 5)},
            {'user': users['batman@dc.com'], 'activity_type': 'Martial Arts', 'duration': 90.0, 'date': date(2024, 1, 1)},
            {'user': users['superman@dc.com'], 'activity_type': 'Flying', 'duration': 120.0, 'date': date(2024, 1, 2)},
            {'user': users['wonderwoman@dc.com'], 'activity_type': 'Combat Training', 'duration': 75.0, 'date': date(2024, 1, 3)},
            {'user': users['flash@dc.com'], 'activity_type': 'Running', 'duration': 5.0, 'date': date(2024, 1, 4)},
            {'user': users['greenlantern@dc.com'], 'activity_type': 'Ring Training', 'duration': 35.0, 'date': date(2024, 1, 5)},
        ]
        for ad in activities_data:
            activity = Activity.objects.create(**ad)
            self.stdout.write(f"  Created activity: {activity}")

        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            {'user': users['ironman@avengers.com'], 'score': 950},
            {'user': users['captainamerica@avengers.com'], 'score': 870},
            {'user': users['blackwidow@avengers.com'], 'score': 820},
            {'user': users['thor@avengers.com'], 'score': 990},
            {'user': users['hulk@avengers.com'], 'score': 860},
            {'user': users['batman@dc.com'], 'score': 930},
            {'user': users['superman@dc.com'], 'score': 1000},
            {'user': users['wonderwoman@dc.com'], 'score': 970},
            {'user': users['flash@dc.com'], 'score': 910},
            {'user': users['greenlantern@dc.com'], 'score': 840},
        ]
        for ld in leaderboard_data:
            entry = Leaderboard.objects.create(**ld)
            self.stdout.write(f"  Created leaderboard entry: {entry}")

        self.stdout.write('Creating workouts...')
        workouts_data = [
            {'name': 'Iron Man Cardio Blast', 'description': 'High-intensity interval training inspired by Tony Stark\'s arc reactor endurance.', 'duration': 30.0},
            {'name': 'Captain America Shield Drill', 'description': 'Full-body strength and agility workout using shield throw simulations.', 'duration': 45.0},
            {'name': 'Black Widow Flexibility Flow', 'description': 'Yoga and stretching routine for combat flexibility and recovery.', 'duration': 60.0},
            {'name': 'Thor Thunder Lift', 'description': 'Heavy compound lifts to build Asgardian-level strength.', 'duration': 50.0},
            {'name': 'Hulk Smash Power', 'description': 'Explosive power training with plyometrics and heavy resistance.', 'duration': 40.0},
            {'name': 'Batman Dark Knight Conditioning', 'description': 'Functional fitness and martial arts conditioning like the Caped Crusader.', 'duration': 90.0},
            {'name': 'Superman Core Power', 'description': 'Core strength and endurance training for Man of Steel performance.', 'duration': 60.0},
            {'name': 'Wonder Woman Warrior Workout', 'description': 'Combat-style circuit training from Themyscira.', 'duration': 75.0},
            {'name': 'Flash Speed Sprint', 'description': 'Speed intervals and agility drills inspired by the Scarlet Speedster.', 'duration': 20.0},
            {'name': 'Green Lantern Willpower Circuit', 'description': 'Mental and physical endurance training using bodyweight circuits.', 'duration': 35.0},
        ]
        for wd in workouts_data:
            workout = Workout.objects.create(**wd)
            self.stdout.write(f"  Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
