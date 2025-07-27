"use client";

import { useState, useEffect } from 'react';
import { Plus, Clock, Flame, Users, ChefHat, ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietaryTags: string[];
  ingredients: string[];
  instructions: string[];
  imageUrl?: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  aiGenerated?: boolean;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function MealPlanner() {
  console.log("MealPlanner component loading");

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [todaysMeals, setTodaysMeals] = useState<Meal[]>([]);
  const [nutritionGoals] = useState<NutritionGoals>({
    calories: 2200,
    protein: 165,
    carbs: 275,
    fat: 73
  });

  // Sample meals data
  const sampleMeals: Meal[] = [
    {
      id: '1',
      name: 'Protein Power Smoothie',
      description: 'Creamy blend of banana, protein powder, and almond butter',
      calories: 320,
      protein: 25,
      carbs: 28,
      fat: 12,
      prepTime: 5,
      servings: 1,
      difficulty: 'Easy',
      dietaryTags: ['High Protein', 'Gluten-Free', 'Vegetarian'],
      mealType: 'breakfast',
      ingredients: [
        '1 banana',
        '1 scoop vanilla protein powder',
        '1 tbsp almond butter',
        '1 cup almond milk',
        '1 tsp honey',
        'Ice cubes'
      ],
      instructions: [
        'Add all ingredients to blender',
        'Blend until smooth and creamy',
        'Pour into glass and enjoy immediately'
      ],
      aiGenerated: true
    },
    {
      id: '2',
      name: 'Quinoa Power Bowl',
      description: 'Nutrient-dense bowl with quinoa, roasted vegetables, and tahini dressing',
      calories: 485,
      protein: 18,
      carbs: 62,
      fat: 18,
      prepTime: 25,
      servings: 2,
      difficulty: 'Medium',
      dietaryTags: ['Vegan', 'High Fiber', 'Gluten-Free'],
      mealType: 'lunch',
      ingredients: [
        '1 cup quinoa',
        '1 bell pepper, diced',
        '1 zucchini, sliced',
        '1 cup cherry tomatoes',
        '2 tbsp olive oil',
        '3 tbsp tahini',
        '2 tbsp lemon juice',
        'Fresh herbs'
      ],
      instructions: [
        'Cook quinoa according to package directions',
        'Roast vegetables at 400°F for 20 minutes',
        'Mix tahini with lemon juice for dressing',
        'Combine quinoa and vegetables',
        'Drizzle with dressing and garnish with herbs'
      ]
    },
    {
      id: '3',
      name: 'Grilled Salmon with Sweet Potato',
      description: 'Omega-3 rich salmon with roasted sweet potato and asparagus',
      calories: 520,
      protein: 35,
      carbs: 35,
      fat: 22,
      prepTime: 30,
      servings: 1,
      difficulty: 'Medium',
      dietaryTags: ['High Protein', 'Omega-3', 'Gluten-Free'],
      mealType: 'dinner',
      ingredients: [
        '6 oz salmon fillet',
        '1 medium sweet potato',
        '1 bunch asparagus',
        '2 tbsp olive oil',
        'Lemon slices',
        'Salt and pepper',
        'Fresh dill'
      ],
      instructions: [
        'Preheat grill to medium-high heat',
        'Cut sweet potato into wedges and roast',
        'Season salmon with salt, pepper, and dill',
        'Grill salmon 4-5 minutes per side',
        'Grill asparagus for 3-4 minutes',
        'Serve with lemon slices'
      ]
    },
    {
      id: '4',
      name: 'Greek Yogurt Berry Bowl',
      description: 'Probiotic-rich yogurt with fresh berries and granola',
      calories: 285,
      protein: 20,
      carbs: 35,
      fat: 8,
      prepTime: 3,
      servings: 1,
      difficulty: 'Easy',
      dietaryTags: ['High Protein', 'Probiotic', 'Vegetarian'],
      mealType: 'snack',
      ingredients: [
        '1 cup Greek yogurt',
        '1/2 cup mixed berries',
        '2 tbsp granola',
        '1 tbsp honey',
        '1 tbsp chia seeds'
      ],
      instructions: [
        'Place yogurt in bowl',
        'Top with berries and granola',
        'Drizzle with honey',
        'Sprinkle chia seeds on top'
      ]
    }
  ];

  // AI-generated meal suggestions based on available ingredients
  const [pantryItems] = useState([
    'Chicken breast', 'Rice', 'Broccoli', 'Eggs', 'Spinach', 
    'Avocado', 'Tomatoes', 'Onions', 'Garlic', 'Olive oil'
  ]);

  console.log("Available meals:", sampleMeals);
  console.log("Pantry items:", pantryItems);

  useEffect(() => {
    // Initialize with breakfast meal
    setTodaysMeals([sampleMeals[0]]);
  }, []);

  const addMealToDay = (meal: Meal) => {
    console.log("Adding meal to day:", meal.name);
    setTodaysMeals([...todaysMeals, meal]);
  };

  const removeMealFromDay = (mealId: string) => {
    console.log("Removing meal from day:", mealId);
    setTodaysMeals(todaysMeals.filter(meal => meal.id !== mealId));
  };

  const calculateTotalNutrition = () => {
    return todaysMeals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const totalNutrition = calculateTotalNutrition();
  const caloriesProgress = (totalNutrition.calories / nutritionGoals.calories) * 100;
  const proteinProgress = (totalNutrition.protein / nutritionGoals.protein) * 100;
  const carbsProgress = (totalNutrition.carbs / nutritionGoals.carbs) * 100;
  const fatProgress = (totalNutrition.fat / nutritionGoals.fat) * 100;

  const generateAIMealSuggestions = () => {
    console.log("Generating AI meal suggestions based on pantry items");
    return [
      {
        id: 'ai-1',
        name: 'AI Chicken & Broccoli Stir Fry',
        description: 'Quick stir fry using your available chicken and broccoli',
        calories: 380,
        protein: 32,
        carbs: 18,
        fat: 14,
        prepTime: 15,
        servings: 1,
        difficulty: 'Easy' as const,
        dietaryTags: ['High Protein', 'Low Carb'],
        mealType: 'dinner' as const,
        ingredients: pantryItems.filter(item => 
          ['Chicken breast', 'Broccoli', 'Garlic', 'Olive oil'].includes(item)
        ),
        instructions: [
          'Heat olive oil in pan',
          'Cook chicken until golden',
          'Add broccoli and garlic',
          'Stir fry for 5-7 minutes'
        ],
        aiGenerated: true
      }
    ];
  };

  const aiSuggestions = generateAIMealSuggestions();

  if (selectedMeal) {
    return (
      <div className="space-y-6" data-macaly="meal-detail">
        <Button 
          onClick={() => setSelectedMeal(null)}
          variant="outline"
          data-macaly="back-to-meals"
        >
          ← Back to Meal Planner
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">{selectedMeal.name}</h2>
                <p className="text-gray-600">{selectedMeal.description}</p>
              </div>
              {selectedMeal.aiGenerated && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  AI Generated
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nutrition & Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Flame className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-800">{selectedMeal.calories}</p>
                    <p className="text-sm text-green-600">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-800">{selectedMeal.prepTime}</p>
                    <p className="text-sm text-blue-600">Minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Nutrition (per serving)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium">{selectedMeal.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbs:</span>
                      <span className="font-medium">{selectedMeal.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat:</span>
                      <span className="font-medium">{selectedMeal.fat}g</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Dietary Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeal.dietaryTags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <ul className="space-y-1 text-sm">
                    {selectedMeal.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions</h4>
                  <ol className="space-y-2 text-sm">
                    {selectedMeal.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => addMealToDay(selectedMeal)}
                className="flex-1"
                data-macaly="add-meal-to-day"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Today
              </Button>
              <Button variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Shopping List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-macaly="meal-planner">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-2" data-macaly="nutrition-title">
          Smart Meal Planner 🥗
        </h2>
        <p className="text-gray-600" data-macaly="nutrition-subtitle">
          AI-powered nutrition planning with your pantry items
        </p>
      </div>

      {/* Today's Nutrition Progress */}
      <Card className="bg-gradient-to-r from-accent to-green-400 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Today's Nutrition Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-green-100 text-sm">Calories</p>
              <p className="text-2xl font-bold">{totalNutrition.calories}</p>
              <p className="text-green-100 text-sm">of {nutritionGoals.calories}</p>
              <Progress value={caloriesProgress} className="mt-2 bg-green-200" />
            </div>
            <div>
              <p className="text-green-100 text-sm">Protein</p>
              <p className="text-2xl font-bold">{totalNutrition.protein}g</p>
              <p className="text-green-100 text-sm">of {nutritionGoals.protein}g</p>
              <Progress value={proteinProgress} className="mt-2 bg-green-200" />
            </div>
            <div>
              <p className="text-green-100 text-sm">Carbs</p>
              <p className="text-2xl font-bold">{totalNutrition.carbs}g</p>
              <p className="text-green-100 text-sm">of {nutritionGoals.carbs}g</p>
              <Progress value={carbsProgress} className="mt-2 bg-green-200" />
            </div>
            <div>
              <p className="text-green-100 text-sm">Fat</p>
              <p className="text-2xl font-bold">{totalNutrition.fat}g</p>
              <p className="text-green-100 text-sm">of {nutritionGoals.fat}g</p>
              <Progress value={fatProgress} className="mt-2 bg-green-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="browse">Browse Meals</TabsTrigger>
          <TabsTrigger value="today">Today's Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="h-5 w-5" />
                <h3 className="font-semibold">AI Chef Recommendations</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Based on your pantry: {pantryItems.slice(0, 4).join(', ')}...
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {aiSuggestions.map((meal) => (
              <Card key={meal.id} className="hover:shadow-lg transition-shadow border-purple-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      AI
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {meal.calories} cal
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.prepTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {meal.servings} serving
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedMeal(meal)}
                    size="sm"
                    className="w-full"
                    data-macaly={`view-ai-meal-${meal.id}`}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browse" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleMeals.map((meal) => (
              <Card key={meal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-500">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {meal.calories} cal
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.prepTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs px-1">
                        {meal.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {meal.dietaryTags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setSelectedMeal(meal)}
                    size="sm"
                    className="w-full"
                    data-macaly={`view-meal-${meal.id}`}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Today's Meal Plan</h3>
            <p className="text-gray-600">
              {todaysMeals.length} meal{todaysMeals.length !== 1 ? 's' : ''} planned
            </p>
          </div>

          {todaysMeals.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-gray-500 mb-4">No meals planned for today</p>
                <Button onClick={() => addMealToDay(sampleMeals[0])}>
                  Add Your First Meal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {todaysMeals.map((meal, index) => (
                <Card key={`${meal.id}-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{meal.name}</h4>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>{meal.calories} cal</span>
                          <span>{meal.protein}g protein</span>
                          <span>{meal.prepTime} min</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setSelectedMeal(meal)}
                          size="sm"
                          variant="outline"
                        >
                          View
                        </Button>
                        <Button 
                          onClick={() => removeMealFromDay(meal.id)}
                          size="sm"
                          variant="destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}