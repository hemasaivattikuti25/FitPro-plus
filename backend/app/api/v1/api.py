from fastapi import APIRouter

from app.api.v1.endpoints import auth, workouts, meals, nutrition, ai_coach, food_scanner

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(workouts.router, prefix="/workouts", tags=["workouts"])
api_router.include_router(meals.router, prefix="/meals", tags=["meals"])
api_router.include_router(nutrition.router, prefix="/nutrition", tags=["nutrition"])
api_router.include_router(ai_coach.router, prefix="/ai-coach", tags=["ai-coach"])
api_router.include_router(food_scanner.router, prefix="/food-scanner", tags=["food-scanner"]) 