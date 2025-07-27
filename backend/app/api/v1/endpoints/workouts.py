from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import func

from app.core.database import get_db, User, Workout, Exercise
from app.core.security import get_current_active_user
from app.schemas.workout import WorkoutCreate, Workout as WorkoutSchema, WorkoutUpdate, WorkoutSummary
from app.schemas.workout import ExerciseCreate, Exercise as ExerciseSchema

router = APIRouter()

@router.post("/", response_model=WorkoutSchema)
def create_workout(
    workout: WorkoutCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new workout."""
    db_workout = Workout(
        user_id=current_user.id,
        name=workout.name,
        description=workout.description,
        duration=workout.duration,
        calories_burned=workout.calories_burned,
        workout_type=workout.workout_type,
        difficulty=workout.difficulty
    )
    
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    
    # Add exercises if provided
    if workout.exercises:
        for exercise_data in workout.exercises:
            db_exercise = Exercise(
                workout_id=db_workout.id,
                name=exercise_data.name,
                description=exercise_data.description,
                duration=exercise_data.duration,
                sets=exercise_data.sets,
                reps=exercise_data.reps,
                weight=exercise_data.weight,
                rest_time=exercise_data.rest_time,
                muscle_groups=exercise_data.muscle_groups,
                instructions=exercise_data.instructions
            )
            db.add(db_exercise)
        
        db.commit()
        db.refresh(db_workout)
    
    return db_workout

@router.get("/", response_model=List[WorkoutSummary])
def get_workouts(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all workouts for the current user."""
    workouts = db.query(Workout).filter(
        Workout.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return workouts

@router.get("/{workout_id}", response_model=WorkoutSchema)
def get_workout(
    workout_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific workout by ID."""
    workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    
    if not workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workout not found"
        )
    
    return workout

@router.put("/{workout_id}", response_model=WorkoutSchema)
def update_workout(
    workout_id: int,
    workout_update: WorkoutUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a workout."""
    db_workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    
    if not db_workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workout not found"
        )
    
    # Update workout fields
    update_data = workout_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_workout, field, value)
    
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.delete("/{workout_id}")
def delete_workout(
    workout_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a workout."""
    db_workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    
    if not db_workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workout not found"
        )
    
    db.delete(db_workout)
    db.commit()
    
    return {"message": "Workout deleted successfully"}

@router.post("/{workout_id}/complete")
def complete_workout(
    workout_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Mark a workout as completed."""
    db_workout = db.query(Workout).filter(
        Workout.id == workout_id,
        Workout.user_id == current_user.id
    ).first()
    
    if not db_workout:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workout not found"
        )
    
    db_workout.completed = True
    db.commit()
    db.refresh(db_workout)
    
    return {"message": "Workout completed successfully"}

@router.get("/stats/summary")
def get_workout_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get workout statistics for the current user."""
    total_workouts = db.query(Workout).filter(
        Workout.user_id == current_user.id
    ).count()
    
    completed_workouts = db.query(Workout).filter(
        Workout.user_id == current_user.id,
        Workout.completed == True
    ).count()
    
    total_duration = db.query(Workout).filter(
        Workout.user_id == current_user.id,
        Workout.completed == True
    ).with_entities(func.sum(Workout.duration)).scalar() or 0
    
    total_calories = db.query(Workout).filter(
        Workout.user_id == current_user.id,
        Workout.completed == True
    ).with_entities(func.sum(Workout.calories_burned)).scalar() or 0
    
    return {
        "total_workouts": total_workouts,
        "completed_workouts": completed_workouts,
        "total_duration_minutes": total_duration,
        "total_calories_burned": total_calories,
        "completion_rate": (completed_workouts / total_workouts * 100) if total_workouts > 0 else 0
    } 