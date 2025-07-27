from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from app.core.config import settings

# Database engine
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# User Model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    workouts = relationship("Workout", back_populates="user")
    meals = relationship("Meal", back_populates="user")
    nutrition_logs = relationship("NutritionLog", back_populates="user")
    fitness_goals = relationship("FitnessGoal", back_populates="user")

# Workout Model
class Workout(Base):
    __tablename__ = "workouts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(Text)
    duration = Column(Integer)  # in minutes
    calories_burned = Column(Integer)
    workout_type = Column(String)  # strength, cardio, yoga, etc.
    difficulty = Column(String)  # beginner, intermediate, advanced
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="workouts")
    exercises = relationship("Exercise", back_populates="workout")

# Exercise Model
class Exercise(Base):
    __tablename__ = "exercises"
    
    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    name = Column(String)
    description = Column(Text)
    duration = Column(Integer)  # in seconds
    sets = Column(Integer)
    reps = Column(Integer)
    weight = Column(Float)
    rest_time = Column(Integer)  # in seconds
    muscle_groups = Column(String)  # JSON string
    instructions = Column(Text)  # JSON string
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    workout = relationship("Workout", back_populates="exercises")

# Meal Model
class Meal(Base):
    __tablename__ = "meals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(Text)
    calories = Column(Integer)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    fiber = Column(Float)
    meal_type = Column(String)  # breakfast, lunch, dinner, snack
    ingredients = Column(Text)  # JSON string
    instructions = Column(Text)  # JSON string
    prep_time = Column(Integer)  # in minutes
    difficulty = Column(String)  # easy, medium, hard
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="meals")

# Nutrition Log Model
class NutritionLog(Base):
    __tablename__ = "nutrition_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime(timezone=True), server_default=func.now())
    calories_consumed = Column(Integer)
    protein_consumed = Column(Float)
    carbs_consumed = Column(Float)
    fat_consumed = Column(Float)
    fiber_consumed = Column(Float)
    water_consumed = Column(Float)  # in liters
    notes = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="nutrition_logs")

# Fitness Goal Model
class FitnessGoal(Base):
    __tablename__ = "fitness_goals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    goal_type = Column(String)  # weight_loss, muscle_gain, endurance, etc.
    target_value = Column(Float)
    current_value = Column(Float)
    unit = Column(String)  # kg, lbs, minutes, etc.
    deadline = Column(DateTime(timezone=True))
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="fitness_goals")

# Food Scanner Log Model
class FoodScannerLog(Base):
    __tablename__ = "food_scanner_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_name = Column(String)
    confidence_score = Column(Float)
    calories = Column(Integer)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    fiber = Column(Float)
    nutrition_grade = Column(String)  # A, B, C, D, F
    image_path = Column(String)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User")

# AI Chat Log Model
class AIChatLog(Base):
    __tablename__ = "ai_chat_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message_type = Column(String)  # user, ai
    content = Column(Text)
    response_time = Column(Float)  # in seconds
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User") 