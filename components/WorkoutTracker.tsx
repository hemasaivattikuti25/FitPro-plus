"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, Timer, Trophy, Target, Flame, 
  Volume2, VolumeX, RotateCcw, Award, Zap, TrendingUp,
  Clock, Users, Star, ChevronRight, Activity, Heart
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  sets?: number;
  reps?: number;
  weight?: number;
  restTime?: number;
  instructions: string[];
  muscleGroups: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  videoUrl?: string;
  formTips: string[];
  breathingPattern: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  totalCalories: number;
  exercises: Exercise[];
  category: string;
  level: string;
  rating: number;
  completions: number;
  aiOptimized: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export default function WorkoutTrackerPro() {
  console.log("WorkoutTracker Pro Loading - Advanced Fitness Analytics");

  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [heartRate, setHeartRate] = useState(142);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workoutIntensity, setWorkoutIntensity] = useState([7]);

  // Advanced workout data
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 127,
    weekStreak: 14,
    monthlyMinutes: 1247,
    personalBests: 23,
    favoriteCategory: 'Strength Training'
  });

  // Heart rate simulation data
  const heartRateData = [
    { time: '0:00', rate: 72 },
    { time: '5:00', rate: 95 },
    { time: '10:00', rate: 125 },
    { time: '15:00', rate: 142 },
    { time: '20:00', rate: 158 },
    { time: '25:00', rate: 135 },
    { time: '30:00', rate: 120 }
  ];

  const audioRef = useRef<HTMLAudioElement>(null);

  // Enhanced workouts with AI optimization
  const premiumWorkouts: Workout[] = [
    {
      id: '1',
      name: 'AI-Optimized HIIT Blast',
      description: 'Scientifically designed high-intensity intervals for maximum fat burn',
      totalDuration: 28,
      totalCalories: 380,
      category: 'HIIT',
      level: 'Advanced',
      rating: 4.9,
      completions: 1247,
      aiOptimized: true,
      exercises: [
        {
          id: '1',
          name: 'Burpee Power Jumps',
          duration: 45,
          calories: 18,
          restTime: 15,
          instructions: [
            'Start in standing position with feet shoulder-width apart',
            'Drop into squat, place hands on floor',
            'Jump feet back into plank position',
            'Perform push-up, jump feet back to squat',
            'Explode up with arms overhead'
          ],
          muscleGroups: ['Full Body', 'Core', 'Cardio'],
          difficulty: 'Advanced',
          equipment: ['None'],
          formTips: [
            'Keep core tight throughout movement',
            'Land softly on jump',
            'Maintain straight back in plank'
          ],
          breathingPattern: 'Exhale on jump up, inhale on squat down'
        },
        {
          id: '2',
          name: 'Mountain Climber Sprints',
          duration: 30,
          calories: 12,
          restTime: 30,
          instructions: [
            'Start in high plank position',
            'Drive right knee toward chest',
            'Quickly switch legs like running in place',
            'Maintain plank position throughout'
          ],
          muscleGroups: ['Core', 'Shoulders', 'Cardio'],
          difficulty: 'Intermediate',
          equipment: ['None'],
          formTips: [
            'Keep hips level',
            'Engage core constantly',
            'Quick, controlled movements'
          ],
          breathingPattern: 'Rapid, controlled breathing through nose'
        }
      ]
    },
    {
      id: '2',
      name: 'Neural Strength Protocol',
      description: 'AI-enhanced strength training for optimal muscle activation',
      totalDuration: 45,
      totalCalories: 285,
      category: 'Strength',
      level: 'Intermediate',
      rating: 4.8,
      completions: 892,
      aiOptimized: true,
      exercises: [
        {
          id: '3',
          name: 'Perfect Push-ups',
          duration: 60,
          calories: 15,
          sets: 4,
          reps: 12,
          restTime: 60,
          instructions: [
            'Start in high plank, hands under shoulders',
            'Lower body as one unit to floor',
            'Push up explosively',
            'Maintain straight line from head to heels'
          ],
          muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
          difficulty: 'Intermediate',
          equipment: ['None'],
          formTips: [
            'Full range of motion',
            'Controlled descent',
            'Engage glutes and core'
          ],
          breathingPattern: 'Inhale down, exhale up forcefully'
        }
      ]
    },
    {
      id: '3',
      name: 'Mindful Movement Flow',
      description: 'AI-guided yoga flow for flexibility and mental clarity',
      totalDuration: 35,
      totalCalories: 150,
      category: 'Yoga',
      level: 'Beginner',
      rating: 4.7,
      completions: 2156,
      aiOptimized: true,
      exercises: [
        {
          id: '4',
          name: 'Flowing Warrior Sequence',
          duration: 120,
          calories: 8,
          instructions: [
            'Begin in mountain pose',
            'Flow into downward dog',
            'Step right foot forward to warrior I',
            'Transition to warrior II',
            'Return to downward dog, repeat other side'
          ],
          muscleGroups: ['Full Body', 'Balance', 'Flexibility'],
          difficulty: 'Beginner',
          equipment: ['Yoga Mat'],
          formTips: [
            'Move with breath',
            'Keep core engaged',
            'Find your edge, don\'t force'
          ],
          breathingPattern: 'Deep ujjayi breathing throughout'
        }
      ]
    }
  ];

  console.log("Premium workouts loaded:", premiumWorkouts.length);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        // Simulate calorie burn
        setCaloriesBurned(prev => prev + 0.1);
        // Simulate heart rate fluctuation
        setHeartRate(prev => prev + (Math.random() - 0.5) * 4);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleNextExercise();
      playSound('complete');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startWorkout = (workout: Workout) => {
    console.log("Starting premium workout:", workout.name);
    setCurrentWorkout(workout);
    setCurrentExerciseIndex(0);
    setTimeLeft(workout.exercises[0].duration);
    setWorkoutStarted(true);
    setCaloriesBurned(0);
    setHeartRate(85);
  };

  const toggleTimer = () => {
    console.log("Timer toggled, isActive:", !isActive);
    setIsActive(!isActive);
    playSound(isActive ? 'pause' : 'start');
  };

  const handleNextExercise = () => {
    if (!currentWorkout) return;
    
    console.log("Moving to next exercise, current index:", currentExerciseIndex);
    
    if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeLeft(currentWorkout.exercises[nextIndex].duration);
      setIsActive(false);
    } else {
      // Workout completed
      console.log("Workout completed!");
      setIsActive(false);
      setWorkoutStarted(false);
      setCurrentWorkout(null);
      playSound('victory');
    }
  };

  const resetExercise = () => {
    if (!currentWorkout) return;
    setTimeLeft(currentWorkout.exercises[currentExerciseIndex].duration);
    setIsActive(false);
  };

  const playSound = (type: 'start' | 'pause' | 'complete' | 'victory') => {
    if (!soundEnabled) return;
    // In a real app, you'd have actual sound files
    console.log(`Playing ${type} sound`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHeartRateZone = (hr: number) => {
    if (hr < 100) return { zone: 'Rest', color: '#22c55e' };
    if (hr < 140) return { zone: 'Fat Burn', color: '#f59e0b' };
    if (hr < 170) return { zone: 'Cardio', color: '#ef4444' };
    return { zone: 'Peak', color: '#dc2626' };
  };

  if (workoutStarted && currentWorkout) {
    const currentExercise = currentWorkout.exercises[currentExerciseIndex];
    const progress = ((currentExercise.duration - timeLeft) / currentExercise.duration) * 100;
    const workoutProgress = ((currentExerciseIndex + progress/100) / currentWorkout.exercises.length) * 100;
    const hrZone = getHeartRateZone(heartRate);

    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Workout Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-4xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-glass-gradient backdrop-blur-xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentWorkout.name}</h2>
                <div className="flex items-center gap-4 text-blue-100">
                  <span>Exercise {currentExerciseIndex + 1} of {currentWorkout.exercises.length}</span>
                  {currentWorkout.aiOptimized && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Zap className="w-3 h-3 mr-1" />
                      AI Optimized
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{Math.round(caloriesBurned)}</div>
                <div className="text-blue-100 text-sm">Calories Burned</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round(workoutProgress)}%</div>
                <div className="text-blue-100 text-sm">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: hrZone.color }}>
                  {Math.round(heartRate)}
                </div>
                <div className="text-blue-100 text-sm">BPM • {hrZone.zone}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{workoutIntensity[0]}/10</div>
                <div className="text-blue-100 text-sm">Intensity</div>
              </div>
            </div>
            <Progress value={workoutProgress} className="bg-blue-200/30" />
          </div>
        </motion.div>

        {/* Current Exercise Focus */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Exercise Timer */}
            <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-glass">
              <CardContent className="p-8 text-center">
                <motion.div
                  key={currentExercise.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6"
                >
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">
                    {currentExercise.name}
                  </h3>
                  
                  {/* Circular Progress Timer */}
                  <div className="w-64 h-64 mx-auto">
                    <CircularProgressbar
                      value={progress}
                      text={formatTime(timeLeft)}
                      styles={buildStyles({
                        pathColor: `rgba(59, 130, 246, ${progress / 100})`,
                        textColor: '#1f2937',
                        trailColor: '#e5e7eb',
                        textSize: '20px',
                        pathTransitionDuration: 0.5,
                      })}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={toggleTimer}
                      size="lg"
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-glow"
                    >
                      {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                    
                    <Button
                      onClick={resetExercise}
                      variant="outline"
                      size="lg"
                      className="w-20 h-20 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <RotateCcw className="h-8 w-8" />
                    </Button>
                    
                    <Button
                      onClick={handleNextExercise}
                      variant="outline"
                      size="lg"
                      className="w-20 h-20 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <SkipForward className="h-8 w-8" />
                    </Button>
                  </div>

                  {/* Exercise Details */}
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Instructions:</h4>
                      <ol className="space-y-2">
                        {currentExercise.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Form Tips:</h4>
                        <ul className="space-y-1">
                          {currentExercise.formTips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Breathing:</h4>
                        <p className="text-sm text-gray-600">{currentExercise.breathingPattern}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Muscle Groups:</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentExercise.muscleGroups.map((muscle, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Analytics */}
          <div className="space-y-4">
            {/* Heart Rate Chart */}
            <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Heart className="h-5 w-5 text-red-500" />
                  Heart Rate Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={heartRateData}>
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke={hrZone.color} 
                        strokeWidth={3}
                        dot={{ r: 0 }}
                      />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)', 
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: hrZone.color }}>
                    {Math.round(heartRate)} BPM
                  </div>
                  <div className="text-sm text-gray-600">{hrZone.zone} Zone</div>
                </div>
              </CardContent>
            </Card>

            {/* Intensity Slider */}
            <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Exercise Intensity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={workoutIntensity}
                    onValueChange={setWorkoutIntensity}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Easy</span>
                    <span>Moderate</span>
                    <span>Intense</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">{workoutIntensity[0]}</span>
                    <span className="text-gray-600">/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-glass">
              <CardHeader>
                <CardTitle className="text-gray-800">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="outline"
                  className="w-full justify-start text-gray-700"
                >
                  {soundEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                  Sound {soundEnabled ? 'On' : 'Off'}
                </Button>
                
                <Button
                  onClick={() => {
                    setIsActive(false);
                    setWorkoutStarted(false);
                    setCurrentWorkout(null);
                  }}
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  End Workout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center" variants={itemVariants}>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI-Powered Workout Studio 🏋️‍♀️
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the future of fitness with AI-optimized workouts, real-time form analysis, and personalized training protocols.
        </p>
      </motion.div>

      {/* Workout Stats Overview */}
      <motion.div 
        className="grid md:grid-cols-5 gap-4"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-glow text-center p-4">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{workoutStats.totalWorkouts}</div>
            <div className="text-blue-100 text-sm">Total Workouts</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-glow text-center p-4">
            <Flame className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{workoutStats.weekStreak}</div>
            <div className="text-green-100 text-sm">Day Streak</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-glow text-center p-4">
            <Clock className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{workoutStats.monthlyMinutes}</div>
            <div className="text-purple-100 text-sm">Monthly Minutes</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-glow text-center p-4">
            <Award className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{workoutStats.personalBests}</div>
            <div className="text-orange-100 text-sm">Personal Bests</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-glow text-center p-4">
            <Star className="h-8 w-8 mx-auto mb-2" />
            <div className="text-lg font-bold">{workoutStats.favoriteCategory}</div>
            <div className="text-pink-100 text-sm">Favorite Type</div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Premium Workouts Grid */}
      <motion.div 
        className="grid lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {premiumWorkouts.map((workout) => (
          <motion.div key={workout.id} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
            <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-glass hover:shadow-glow transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    {workout.aiOptimized && (
                      <Badge className="bg-white/90 text-purple-700">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Optimized
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {workout.level}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{workout.name}</h3>
                    <p className="text-blue-100 text-sm">{workout.description}</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <Timer className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-medium">{workout.totalDuration} min</div>
                  </div>
                  <div>
                    <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm font-medium">{workout.totalCalories} cal</div>
                  </div>
                  <div>
                    <Users className="h-5 w-5 mx-auto mb-1 text-green-500" />
                    <div className="text-sm font-medium">{workout.completions}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{workout.rating}</span>
                    <span className="text-xs text-gray-500">({workout.completions})</span>
                  </div>
                  <Badge 
                    variant={workout.category === 'HIIT' ? 'destructive' : 
                             workout.category === 'Strength' ? 'default' : 'secondary'}
                  >
                    {workout.category}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Exercises Preview:</h4>
                  {workout.exercises.slice(0, 2).map((exercise, index) => (
                    <div key={exercise.id} className="flex justify-between text-sm text-gray-600">
                      <span>{exercise.name}</span>
                      <span>{exercise.duration}s</span>
                    </div>
                  ))}
                  {workout.exercises.length > 2 && (
                    <div className="text-xs text-gray-500">+{workout.exercises.length - 2} more exercises</div>
                  )}
                </div>

                <Button 
                  onClick={() => startWorkout(workout)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Workout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}