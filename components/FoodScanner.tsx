"use client";

import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Search, Zap, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScannedFood {
  id: string;
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  serving_size: string;
  alternatives?: {
    name: string;
    calories: number;
    healthScore: number;
  }[];
  nutritionGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  tags: string[];
}

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiry?: string;
  addedDate: string;
}

export default function FoodScanner() {
  console.log("FoodScanner component loading");

  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'pantry'>('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<ScannedFood | null>(null);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Protein',
      quantity: '2 lbs',
      expiry: '2025-07-10',
      addedDate: '2025-07-05'
    },
    {
      id: '2',
      name: 'Broccoli',
      category: 'Vegetables',
      quantity: '1 bunch',
      expiry: '2025-07-08',
      addedDate: '2025-07-06'
    },
    {
      id: '3',
      name: 'Rice',
      category: 'Grains',
      quantity: '5 lbs bag',
      addedDate: '2025-07-01'
    }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("Current scan mode:", scanMode);
  console.log("Pantry items:", pantryItems);

  // Simulate AI food recognition
  const simulateFoodRecognition = useCallback(async (imageData?: string): Promise<ScannedFood> => {
    console.log("Simulating food recognition with AI");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock different food recognition results
    const mockResults: ScannedFood[] = [
      {
        id: '1',
        name: 'Grilled Chicken Breast',
        confidence: 0.94,
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        serving_size: '100g',
        nutritionGrade: 'A',
        tags: ['High Protein', 'Low Carb', 'Lean'],
        alternatives: [
          { name: 'Grilled Turkey Breast', calories: 135, healthScore: 95 },
          { name: 'Baked Cod', calories: 105, healthScore: 90 }
        ]
      },
      {
        id: '2',
        name: 'Cheese Pizza Slice',
        confidence: 0.89,
        calories: 285,
        protein: 12,
        carbs: 36,
        fat: 10,
        fiber: 2,
        serving_size: '1 slice (107g)',
        nutritionGrade: 'C',
        tags: ['High Carb', 'Processed'],
        alternatives: [
          { name: 'Cauliflower Crust Pizza', calories: 180, healthScore: 75 },
          { name: 'Greek Salad', calories: 150, healthScore: 85 }
        ]
      },
      {
        id: '3',
        name: 'Fresh Apple',
        confidence: 0.96,
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        fiber: 4,
        serving_size: '1 medium (182g)',
        nutritionGrade: 'A',
        tags: ['Natural', 'High Fiber', 'Antioxidants'],
        alternatives: [
          { name: 'Fresh Pear', calories: 85, healthScore: 90 },
          { name: 'Orange', calories: 80, healthScore: 88 }
        ]
      }
    ];

    // Return random result for demo
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  }, []);

  const startCameraScanning = async () => {
    console.log("Starting camera scanning");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access is required for food scanning. Please allow camera permissions.");
    }
  };

  const capturePhoto = async () => {
    console.log("Capturing photo for food recognition");
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      
      try {
        const result = await simulateFoodRecognition(imageData);
        setScannedResult(result);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error("Food recognition failed:", error);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Processing uploaded image");
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    try {
      const result = await simulateFoodRecognition();
      setScannedResult(result);
    } catch (error) {
      console.error("Food recognition failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  const generateMealSuggestions = () => {
    console.log("Generating AI meal suggestions from pantry");
    return [
      {
        name: 'Chicken & Broccoli Stir Fry',
        ingredients: ['Chicken Breast', 'Broccoli', 'Rice'],
        prepTime: 20,
        calories: 420,
        difficulty: 'Easy'
      },
      {
        name: 'Chicken Fried Rice',
        ingredients: ['Chicken Breast', 'Rice'],
        prepTime: 15,
        calories: 380,
        difficulty: 'Easy'
      }
    ];
  };

  const addToPantry = (foodName: string) => {
    console.log("Adding to pantry:", foodName);
    const newItem: PantryItem = {
      id: Date.now().toString(),
      name: foodName,
      category: 'Scanned Items',
      quantity: '1 unit',
      addedDate: new Date().toISOString().split('T')[0]
    };
    setPantryItems([...pantryItems, newItem]);
  };

  const logFood = (food: ScannedFood) => {
    console.log("Logging food to diary:", food.name);
    // In a real app, this would save to user's food diary
    alert(`${food.name} (${food.calories} calories) logged to your food diary!`);
  };

  const getNutritionalAdvice = (grade: string) => {
    const advice = {
      'A': 'Excellent choice! This food is nutritionally dense and fits well in a healthy diet.',
      'B': 'Good choice! This food provides solid nutrition with minor considerations.',
      'C': 'Moderate choice. Consider balancing with nutrient-dense foods.',
      'D': 'Limit consumption. This food is high in calories or low in nutrients.',
      'F': 'Avoid if possible. This food offers poor nutritional value.'
    };
    return advice[grade as keyof typeof advice] || '';
  };

  if (scannedResult) {
    return (
      <div className="space-y-6" data-macaly="scan-result">
        <div className="flex justify-between items-center">
          <Button 
            onClick={() => {
              setScannedResult(null);
              setScanMode('camera');
            }}
            variant="outline"
            data-macaly="scan-again-btn"
          >
            ← Scan Again
          </Button>
          <Badge 
            variant={scannedResult.nutritionGrade === 'A' ? 'default' : 
                   scannedResult.nutritionGrade === 'B' ? 'secondary' : 'destructive'}
            className="text-lg px-3 py-1"
          >
            Grade {scannedResult.nutritionGrade}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl" data-macaly="scanned-food-name">
                  {scannedResult.name}
                </h2>
                <p className="text-gray-600">
                  {Math.round(scannedResult.confidence * 100)}% confidence • {scannedResult.serving_size}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nutrition Facts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-600">{scannedResult.calories}</p>
                    <p className="text-sm text-orange-800">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{scannedResult.protein}g</p>
                    <p className="text-sm text-blue-800">Protein</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{scannedResult.carbs}g</p>
                    <p className="text-sm text-green-800">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">{scannedResult.fat}g</p>
                    <p className="text-sm text-purple-800">Fat</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fiber:</span>
                    <span className="font-medium">{scannedResult.fiber}g</span>
                  </div>
                </div>
              </div>

              {/* AI Nutritional Advice */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">AI Nutritional Advice</h3>
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    {getNutritionalAdvice(scannedResult.nutritionGrade)}
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-medium mb-2">Food Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {scannedResult.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {scannedResult.alternatives && (
                  <div>
                    <h4 className="font-medium mb-2">Healthier Alternatives</h4>
                    <div className="space-y-2">
                      {scannedResult.alternatives.map((alt, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm font-medium">{alt.name}</span>
                          <div className="text-sm text-gray-600">
                            {alt.calories} cal • Score: {alt.healthScore}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => logFood(scannedResult)}
                className="flex items-center gap-2"
                data-macaly="log-food-btn"
              >
                <CheckCircle className="h-4 w-4" />
                Log to Diary
              </Button>
              <Button 
                onClick={() => addToPantry(scannedResult.name)}
                variant="outline"
                className="flex items-center gap-2"
                data-macaly="add-pantry-btn"
              >
                <Upload className="h-4 w-4" />
                Add to Pantry
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                data-macaly="share-result-btn"
              >
                <Search className="h-4 w-4" />
                Find Recipes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-macaly="food-scanner">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-2" data-macaly="scanner-title">
          AI Food Scanner 📷
        </h2>
        <p className="text-gray-600" data-macaly="scanner-subtitle">
          Scan food to get instant nutrition info and AI recommendations
        </p>
      </div>

      {/* Scan Mode Selection */}
      <div className="flex justify-center gap-2">
        <Button 
          variant={scanMode === 'camera' ? 'default' : 'outline'}
          onClick={() => setScanMode('camera')}
          size="sm"
        >
          <Camera className="mr-2 h-4 w-4" />
          Camera
        </Button>
        <Button 
          variant={scanMode === 'upload' ? 'default' : 'outline'}
          onClick={() => setScanMode('upload')}
          size="sm"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <Button 
          variant={scanMode === 'pantry' ? 'default' : 'outline'}
          onClick={() => setScanMode('pantry')}
          size="sm"
        >
          <Search className="mr-2 h-4 w-4" />
          Pantry
        </Button>
      </div>

      {scanMode === 'camera' && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <video 
                ref={videoRef}
                className="w-full max-w-md mx-auto rounded-lg"
                style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              {!videoRef.current?.srcObject && (
                <div className="bg-gray-100 rounded-lg p-12">
                  <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Position food in camera view</p>
                  <Button onClick={startCameraScanning} data-macaly="start-camera-btn">
                    Start Camera
                  </Button>
                </div>
              )}

              {videoRef.current?.srcObject && (
                <div className="space-y-4">
                  {isScanning ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing food with AI...</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={capturePhoto}
                      size="lg"
                      className="w-24 h-24 rounded-full"
                      data-macaly="capture-photo-btn"
                    >
                      <Camera className="h-8 w-8" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {scanMode === 'upload' && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-12 border-2 border-dashed border-gray-300">
                <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Upload a photo of your food</p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  data-macaly="upload-photo-btn"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Photo
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {scanMode === 'pantry' && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-secondary to-orange-400 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Your Smart Pantry 🥫</h3>
              <p className="text-orange-100">
                {pantryItems.length} items • AI meal suggestions ready
              </p>
            </CardContent>
          </Card>

          {/* Pantry Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pantryItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.quantity}</p>
                  {item.expiry && (
                    <p className="text-xs text-orange-600 mt-1">
                      Expires: {item.expiry}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Meal Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AI Meal Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generateMealSuggestions().map((suggestion, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">{suggestion.name}</h4>
                    <p className="text-sm text-blue-600 mb-2">
                      {suggestion.prepTime} min • {suggestion.calories} calories • {suggestion.difficulty}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {suggestion.ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Get Recipe
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}