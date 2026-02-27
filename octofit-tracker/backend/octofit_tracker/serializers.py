from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    current_team = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['_id', 'id', 'username', 'email', 'name', 'age', 'current_team']

    def get__id(self, obj):
        return str(obj.pk)

    def get_current_team(self, obj):
        from .models import Team
        team = Team.objects.filter(members=obj).first()
        if team:
            return {'id': team.pk, 'name': team.name}
        return None


class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['_id', 'id', 'name', 'members']

    def get__id(self, obj):
        return str(obj.pk)


class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['_id', 'id', 'user', 'activity_type', 'duration', 'date']

    def get__id(self, obj):
        return str(obj.pk)


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['_id', 'id', 'user', 'score']

    def get__id(self, obj):
        return str(obj.pk)


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['_id', 'id', 'name', 'description', 'duration']

    def get__id(self, obj):
        return str(obj.pk)
