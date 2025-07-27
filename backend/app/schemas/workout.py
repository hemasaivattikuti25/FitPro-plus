from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ExerciseBase(BaseModel):
    name: str
    description: Optional[str] = None
    duration: int  # in seconds
    sets: Optional[int] = None
    reps: Optional[int] = None
    weight: Optional[float] = None
    rest_time: Optional[int] = None  # in seconds
    muscle_groups: Optional[str] = None  # JSON string
    instructions: Optional[str] = None  # JSON string

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    sets: Optional[int] = None
    reps: Optional[int] = None
    weight: Optional[float] = None
    rest_time: Optional[int] = None
    muscle_groups: Optional[str] = None
    instructions: Optional[str] = None

class Exercise(ExerciseBase):
    id: int
    workout_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class WorkoutBase(BaseModel):
    name: str
    description: Optional[str] = None
    duration: int  # in minutes
    calories_burned: Optional[int] = None
    workout_type: str  # strength, cardio, yoga, etc.
    difficulty: str  # beginner, intermediate, advanced

class WorkoutCreate(WorkoutBase):
    exercises: Optional[List[ExerciseCreate]] = []

class WorkoutUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    calories_burned: Optional[int] = None
    workout_type: Optional[str] = None
    difficulty: Optional[str] = None
    completed: Optional[bool] = None

class Workout(WorkoutBase):
    id: int
    user_id: int
    completed: bool
    created_at: datetime
    exercises: List[Exercise] = []

    class Config:
        from_attributes = True

class WorkoutSummary(BaseModel):
    id: int
    name: str
    duration: int
    calories_burned: Optional[int]
    workout_type: str
    difficulty: str
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True 